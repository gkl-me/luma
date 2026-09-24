"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

export default function CTA() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      id="cta"
      ref={ref}
      style={{
        background: "linear-gradient(135deg, #0A0A0A 0%, #1A1040 100%)",
        paddingTop: "6rem",
        paddingBottom: "6rem",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Background blobs */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          pointerEvents: "none",
          background: `
            radial-gradient(circle at 10% 90%, rgba(255,214,10,0.1) 0%, transparent 45%),
            radial-gradient(circle at 90% 10%, rgba(255,61,90,0.08) 0%, transparent 45%)
          `,
        }}
      />

      <div
        className="px-6"
        style={{ maxWidth: "900px", margin: "0 auto", position: "relative" }}
      >
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="flex flex-col items-center text-center gap-8"
        >
          {/* Badge */}
          <motion.span
            initial={{ scale: 0.8, opacity: 0 }}
            animate={isInView ? { scale: 1, opacity: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="px-4 py-1.5 text-xs font-mono font-bold uppercase tracking-widest"
            style={{
              fontFamily: "'Space Mono', monospace",
              background: "rgba(255,214,10,0.15)",
              color: "#FFD60A",
              border: "1.5px solid #FFD60A",
            }}
          >
            ◆ Join the Beta
          </motion.span>

          {/* Headline */}
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="font-display font-black leading-none"
            style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: "clamp(2.8rem, 7vw, 6rem)",
              color: "#FAFAFA",
              lineHeight: 0.95,
            }}
          >
            Start listening
            <br />
            <span
              style={{
                background: "linear-gradient(135deg, #FFD60A 0%, #FF6B2B 55%, #FF3D5A 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              today.
            </span>
          </motion.h2>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.25 }}
            className="text-lg leading-relaxed max-w-md"
            style={{ fontFamily: "'Inter', sans-serif", color: "#A8A0B0" }}
          >
            Be among the first to upload, parse, and listen. We&apos;re launching Phase 1 soon.
          </motion.p>

          {/* Email form */}
          <motion.form
            initial={{ opacity: 0, y: 25 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.35 }}
            onSubmit={(e) => e.preventDefault()}
            className="flex flex-col sm:flex-row gap-0 w-full max-w-lg"
          >
            <input
              type="email"
              id="cta-email"
              placeholder="your@email.com"
              required
              className="flex-1 px-5 py-4 text-base outline-none"
              style={{
                fontFamily: "'Inter', sans-serif",
                background: "#FAFAFA",
                color: "#0A0A0A",
                border: "2.5px solid #FFD60A",
                borderRight: "0",
              }}
            />
            <motion.button
              type="submit"
              whileHover={{ x: -3, y: -3, boxShadow: "8px 8px 0px #FFD60A" }}
              whileTap={{ x: 1, y: 1, boxShadow: "2px 2px 0px #FFD60A" }}
              transition={{ duration: 0.1 }}
              className="px-8 py-4 font-bold text-base"
              style={{
                fontFamily: "'Space Grotesk', sans-serif",
                background: "linear-gradient(135deg, #FFD60A 0%, #FF6B2B 100%)",
                color: "#0A0A0A",
                border: "2.5px solid #FFD60A",
                boxShadow: "5px 5px 0px #FFD60A",
                cursor: "pointer",
                whiteSpace: "nowrap",
              }}
            >
              Get Access →
            </motion.button>
          </motion.form>

          {/* Social proof / note */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="text-xs"
            style={{ fontFamily: "'Space Mono', monospace", color: "#554E6A" }}
          >
            No credit card. No spam. Just early access.
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
}
