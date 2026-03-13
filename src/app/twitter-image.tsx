import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Superteam Malaysia — Building the Solana Ecosystem in Malaysia";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "linear-gradient(135deg, #0f0f0f 0%, #1a1a1a 50%, #0f0f0f 100%)",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: "sans-serif",
          position: "relative",
        }}
      >
        {/* Gold accent line at top */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: "3px",
            background: "linear-gradient(90deg, transparent, #e8a800, #ffc940, #e8a800, transparent)",
          }}
        />

        {/* Subtle grid dots */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage: "radial-gradient(circle, rgba(232, 168, 0, 0.04) 1px, transparent 1px)",
            backgroundSize: "30px 30px",
          }}
        />

        {/* Gold ambient glow */}
        <div
          style={{
            position: "absolute",
            top: "-100px",
            left: "50%",
            transform: "translateX(-50%)",
            width: "600px",
            height: "300px",
            background: "radial-gradient(ellipse, rgba(232, 168, 0, 0.08) 0%, transparent 70%)",
            borderRadius: "50%",
          }}
        />

        {/* STMY Badge */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "10px",
            marginBottom: "24px",
            padding: "8px 20px",
            borderRadius: "999px",
            border: "1px solid rgba(232, 168, 0, 0.25)",
            background: "rgba(232, 168, 0, 0.06)",
          }}
        >
          <div
            style={{
              width: "8px",
              height: "8px",
              borderRadius: "50%",
              background: "#e8a800",
              boxShadow: "0 0 12px rgba(232, 168, 0, 0.6)",
            }}
          />
          <span style={{ color: "#ffc940", fontSize: "16px", fontWeight: 600, letterSpacing: "2px" }}>
            SOLANA &middot; MALAYSIA
          </span>
        </div>

        {/* Main title */}
        <h1
          style={{
            fontSize: "72px",
            fontWeight: 800,
            color: "#ffffff",
            textAlign: "center",
            lineHeight: 1,
            margin: "0 0 8px 0",
            letterSpacing: "-2px",
          }}
        >
          Superteam
        </h1>
        <h1
          style={{
            fontSize: "72px",
            fontWeight: 800,
            background: "linear-gradient(135deg, #ffc940, #e8a800, #ffc940)",
            backgroundClip: "text",
            color: "transparent",
            textAlign: "center",
            lineHeight: 1,
            margin: 0,
            letterSpacing: "-2px",
          }}
        >
          Malaysia
        </h1>

        {/* Tagline */}
        <p
          style={{
            fontSize: "22px",
            color: "#94949e",
            marginTop: "28px",
            fontWeight: 400,
            letterSpacing: "0.5px",
          }}
        >
          Malaysia&apos;s Home for Solana Builders
        </p>

        {/* Stats row */}
        <div
          style={{
            display: "flex",
            gap: "48px",
            marginTop: "40px",
            padding: "16px 40px",
            borderRadius: "16px",
            border: "1px solid rgba(255, 255, 255, 0.06)",
            background: "rgba(255, 255, 255, 0.03)",
          }}
        >
          {[
            { label: "Members", value: "37+" },
            { label: "Events", value: "30+" },
            { label: "Projects", value: "50+" },
            { label: "Bounties", value: "120+" },
          ].map((stat) => (
            <div key={stat.label} style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
              <span style={{ fontSize: "28px", fontWeight: 700, color: "#ffc940" }}>{stat.value}</span>
              <span style={{ fontSize: "12px", color: "#56565f", fontWeight: 500, letterSpacing: "1px", textTransform: "uppercase" }}>
                {stat.label}
              </span>
            </div>
          ))}
        </div>

        {/* Bottom URL */}
        <p
          style={{
            position: "absolute",
            bottom: "24px",
            color: "#56565f",
            fontSize: "14px",
            fontWeight: 500,
          }}
        >
          superteam.fun &middot; @SuperteamMY
        </p>
      </div>
    ),
    { ...size }
  );
}
