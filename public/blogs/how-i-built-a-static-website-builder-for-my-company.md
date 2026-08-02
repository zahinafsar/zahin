---
title: "How I built a static website builder for my company"
description: "How I designed the deployment architecture, custom-domain setup, and user flow behind a static website builder for my company."
date: "2026-08-02"
updated: "2026-08-02"
tags: ["architecture", "nextjs", "express", "minio", "hosting"]
author: "Md. Zahin Afsar"
---

At my company, customers needed a simple way to publish a website that could connect back to their CRM data. I built the website builder directly into our existing dashboard instead of introducing a separate hosting product.

The feature is closer to a small static hosting platform than a visual page editor. Users upload an exported website, publish it, preview it, connect a domain, and generate a provider-scoped API key when the site needs CRM data. I deliberately kept the input to static files. The platform does not run builds or execute user code, which made it possible to add hosting without creating another control plane.

## The stack

I built the dashboard with Next.js 14, React 18, TypeScript, TanStack Query, Axios, Tailwind CSS, and the shared shadcn-based UI kit used across the company's products. The backend stays inside the existing Express API as a small, class-based module.

MongoDB stores website, deployment, and domain metadata through Mongoose. The API uses the [MinIO JavaScript Client](https://github.com/minio/minio-js) to store the actual HTML, CSS, JavaScript, fonts, and media files. Node's DNS APIs handle domain verification, while [Nginx Proxy Manager](https://nginxproxymanager.com/guide/) creates the proxy host and TLS certificate.

The request path is simple:

```text
Dashboard
  -> Express controllers and permission checks
  -> deployment, storage, and domain services
  -> MongoDB for state
  -> MinIO for files
  -> Nginx Proxy Manager for domains and TLS
```

This is still a modular monolith. The controllers are thin, and each service owns one job, so moving storage or domain provisioning out later would not require rewriting the dashboard.

## How publishing works

The user drops files or selects a folder in the Builder page. A root `index.html` is required. The system caps a site at 200 files and 50 MB total, validates supported file types, rejects unsafe paths, and enforces a 15 MB per-file limit on the API.

Publishing is a three-step protocol:

1. The dashboard sends the file manifest to the API. The API creates an `UPLOADING` deployment in MongoDB and returns an upload URL for each file.
2. The browser uploads four files at a time. The API streams each file into a temporary MinIO prefix, so it never needs to hold the full site in memory.
3. The dashboard asks the API to complete the deployment. The API checks that every object exists with the expected size, promotes the files to their permanent prefix, marks the deployment `ACTIVE`, and archives the previous one.

The upload worker is intentionally plain JavaScript. A shared cursor gives the dashboard four concurrent uploads without pulling in another queue library:

```tsx
let cursor = 0;

const workers = Array.from(
  { length: Math.min(4, selectedFiles.length) },
  async () => {
    while (cursor < selectedFiles.length) {
      const item = selectedFiles[cursor++];
      const uploadUrl = targets.get(item.path);

      if (!uploadUrl) {
        throw new Error(`Upload target missing for ${item.path}`);
      }

      await upload_site_deployment_file(uploadUrl, item.file, (progress) =>
        updateUpload(item.id, { progress })
      );
    }
  }
);

await Promise.all(workers);
await completeDeployment.mutateAsync(deploymentId);
```

MinIO receives the upload as a stream. The metadata and file body stay separate: MongoDB knows what should exist, while object storage holds the bytes.

```ts
await siteStorageService.putObject(
  file.uploadObjectName,
  requestStream,
  file.sizeBytes
);
```

The `Website` record only points at the active deployment. Switching that pointer happens after every file has been verified, so a failed upload cannot replace the live site with a half-published version.

Activation is a pointer swap, not an overwrite of the current files:

```ts
deployment.status = "ACTIVE";
deployment.activatedAt = new Date();
await deployment.save();

await Website.findOneAndUpdate(
  { _id: deployment.website, hauler: haulerId },
  { $set: { activeDeployment: deployment._id } }
);

await WebsiteDeployment.updateMany(
  {
    website: deployment.website,
    _id: { $ne: deployment._id },
    status: "ACTIVE",
  },
  { $set: { status: "ARCHIVED" } }
);
```

Each deployment has its own object prefix. That makes replacement predictable and leaves room for rollback support later, even though the current UI only exposes the active deployment.

Published files are served through a public runtime route. HTML uses `no-store`; static assets get a short public cache. The preview screen loads the same runtime URL in desktop, tablet, and mobile frames. The preview is the real deployment, not a second rendering of it.

The runtime resolves the request path against the active manifest, opens the corresponding MinIO object, and pipes it into the response:

```ts
const stream = await siteStorageService.getObject(file.objectName);

res.set({
  "Cache-Control": file.mimeType.startsWith("text/html")
    ? "no-store"
    : "public, max-age=60, must-revalidate",
  "Content-Length": file.sizeBytes.toString(),
  "Content-Type": file.mimeType,
  "X-Content-Type-Options": "nosniff",
});

return stream.pipe(res);
```

## Custom domains

Domain setup only becomes available after the first successful publish. The user enters a hostname and gets a CNAME record pointing to the configured site host.

When they click Verify, the API follows the CNAME chain and also compares resolved IPv4 and IPv6 addresses. Once DNS is correct, the domain moves from `PENDING_DNS` to `PROVISIONING`. Nginx Proxy Manager creates the proxy host, requests the certificate, forces HTTPS, and forwards traffic to the site runtime.

Checking both paths matters. Some DNS providers preserve the CNAME chain, while others flatten it and only expose the final IP address.

```ts
const cnameChain = await resolveCnameChain(hostname);
if (cnameChain.includes(expectedTarget)) {
  return { verified: true };
}

const [hostnameV4, hostnameV6, targetV4, targetV6] = await Promise.all([
  resolveSafely(resolve4, hostname),
  resolveSafely(resolve6, hostname),
  resolveSafely(resolve4, expectedTarget),
  resolveSafely(resolve6, expectedTarget),
]);

const expectedAddresses = new Set([...targetV4, ...targetV6]);
return {
  verified: [...hostnameV4, ...hostnameV6].some((address) =>
    expectedAddresses.has(address)
  ),
};
```

Provisioning has an ownership claim in MongoDB before the service calls Nginx Proxy Manager. A second request sees `PROVISIONING` and does not create a duplicate proxy host. Stuck claims become eligible again after five minutes.

Incoming custom-domain requests are resolved by hostname. The runtime looks up the active website in MongoDB, caches that mapping briefly, then streams the requested object from MinIO. Removing the domain also removes its proxy host and unused certificate.

The feature stays narrow. It hosts static files, exposes provider data, and connects a custom domain. I did not need build containers or a second control plane, and the API never executes untrusted server code. This is boring infrastructure, which is exactly what I wanted.

## References

- [MinIO JavaScript Client SDK](https://github.com/minio/minio-js)
- [Nginx Proxy Manager guide](https://nginxproxymanager.com/guide/)
