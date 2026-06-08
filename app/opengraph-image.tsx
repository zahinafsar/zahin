import { ImageResponse } from "next/og";
import { SITE } from "./lib/site";

export const runtime = "nodejs";
export const alt = SITE.title;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const SKILLS = ["TypeScript", "React", "Next.js", "Node.js", "Three.js"];

export default function OG() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "80px",
          background:
            "radial-gradient(circle at 20% 0%, #1a1a2e 0%, #0a0a0a 60%)",
          color: "#ffffff",
          fontFamily: "system-ui, -apple-system, sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            fontSize: 24,
            color: "rgba(255,255,255,0.6)",
            letterSpacing: "0.08em",
            textTransform: "uppercase",
          }}
        >
          {SITE.url.replace(/^https?:\/\//, "")}
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 28,
          }}
        >
          <div
            style={{
              fontSize: 88,
              fontWeight: 700,
              lineHeight: 1.0,
              letterSpacing: "-0.03em",
              display: "flex",
            }}
          >
            {SITE.name}
          </div>
          <div
            style={{
              fontSize: 32,
              fontWeight: 500,
              lineHeight: 1.3,
              color: "rgba(255,255,255,0.7)",
              display: "flex",
              maxWidth: 900,
            }}
          >
            {SITE.description}
          </div>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div style={{ fontSize: 28, fontWeight: 600, display: "flex" }}>
            Software Engineer
          </div>
          <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
            {SKILLS.map((s) => (
              <div
                key={s}
                style={{
                  display: "flex",
                  fontSize: 20,
                  padding: "8px 18px",
                  borderRadius: 999,
                  border: "1px solid rgba(255,255,255,0.18)",
                  color: "rgba(255,255,255,0.8)",
                }}
              >
                {s}
              </div>
            ))}
          </div>
        </div>
      </div>
    ),
    { ...size },
  );
}
