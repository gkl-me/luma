"use client";

import { motion, type Variants } from "framer-motion";
import Marquee from "./Marquee";
import { siteConfig } from "@/data/design";

const container: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15, delayChildren: 0.2 } },
};

const item: Variants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" } },
};

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative overflow-hidden pt-[4.5rem]"
      style={{ minHeight: "100svh", display: "flex", flexDirection: "column" }}
    >
      {/* Background diagonal stripe */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `
            repeating-linear-gradient(
              -45deg,
              transparent,
              transparent 24px,
              rgba(10,10,10,0.03) 24px,
              rgba(10,10,10,0.03) 26px
            )
          `,
        }}
      />

      {/* Main hero content */}
      <div
        className="flex flex-col items-center justify-center flex-1 px-6 text-center"
        style={{ maxWidth: "1200px", margin: "0 auto", width: "100%", paddingTop: "5rem", paddingBottom: "4rem" }}
      >
        <motion.div
          variants={container}
          initial="hidden"
          animate="visible"
          className="flex flex-col items-center gap-6 w-full"
        >
          {/* Phase badge */}
          <motion.div variants={item}>
            <motion.span
              whileHover={{ rotate: -2, scale: 1.05 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 font-mono text-xs font-bold uppercase tracking-widest"
              style={{
                fontFamily: "'Space Mono', monospace",
                background: "#0A0A0A",
                color: "#FFD60A",
                border: "2px solid #0A0A0A",
                boxShadow: "3px 3px 0px #FFD60A",
              }}
            >
              ◆ Phase 1 — Now Building
            </motion.span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            variants={item}
            className="font-display font-black leading-none tracking-tight"
            style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: "clamp(3rem, 9vw, 7.5rem)",
              color: "#0A0A0A",
              lineHeight: 0.95,
              maxWidth: "900px",
            }}
          >
            Turn PDFs into{" "}
            <span
              style={{
                background: "linear-gradient(135deg, #FFD60A 0%, #FF6B2B 55%, #FF3D5A 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
                display: "inline-block",
              }}
            >
              Audio
            </span>
            .
          </motion.h1>

          {/* Sub-headline */}
          <motion.p
            variants={item}
            className="text-lg md:text-xl leading-relaxed max-w-xl"
            style={{ fontFamily: "'Inter', sans-serif", color: "#3D3730" }}
          >
            Upload any PDF → Luma splits it into chapters → Hit play and{" "}
            <strong style={{ color: "#0A0A0A" }}>learn hands-free</strong>.
          </motion.p>

          {/* CTAs */}
          <motion.div
            variants={item}
            className="flex flex-wrap items-center justify-center gap-4 mt-2"
          >
            <motion.a
              href={siteConfig.appUrl}
              whileHover={{ x: -3, y: -3, boxShadow: "8px 8px 0px #0A0A0A" }}
              whileTap={{ x: 1, y: 1, boxShadow: "2px 2px 0px #0A0A0A" }}
              transition={{ duration: 0.1 }}
              className="w-full sm:w-auto px-8 py-4 font-bold text-base no-underline text-center"
              style={{
                fontFamily: "'Space Grotesk', sans-serif",
                background: "linear-gradient(135deg, #FFD60A 0%, #FF6B2B 100%)",
                color: "#0A0A0A",
                border: "2.5px solid #0A0A0A",
                boxShadow: "5px 5px 0px #0A0A0A",
                display: "inline-block",
              }}
            >
              Try it Free →
            </motion.a>

            <motion.a
              href="#how-it-works"
              whileHover={{ x: -2, y: -2, boxShadow: "6px 6px 0px #0A0A0A" }}
              whileTap={{ x: 1, y: 1, boxShadow: "2px 2px 0px #0A0A0A" }}
              transition={{ duration: 0.1 }}
              className="w-full sm:w-auto px-8 py-4 font-bold text-base no-underline text-center"
              style={{
                fontFamily: "'Space Grotesk', sans-serif",
                background: "transparent",
                color: "#0A0A0A",
                border: "2.5px solid #0A0A0A",
                boxShadow: "4px 4px 0px #0A0A0A",
                display: "inline-block",
              }}
            >
              See How It Works
            </motion.a>
          </motion.div>

          {/* Hero visual card */}
          <motion.div
            variants={item}
            className="w-full mt-10"
            style={{ maxWidth: "720px" }}
          >
            <motion.div
              whileHover={{ y: -4 }}
              transition={{ duration: 0.3 }}
              style={{
                background: "#0A0A0A",
                border: "2.5px solid #0A0A0A",
                boxShadow: "8px 8px 0px #FFD60A",
                padding: "1rem 1.25rem",
                borderRadius: 0,
              }}
              className="sm:p-8"
            >
              {/* Fake browser bar */}
              <div className="flex items-center gap-2 mb-4">
                <div style={{ width: 12, height: 12, borderRadius: "50%", background: "#FF3D5A", border: "1.5px solid #fff2" }} />
                <div style={{ width: 12, height: 12, borderRadius: "50%", background: "#FFD60A", border: "1.5px solid #fff2" }} />
                <div style={{ width: 12, height: 12, borderRadius: "50%", background: "#22C55E", border: "1.5px solid #fff2" }} />
                <div
                  className="flex-1 ml-3 px-3 py-1 text-xs"
                  style={{
                    background: "#1A1A1A",
                    color: "#888",
                    fontFamily: "'Space Mono', monospace",
                    border: "1.5px solid #333",
                  }}
                >
                  app.luma.ai/listen
                </div>
              </div>

              {/* Fake UI content */}
              <div className="flex flex-col sm:flex-row items-start gap-3">
                {/* Chapter list */}
                <div className="flex-1 flex flex-col gap-2 w-full">
                  <p style={{ fontFamily: "'Space Mono', monospace", color: "#888", fontSize: "0.65rem", marginBottom: "0.25rem" }}>
                    CHAPTERS — lecture_notes.pdf
                  </p>
                  {["Chapter 1: Introduction", "Chapter 2: Core Concepts", "Chapter 3: Deep Dive"].map(
                    (ch, i) => (
                      <motion.div
                        key={ch}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.8 + i * 0.15 }}
                        className="flex items-center gap-3 px-3 py-2"
                        style={{
                          background: i === 1 ? "#FFD60A" : "#1A1A1A",
                          border: `1.5px solid ${i === 1 ? "#FFD60A" : "#333"}`,
                          color: i === 1 ? "#0A0A0A" : "#888",
                          fontFamily: "'Space Grotesk', sans-serif",
                          fontSize: "0.8rem",
                          fontWeight: i === 1 ? 700 : 400,
                        }}
                      >
                        <span style={{ fontSize: "0.7rem" }}>{i === 1 ? "▶" : "○"}</span>
                        {ch}
                      </motion.div>
                    )
                  )}
                </div>

                {/* Player — hidden on mobile, visible sm+ */}
                <div
                  className="hidden sm:flex flex-col items-center gap-3 px-4 py-3"
                  style={{
                    background: "#1A1A1A",
                    border: "1.5px solid #333",
                    minWidth: "140px",
                  }}
                >
                  <span style={{ color: "#888", fontSize: "0.65rem", fontFamily: "'Space Mono', monospace" }}>NOW PLAYING</span>
                  <span style={{ fontSize: "1.8rem" }}>🎧</span>
                  <div className="w-full h-1 rounded-none" style={{ background: "#333" }}>
                    <motion.div
                      className="h-full"
                      style={{ background: "#FFD60A", width: "40%" }}
                      animate={{ width: ["30%", "60%", "30%"] }}
                      transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                    />
                  </div>
                  <div className="flex gap-3" style={{ color: "#FFD60A", fontSize: "1rem" }}>
                    <span>⏮</span>
                    <span>⏸</span>
                    <span>⏭</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>

      {/* Marquee ticker */}
      <Marquee />
    </section>
  );
}
