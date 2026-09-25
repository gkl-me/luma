"use client";

import Image from "next/image";

interface LogoProps {
  size?: number;
  variant?: "full" | "mark";
  theme?: "light" | "dark";
  className?: string;
}

export function LogoIcon({
  size = 36,
  className = "",
}: {
  size?: number;
  className?: string;
}) {
  return (
    <Image
      src="/favicon.svg"
      alt="Luma logo"
      width={size}
      height={size}
      priority
      className={`shrink-0 ${className}`}
    />
  );
}

export default function Logo({
  size = 36,
  variant = "full",
  theme = "light",
  className = "",
}: LogoProps) {
  const isDark = theme === "dark";

  if (variant === "mark") {
    return <LogoIcon size={size} className={className} />;
  }

  return (
    <div className={`inline-flex items-center gap-2.5 select-none ${className}`}>
      <LogoIcon size={size} />
      <span
        className="font-display font-extrabold tracking-tight leading-none"
        style={{
          fontFamily: "'Space Grotesk', sans-serif",
          fontSize: size * 0.65,
          color: isDark ? "#FAFAFA" : "#0A0A0A",
        }}
      >
        luma
      </span>
    </div>
  );
}
