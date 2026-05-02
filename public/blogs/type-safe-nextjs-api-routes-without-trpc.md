---
title: "End-to-End Type Safety for Next.js API Routes — Without tRPC"
description: "Stop misusing Server Actions for data fetching. Get fully typed request bodies, query params, and responses across Next.js App Router API routes and your client — without giving up REST for an RPC layer like tRPC."
date: "2026-05-02"
updated: "2026-05-02"
tags: ["nextjs", "typescript", "api", "type-safety", "react"]
author: "Md. Zahin Afsar"
cover: "/logo-v2.png"
ogImage: "/logo-v2.png"
---

Are you still using Server Actions to fetch your data? You shouldn't be — the [Next.js docs](https://nextjs.org/docs/app/getting-started/mutating-data) are pretty clear:

> **Good to know:** A Server Action is a Server Function used in a specific way (for handling form submissions and mutations).

API routes are the right tool for reads, but they aren't type-safe — `request.json()` returns `any`, search params are stringly-typed, and the response is whatever you returned last Tuesday. Server Actions hid all of this because both ends shared a function signature; API routes don't.

The popular fix is **tRPC**, but tRPC isn't REST — every call gets tunneled through `/api/trpc/[procedure]`, with batched calls collapsing into a single envelope, which is fine for an internal Next.js app and a problem the moment a webhook, a mobile client, or a CDN cache shows up. So this post takes a third path: keep real `app/api/**/route.ts` files, keep `fetch`, and get full type inference at the boundary. There's a codegen step, but it runs inside the Next.js build — you never invoke it by hand.

## The gap, in code

Vanilla Next.js 15+:

```typescript
// app/api/users/route.ts
export async function POST(request: Request) {
  const body = await request.json(); // any
  return Response.json({ id: "1", name: body.name });
}
```

```typescript
const res = await fetch("/api/users", {
  method: "POST",
  body: JSON.stringify({ nme: "John" }), // typo — silently passes
});
const user = await res.json();
console.log(user.nmae); // also silently passes
```

Three bugs, zero TS errors. Body untyped, payload unchecked, response untyped. Refactor the API and consumers break in production, not in CI.

## Why "just use tRPC" skips a real trade-off

- **Every call goes to `/api/trpc/[procedure]`.** Queries use GET, mutations use POST — but the URL is the procedure name, not a resource. A Stripe webhook, an OpenAPI generator, or a mobile client sees an opaque envelope instead of `GET /api/users/123`.
- **HTTP caching gets harder.** Single GET queries still cache fine in the browser and at CDN edges. But the moment batching kicks in (the default in v10+), multiple procedures collapse into one URL with a combined response — and that combined response is opaque to ETags, `revalidate`, and resource-level invalidation.
- **It's a one-way door.** Migrating off means rewriting every procedure as a real route.

The question isn't "type safety or no type safety." It's "type safety **with REST**, or **with RPC**?"

## The trick

Treat the route handler's parameter type as the source of truth. Codegen a map of every route. Hand that map to a typed `api()` client.

That's [`next-ts-api`](https://github.com/zahinafsar/next-ts-api). A Next.js plugin scans `app/api/`, reads your handler signatures, emits `types/next-ts-api.ts`. A generic `createNextFetchApi<ApiRoutes>()` keys off that file.

The codegen runs inside `next dev` and `next build`. Edit a route, the types regenerate. No `npm run generate` to forget. No schema files to keep in sync. Route handlers stay the source of truth.

You give up nothing on inference. You keep real REST URLs, real verbs, real cache headers.

## Setup in three steps

### 1. Wire the plugin

```bash
npm install next-ts-api
```

```javascript
// next.config.mjs
import { nextTsApi } from "next-ts-api/config";

const withNextTsApi = nextTsApi();

export default withNextTsApi({
  // your existing Next config
});
```

### 2. Type the handler

