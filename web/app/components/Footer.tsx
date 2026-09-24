"use client";

import { motion } from "framer-motion";
import { navLinks } from "@/data/design";

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
          <motion.span
            whileHover={{ scale: 1.02 }}
            className="font-display font-black text-2xl tracking-tight"
            style={{ fontFamily: "'Space Grotesk', sans-serif", color: "#FAFAFA" }}
          >
            luma
            <span
              style={{
                display: "inline-block",
                width: 9,
                height: 9,
                background: "linear-gradient(135deg, #FFD60A 0%, #FF6B2B 100%)",
                borderRadius: "50%",
                marginLeft: 3,
                marginBottom: 2,
                verticalAlign: "middle",
              }}
            />
          </motion.span>
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

        {/* Phase tag */}
        <div className="flex flex-col items-center md:items-end gap-2">
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
