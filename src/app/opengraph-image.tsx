import { ImageResponse } from "next/og";

export const alt = "Kevin Coy — Product Designer (UX/UI)";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

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
          background: "#f2f0eb",
          color: "#0e0e0d",
          padding: 72,
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 22, letterSpacing: 2, textTransform: "uppercase", color: "#55534e" }}>
          <span>Kevin Coy</span>
          <span>Product Designer (UX/UI)</span>
        </div>
        <div style={{ display: "flex", flexDirection: "column", fontSize: 128, lineHeight: 0.9, letterSpacing: -6, fontWeight: 600 }}>
          <span>Complex systems,</span>
          <span style={{ display: "flex" }}>
            made&nbsp;<span style={{ color: "#2f45ff", fontStyle: "italic" }}>clear.</span>
          </span>
        </div>
        <div style={{ display: "flex", fontSize: 26, color: "#55534e" }}>
          15+ years · SaaS · Enterprise · E-commerce · AI-assisted workflows
        </div>
      </div>
    ),
    size,
  );
}
