"use client";

import { motion } from "framer-motion";
import { marqueeItems } from "@/data/design";

export default function Marquee() {
  const doubled = [...marqueeItems, ...marqueeItems];

  return (
    <div
      className="relative overflow-hidden border-y-[2.5px] border-[#0A0A0A] py-3"
      style={{ background: "linear-gradient(90deg, #FFD60A 0%, #FFAA00 100%)" }}
      aria-hidden="true"
    >
      <motion.div
        className="flex gap-8 whitespace-nowrap"
        animate={{ x: ["0%", "-50%"] }}
        transition={{ duration: 18, ease: "linear", repeat: Infinity }}
      >
        {doubled.map((item, i) => (
          <span
            key={i}
            className="font-bold text-sm uppercase tracking-widest"
            style={{
              fontFamily: "'Space Grotesk', sans-serif",
              color: "#0A0A0A",
              minWidth: "fit-content",
            }}
          >
            {item}
          </span>
        ))}
      </motion.div>
    </div>
  );
}
