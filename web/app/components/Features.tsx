"use client";

import { motion, useInView, type Variants } from "framer-motion";
import { useRef } from "react";
import { features } from "@/data/design";

const container: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15, delayChildren: 0.05 } },
};

const cardVariant: Variants = {
  hidden: { opacity: 0, y: 60 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
  },
};


export default function Features() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      id="features"
      ref={ref}
      style={{
        background: "linear-gradient(135deg, #0A0A0A 0%, #1A1040 100%)",
        paddingTop: "6rem",
        paddingBottom: "6rem",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Background noise */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: `radial-gradient(circle at 20% 50%, rgba(67, 97, 238, 0.08) 0%, transparent 60%),
            radial-gradient(circle at 80% 20%, rgba(255, 214, 10, 0.06) 0%, transparent 50%)`,
          pointerEvents: "none",
        }}
      />

      <div
        className="px-6"
        style={{ maxWidth: "1200px", margin: "0 auto", position: "relative" }}
      >
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="mb-14"
        >
          <span
            className="inline-block px-3 py-1 text-xs font-mono font-bold uppercase tracking-widest mb-4"
            style={{
              fontFamily: "'Space Mono', monospace",
              background: "rgba(255,214,10,0.15)",
              color: "#FFD60A",
              border: "1.5px solid #FFD60A",
            }}
          >
            Phase 1 Features
          </span>
          <h2
            className="font-display font-black leading-none tracking-tight"
            style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: "clamp(2.5rem, 6vw, 5rem)",
              color: "#FAFAFA",
              lineHeight: 1,
            }}
          >
            Everything you need
            <br />
            <span
              style={{
                background: "linear-gradient(90deg, #FFD60A 0%, #FF6B2B 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              to learn differently.
            </span>
          </h2>
        </motion.div>

        {/* Cards grid */}
        <motion.div
          variants={container}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          {features.map((feature, index) => (
            <motion.div
              key={feature.id}
              variants={cardVariant}
              whileHover={{
                y: -6,
                boxShadow: feature.shadowColor,
                transition: { duration: 0.15 },
              }}
              style={{
                background: "#F5F0E8",
                border: "2.5px solid #0A0A0A",
                boxShadow: "5px 5px 0px #0A0A0A",
                padding: "0",
                position: "relative",
                overflow: "hidden",
              }}
            >
              {/* Top accent gradient bar */}
              <div
                style={{
                  height: "6px",
                  background: feature.gradient,
                  flexShrink: 0,
                }}
              />

              <div style={{ padding: "1.75rem" }}>
                {/* Icon + tag row */}
                <div className="flex items-start justify-between mb-4">
                  <motion.span
                    animate={{ rotate: [0, -5, 5, 0] }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      delay: index * 0.8,
                    }}
                    style={{ fontSize: "2.5rem", display: "block", lineHeight: 1 }}
                  >
                    {feature.icon}
                  </motion.span>
                  <span
                    className="px-2 py-1 text-xs font-mono font-bold uppercase tracking-wider"
                    style={{
                      fontFamily: "'Space Mono', monospace",
                      background: feature.accentColor,
                      color: "#0A0A0A",
                      border: "1.5px solid #0A0A0A",
                      flexShrink: 0,
                    }}
                  >
                    {feature.tag}
                  </span>
                </div>

                {/* Step label */}
                <p
                  className="text-xs font-mono uppercase tracking-widest mb-1"
                  style={{ fontFamily: "'Space Mono', monospace", color: "#888" }}
                >
                  — {feature.label}
                </p>

                {/* Title */}
                <h3
                  className="font-display font-black mb-3"
                  style={{
                    fontFamily: "'Space Grotesk', sans-serif",
                    fontSize: "1.35rem",
                    color: "#0A0A0A",
                    lineHeight: 1.2,
                  }}
                >
                  {feature.title}
                </h3>

                {/* Description */}
                <p
                  className="text-sm leading-relaxed"
                  style={{ fontFamily: "'Inter', sans-serif", color: "#3D3730" }}
                >
                  {feature.description}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
