import { ImageResponse } from "next/og";
import { SITE } from "./lib/site";

/* Generated OG card — Solvera brand (navy / gold / ivory). Served at
   /opengraph-image and referenced automatically in <head>. */

export const alt = `${SITE.name} — ${SITE.tagline}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const NAVY = "#122140";
const GOLD = "#c8a24c";
const GOLD_BRIGHT = "#d2a94f";
const IVORY = "#f5efe2";

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
          backgroundColor: NAVY,
          backgroundImage:
            "radial-gradient(circle at 85% 12%, rgba(200,162,76,0.20) 0%, rgba(200,162,76,0) 55%)",
          fontFamily: "Georgia, serif",
        }}
      >
        {/* brand row — gold ring emblem + wordmark */}
        <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
          <div
            style={{
              width: 56,
              height: 56,
              borderRadius: 999,
              border: `2px solid ${GOLD}`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: GOLD,
              fontSize: 30,
            }}
          >
            S
          </div>
          <div
            style={{
              fontSize: 34,
              fontWeight: 600,
              color: IVORY,
              letterSpacing: 8,
            }}
          >
            SOLVERA
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
              color: IVORY,
              letterSpacing: "-0.02em",
              maxWidth: 980,
            }}
          >
            <div>Automate the busywork.</div>
            <div style={{ fontStyle: "italic", color: GOLD_BRIGHT }}>
              Scale what&rsquo;s measurable.
            </div>
          </div>
          <div style={{ fontSize: 28, color: "#c9c3b4", maxWidth: 900 }}>
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
            borderTop: "1px solid rgba(200,162,76,0.32)",
            paddingTop: 28,
            fontSize: 22,
            color: "#9a9382",
          }}
        >
          <div>AI agents · Automation · Document intelligence</div>
          <div style={{ color: IVORY }}>solverame.com</div>
        </div>
      </div>
    ),
    { ...size }
  );
}
