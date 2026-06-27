import { ImageResponse } from "next/og";
import { SITE } from "./lib/site";

/* Generated OG card — on-brand share image until a designed one lands.
   Served at /opengraph-image and referenced automatically in <head>. */

export const alt = `${SITE.name} — ${SITE.tagline}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 72,
          backgroundColor: "#fbfaf7",
          backgroundImage:
            "radial-gradient(circle at 85% 10%, #e6efea 0%, rgba(230,239,234,0) 55%)",
          fontFamily: "Georgia, serif",
        }}
      >
        {/* brand row */}
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div
            style={{
              width: 44,
              height: 44,
              borderRadius: 10,
              backgroundColor: "#1c6b59",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#fbfaf7",
              fontSize: 24,
              fontWeight: 700,
            }}
          >
            S
          </div>
          <div style={{ fontSize: 30, fontWeight: 600, color: "#16140f" }}>
            Solvera
          </div>
        </div>

        {/* headline */}
        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              fontSize: 76,
              lineHeight: 1.05,
              color: "#16140f",
              letterSpacing: "-0.02em",
              maxWidth: 980,
            }}
          >
            <div>Automate the busywork.</div>
            <div style={{ fontStyle: "italic", color: "#1c6b59" }}>
              Scale what&rsquo;s measurable.
            </div>
          </div>
          <div style={{ fontSize: 28, color: "#55524a", maxWidth: 900 }}>
            Practical AI systems for modern teams — designed, deployed, and
            operated in the UAE.
          </div>
        </div>

        {/* footer rule */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            borderTop: "1px solid #d8d3c7",
            paddingTop: 28,
            fontSize: 22,
            color: "#87837a",
          }}
        >
          <div>AI agents · Automation · Document intelligence</div>
          <div>solverame.com</div>
        </div>
      </div>
    ),
    { ...size }
  );
}
