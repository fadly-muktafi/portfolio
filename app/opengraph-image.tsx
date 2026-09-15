import { ImageResponse } from "next/og";
import { site, hero } from "@/lib/content";

export const alt = "Fadly Muktafi — Software Engineer portfolio";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/* OG card: dark bg, oversized name (echo of the hero), mono eyebrow + meta */
export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "flex-start",
          backgroundColor: "#0A0B0A",
          padding: "80px",
          fontFamily: "sans-serif",
          position: "relative",
        }}
      >
        {/* Accent glow, echoes the hero gradient */}
        <div
          style={{
            position: "absolute",
            top: -120,
            right: -80,
            width: 520,
            height: 520,
            borderRadius: 9999,
            background:
              "radial-gradient(circle, rgba(159,223,159,0.22) 0%, rgba(159,223,159,0) 70%)",
          }}
        />
        {/* Eyebrow */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 12,
            fontSize: 24,
            letterSpacing: "0.14em",
            color: "#A9AFA8",
          }}
        >
          <span
            style={{
              width: 12,
              height: 12,
              borderRadius: 9999,
              backgroundColor: "#9FDF9F",
            }}
          />
          {`[ ${hero.eyebrowRole} ]`}
        </div>
        {/* Name, oversized */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            marginTop: 28,
            fontSize: 132,
            fontWeight: 500,
            lineHeight: 0.95,
            letterSpacing: "-3",
            color: "#F2F5F2",
          }}
        >
          <span>{hero.line1}</span>
          <span>
            {hero.line2.replace(".", "")}
            <span style={{ color: "#9FDF9F" }}>.</span>
          </span>
        </div>
        {/* Lead + location */}
        <div
          style={{
            marginTop: 36,
            fontSize: 30,
            color: "#A9AFA8",
            fontWeight: 300,
            maxWidth: 820,
          }}
        >
          {hero.lead}
        </div>
        <div
          style={{
            position: "absolute",
            bottom: 60,
            left: 80,
            fontSize: 22,
            letterSpacing: "0.12em",
            color: "#7C837B",
            display: "flex",
          }}
        >
          {site.location.toUpperCase()}
        </div>
      </div>
    ),
    { ...size },
  );
}
