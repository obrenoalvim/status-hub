import { ImageResponse } from "next/og";
import { SITE_DESCRIPTION } from "@/lib/site";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          background: "#0b0f0e",
          color: "#e8f0ec",
          fontFamily: "monospace",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", marginBottom: 28 }}>
          <div
            style={{
              width: 16,
              height: 16,
              borderRadius: "50%",
              background: "#3ddc84",
              marginRight: 18,
              boxShadow: "0 0 24px 6px rgba(61,220,132,0.55)",
            }}
          />
          <div style={{ display: "flex", fontSize: 28, letterSpacing: 4, color: "#7c9089", textTransform: "uppercase" }}>
            All systems operational
          </div>
        </div>
        <div style={{ display: "flex", fontSize: 96, fontWeight: 700, letterSpacing: -2 }}>
          STATUS<span style={{ color: "#4ade80" }}>_</span>HUB
        </div>
        <div style={{ display: "flex", fontSize: 30, color: "#7c9089", marginTop: 28, maxWidth: 940 }}>
          {SITE_DESCRIPTION}
        </div>
      </div>
    ),
    { ...size }
  );
}
