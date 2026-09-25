"use client";

import { motion } from "framer-motion";
import Logo from "./Logo";
import { navLinks, siteConfig } from "@/data/design";

function GitHubIcon({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0 1 12 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
    </svg>
  );
}

export default function Footer() {
  return (
    <footer
      style={{
        background: "#0A0A0A",
        borderTop: "2.5px solid #FFD60A",
        padding: "3rem 1.5rem 2rem",
      }}
    >
      <div
        style={{ maxWidth: "1200px", margin: "0 auto" }}
        className="flex flex-col md:flex-row items-center md:items-start justify-between gap-8"
      >
        {/* Logo + tagline */}
        <div className="flex flex-col gap-3">
          <motion.a
            href="#"
            whileHover={{ scale: 1.02 }}
            className="no-underline inline-block"
          >
            <Logo size={36} theme="dark" />
          </motion.a>
          <p
            className="text-xs max-w-[200px]"
            style={{ fontFamily: "'Inter', sans-serif", color: "#554E6A" }}
          >
            PDFs that listen back.
          </p>
        </div>

        {/* Nav */}
        <nav className="flex flex-wrap gap-6 justify-center" aria-label="Footer navigation">
          {navLinks.map((link) => (
            <motion.a
              key={link.href}
              href={link.href}
              whileHover={{ color: "#FFD60A" }}
              transition={{ duration: 0.15 }}
              className="text-sm font-medium no-underline"
              style={{ fontFamily: "'Inter', sans-serif", color: "#A8A0B0" }}
            >
              {link.label}
            </motion.a>
          ))}
        </nav>

        {/* Right side — GitHub + Phase tag */}
        <div className="flex flex-col items-center md:items-end gap-3">
          <motion.a
            href={siteConfig.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="View Luma on GitHub"
            whileHover={{ color: "#FFD60A", scale: 1.05 }}
            transition={{ duration: 0.15 }}
            className="flex items-center no-underline"
            style={{ color: "#A8A0B0" }}
          >
            <GitHubIcon size={18} />
          </motion.a>
          <span
            className="px-3 py-1 text-xs font-mono font-bold uppercase tracking-widest"
            style={{
              fontFamily: "'Space Mono', monospace",
              background: "rgba(255,214,10,0.1)",
              color: "#FFD60A",
              border: "1.5px solid rgba(255,214,10,0.4)",
            }}
          >
            Phase 1 — In Progress
          </span>
          <p
            className="text-xs"
            style={{ fontFamily: "'Space Mono', monospace", color: "#332D3F" }}
          >
            © 2026 Luma. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
