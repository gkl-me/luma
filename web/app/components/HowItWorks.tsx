"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { steps } from "@/data/design";

export default function HowItWorks() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      id="how-it-works"
      ref={ref}
      style={{
        background: "linear-gradient(160deg, #F5F0E8 0%, #F0E9D2 100%)",
        paddingTop: "6rem",
        paddingBottom: "6rem",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Decorative large number */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          right: "-2rem",
          top: "50%",
          transform: "translateY(-50%)",
          fontSize: "28rem",
          fontFamily: "'Space Grotesk', sans-serif",
          fontWeight: 900,
          color: "rgba(10,10,10,0.03)",
          lineHeight: 1,
          userSelect: "none",
          pointerEvents: "none",
        }}
      >
        03
      </div>

      <div
        className="px-6"
        style={{ maxWidth: "1200px", margin: "0 auto", position: "relative" }}
      >
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="mb-16 flex flex-col md:flex-row md:items-end md:justify-between gap-6"
        >
          <div>
            <span
              className="inline-block px-3 py-1 text-xs font-mono font-bold uppercase tracking-widest mb-4"
              style={{
                fontFamily: "'Space Mono', monospace",
                background: "#0A0A0A",
                color: "#FFD60A",
                border: "1.5px solid #0A0A0A",
              }}
            >
              How It Works
            </span>
            <h2
              className="font-display font-black leading-none"
              style={{
                fontFamily: "'Space Grotesk', sans-serif",
                fontSize: "clamp(2.5rem, 6vw, 5rem)",
                color: "#0A0A0A",
                lineHeight: 1,
              }}
            >
              Three steps.
              <br />
              <span
                style={{
                  background: "linear-gradient(90deg, #4361EE 0%, #00CFFF 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                That&apos;s it.
              </span>
            </h2>
          </div>

          <p
            className="text-base leading-relaxed max-w-xs"
            style={{ fontFamily: "'Inter', sans-serif", color: "#3D3730" }}
          >
            No complex setup. No learning curve. Just upload, parse, and listen.
          </p>
        </motion.div>

        {/* Steps */}
        <div className="flex flex-col gap-0">
          {steps.map((step, index) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.65, delay: index * 0.18, ease: "easeOut" }}
              className="flex flex-col md:flex-row items-stretch"
            >
              {/* Number column */}
              <motion.div
                whileHover={{ scale: 1.03 }}
                transition={{ duration: 0.2 }}
                className="flex items-center justify-center"
                style={{
                  background: step.color,
                  border: "2.5px solid #0A0A0A",
                  borderBottom: "0",
                  minWidth: "120px",
                  padding: "1.5rem",
                }}
              >
                <span
                  className="font-display font-black text-5xl"
                  style={{ fontFamily: "'Space Grotesk', sans-serif", color: "#0A0A0A" }}
                >
                  {step.number}
                </span>
              </motion.div>

              {/* Content column */}
              <motion.div
                whileHover={{ backgroundColor: step.bg }}
                transition={{ duration: 0.2 }}
                className="flex-1 flex flex-col justify-center"
                style={{
                  background: "#FAFAFA",
                  border: "2.5px solid #0A0A0A",
                  borderTop: "0",
                  borderBottom: index < steps.length - 1 ? "0" : "2.5px solid #0A0A0A",
                  padding: "1.5rem 2rem",
                }}
              >
                <h3
                  className="font-display font-black mb-2"
                  style={{
                    fontFamily: "'Space Grotesk', sans-serif",
                    fontSize: "1.5rem",
                    color: "#0A0A0A",
                  }}
                >
                  {step.title}
                </h3>
                <p
                  className="text-base leading-relaxed"
                  style={{ fontFamily: "'Inter', sans-serif", color: "#3D3730" }}
                >
                  {step.description}
                </p>
              </motion.div>

              {/* Arrow column — desktop only */}
              <div
                className="hidden md:flex items-center justify-center"
                style={{
                  background: "#0A0A0A",
                  border: "2.5px solid #0A0A0A",
                  borderLeft: "0",
                  borderBottom: index < steps.length - 1 ? "0" : "2.5px solid #0A0A0A",
                  padding: "0 1.5rem",
                  minWidth: "72px",
                }}
              >
                <motion.span
                  animate={{ x: [0, 4, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity, delay: index * 0.4 }}
                  style={{ fontSize: "1.5rem", color: step.color }}
                >
                  →
                </motion.span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
