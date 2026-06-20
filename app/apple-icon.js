import { ImageResponse } from "next/og";

/* Generated Apple touch icon — same mark at 180px */

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#1c6b59",
          borderRadius: 36,
          color: "#fbfaf7",
          fontSize: 110,
          fontWeight: 700,
          fontFamily: "Georgia, serif",
        }}
      >
        S
      </div>
    ),
    { ...size }
  );
}
