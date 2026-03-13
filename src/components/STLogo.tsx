"use client";

import Image from "next/image";
import { useTheme } from "./ThemeProvider";

interface Props {
  size?: number;
  className?: string;
}

export default function STLogo({ size = 40, className = "" }: Props) {
  const { theme } = useTheme();

  return (
    <div className={`relative shrink-0 ${className}`} style={{ width: size, height: size }}>
      {/* ST mark — inverted to white for dark mode */}
      <Image
        src="/logos/stmy-icon-black.png"
        alt="Superteam Malaysia"
        width={size}
        height={size}
        className={theme === "dark" ? "brightness-0 invert" : ""}
        unoptimized
      />
      {/* Overlay real flag colors in dark mode (invert would distort the flag) */}
      {theme === "dark" && (
        <Image
          src="/logos/stmy-flag.png"
          alt=""
          width={size}
          height={size}
          className="absolute inset-0"
          unoptimized
        />
      )}
    </div>
  );
}
