import { ImageResponse } from "next/og";
import { SITE } from "../lib/site";

export const runtime = "nodejs";
export const alt = "Hire a software engineer for $200/mo";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const chips = ["First 2 days free", "Any dev work", "We handle AI for you"];

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
            justifyContent: "space-between",
            fontSize: 24,
            color: "rgba(255,255,255,0.6)",
            letterSpacing: "0.08em",
            textTransform: "uppercase",
          }}
        >
          <div style={{ display: "flex" }}>
            {SITE.url.replace(/^https?:\/\//, "")} / pricing
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 28 }}>
          <div
            style={{
              fontSize: 76,
              fontWeight: 700,
              lineHeight: 1.05,
              letterSpacing: "-0.02em",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <div style={{ display: "flex" }}>Ship your product for</div>
            <div style={{ display: "flex", color: "#ff6b3d" }}>$200/mo.</div>
          </div>
          <div
            style={{
              display: "flex",
              fontSize: 26,
              color: "rgba(255,255,255,0.65)",
            }}
          >
            No AI subscriptions. No models. No agents to manage.
          </div>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            <div style={{ fontSize: 28, fontWeight: 600 }}>
              {SITE.author.name}
            </div>
            <div style={{ fontSize: 20, color: "rgba(255,255,255,0.55)" }}>
              Software Engineer
            </div>
          </div>
          <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
            {chips.map((c) => (
              <div
                key={c}
                style={{
                  display: "flex",
                  fontSize: 20,
                  padding: "8px 18px",
                  borderRadius: 999,
                  border: "1px solid rgba(255,255,255,0.18)",
                  color: "rgba(255,255,255,0.8)",
                }}
              >
                {c}
              </div>
            ))}
          </div>
        </div>
      </div>
    ),
    { ...size },
  );
}
