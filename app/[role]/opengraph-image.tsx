import { ImageResponse } from "next/og";
import { notFound } from "next/navigation";
import { EXPERTISE_PAGES, getExpertisePage } from "../lib/expertise";
import { SITE } from "../lib/site";

export const runtime = "nodejs";
export const alt = "Md. Zahin Afsar engineering experience in Bangladesh";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

type Params = {
  role: string;
};

export function generateStaticParams(): Params[] {
  return EXPERTISE_PAGES.map((page) => ({ role: page.slug }));
}

export default async function OpenGraphImage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { role } = await params;
  const page = getExpertisePage(role);

  if (!page) notFound();

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px 78px",
          background: "radial-gradient(circle at 90% 10%, #3b170d 0%, #090909 48%, #050505 100%)",
          color: "#ffffff",
          fontFamily: "system-ui, sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            fontSize: 21,
            textTransform: "uppercase",
            letterSpacing: "0.14em",
            color: "rgba(255,255,255,0.55)",
          }}
        >
          <div style={{ display: "flex" }}>{SITE.name}</div>
          <div style={{ display: "flex", color: "#ff6b3d" }}>Dhaka · GMT+6</div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          <div
            style={{
              display: "flex",
              fontSize: 78,
              fontWeight: 700,
              lineHeight: 0.98,
              letterSpacing: "-0.045em",
              maxWidth: 1040,
            }}
          >
            {page.role}
          </div>
          <div
            style={{
              display: "flex",
              fontSize: 78,
              fontWeight: 700,
              lineHeight: 0.98,
              letterSpacing: "-0.045em",
              color: "rgba(255,255,255,0.48)",
            }}
          >
            in Bangladesh.
          </div>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            paddingTop: 24,
            borderTop: "1px solid rgba(255,255,255,0.12)",
            fontSize: 20,
            color: "rgba(255,255,255,0.62)",
          }}
        >
          <div style={{ display: "flex" }}>{page.eyebrow}</div>
          <div style={{ display: "flex" }}>{SITE.url.replace(/^https?:\/\//, "")}</div>
        </div>
      </div>
    ),
    size,
  );
}
