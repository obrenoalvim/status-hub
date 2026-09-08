import { ImageResponse } from "next/og";

export const size = { width: 64, height: 64 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#0b0f0e",
          borderRadius: 12,
        }}
      >
        <div
          style={{
            width: 24,
            height: 24,
            borderRadius: "50%",
            background: "#3ddc84",
            boxShadow: "0 0 18px 5px rgba(61,220,132,0.65)",
          }}
        />
      </div>
    ),
    { ...size }
  );
}