Swap `Request` for `NextApiRequest<Body, Query>`. That's it on the server.

```typescript
// app/api/users/route.ts
import { NextApiRequest } from "next-ts-api";
import { NextResponse } from "next/server";

interface CreateUserInput { name: string; email: string; }
interface User { id: string; name: string; email: string; createdAt: string; }

export async function POST(request: NextApiRequest<CreateUserInput>) {
  const { name, email } = await request.json(); // typed
  const user: User = {
    id: crypto.randomUUID(),
    name,
    email,
    createdAt: new Date().toISOString(),
  };
  return NextResponse.json(user);
}

export async function GET(
  request: NextApiRequest<null, { role?: string; limit?: string }>,
) {
  const role = request.nextUrl.searchParams.get("role"); // string | null
  return NextResponse.json<User[]>([]);
}
```

`request.json()` is now typed. `searchParams.get("role")` only autocompletes keys you declared. Response inferred from `NextResponse.json<T>(...)`.

### 3. Make the client

```typescript
// lib/api.ts
import { createNextFetchApi } from "next-ts-api";
import { type ApiRoutes } from "../types/next-ts-api";

export const api = createNextFetchApi<ApiRoutes>();
```

One line. Use it anywhere:

```typescript
import { api } from "@/lib/api";

export default async function Page() {
  const user = await api("users", {
    method: "POST",
    body: {
      name: "Alice",
      email: "alice@example.com",
      // foo: "bar"  ← TS error
    },
  });
  return <div>Welcome, {user.name}</div>;
}
```

Rename `email` to `emailAddress` on the server. Every call site lights up red. That's the pitch.

## Dynamic routes

```typescript
// app/api/users/[id]/route.ts
export async function DELETE(
  _request: NextApiRequest,
  { params }: { params: { id: string } },
) {
  return NextResponse.json({ ok: true, deletedId: params.id });
}
```

```typescript
await api("users/[id]", {
  method: "DELETE",
  params: { id: "abc-123" }, // typed
});
```

The bracket literal `users/[id]` is the type-system handle. No magic string concat.

## Query params

```typescript
export async function GET(
  request: NextApiRequest<null, {
    role?: "admin" | "user";
    limit?: string;
  }>,
) {
  const role = request.nextUrl.searchParams.get("role");
  // "admin" | "user" | null
}
```

```typescript
await api("users", {
  method: "GET",
  query: { role: "admin", limit: "20" },
});
```

Need to coerce `limit` to a bounded number? Drop a Zod parse in the handler. Type safety covers the **shape**; Zod covers the **values**. They compose.

## What the codegen emits

```typescript
// types/next-ts-api.ts (generated)
export type ApiRoutes = {
  users: {
    GET:  { query: { role?: string; limit?: string }; response: User[] };
    POST: { body: CreateUserInput; response: User };
  };
  "users/[id]": {
    DELETE: { params: { id: string }; response: { ok: boolean; deletedId: string } };
  };
};
```

`createNextFetchApi<T>()` drills `T[Path][Method]` to type-check everything. ~60 lines of types, no runtime magic. The wire format is plain `fetch`. Curl it. Postman it. Cache it. Webhook it. Nothing changes.

## When to use this vs tRPC

**This:** you want REST, external consumers exist, HTTP caching matters, you're migrating gradually, your team already knows `fetch`.

**tRPC:** monolith Next.js app, no external clients, batching/subs matter more than interop.

Both are valid. Different optimization targets.

## Wrapping up

End-to-end type safety isn't an RPC-only thing. Any TypeScript-on-both-sides boundary can have it — including REST. Treat the handler's parameter type as the contract, codegen the map, ship.

Try [`next-ts-api`](https://github.com/zahinafsar/next-ts-api). Found a bug? Open an issue — it's a small library and PRs are welcome.

Questions? [Email me](mailto:afsarzahin@gmail.com) or [find me on X](https://x.com/ZahinAfsar).
