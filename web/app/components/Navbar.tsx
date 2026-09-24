"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { navLinks } from "@/data/design";

export default function Navbar() {
  const { scrollY } = useScroll();
  const borderOpacity = useTransform(scrollY, [0, 60], [0, 1]);

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      style={{
        borderBottom: `2.5px solid rgba(10,10,10,${borderOpacity})`,
      } as React.CSSProperties}
      className="fixed top-0 left-0 right-0 z-50 bg-[#F5F0E8]/90 backdrop-blur-sm"
    >
      <div
        className="flex items-center justify-between h-[4.5rem] px-6"
        style={{ maxWidth: "1200px", margin: "0 auto" }}
      >
        {/* Logo */}
        <motion.a
          href="#"
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          className="flex items-center gap-2 no-underline"
        >
          <span
            className="font-display font-bold text-xl tracking-tight"
            style={{ fontFamily: "'Space Grotesk', sans-serif", color: "#0A0A0A" }}
          >
            luma
            <span
              style={{
                display: "inline-block",
                width: 8,
                height: 8,
                background: "linear-gradient(135deg, #FFD60A 0%, #FF6B2B 100%)",
                borderRadius: "50%",
                marginLeft: 3,
                marginBottom: 2,
                verticalAlign: "middle",
              }}
            />
          </span>
        </motion.a>

        {/* Nav Links */}
        <div className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => (
            <motion.a
              key={link.href}
              href={link.href}
              whileHover={{ backgroundColor: "#FFD60A" }}
              transition={{ duration: 0.15 }}
              className="px-4 py-2 font-medium text-sm rounded-none no-underline"
              style={{
                fontFamily: "'Inter', sans-serif",
                color: "#0A0A0A",
                border: "2px solid transparent",
              }}
            >
              {link.label}
            </motion.a>
          ))}
        </div>

        {/* CTA */}
        <motion.a
          href="#cta"
          whileHover={{ x: -2, y: -2, boxShadow: "6px 6px 0px #0A0A0A" }}
          whileTap={{ x: 1, y: 1, boxShadow: "2px 2px 0px #0A0A0A" }}
          transition={{ duration: 0.1 }}
          className="px-5 py-2.5 font-bold text-sm no-underline"
          style={{
            fontFamily: "'Space Grotesk', sans-serif",
            background: "#0A0A0A",
            color: "#FFD60A",
            border: "2.5px solid #0A0A0A",
            boxShadow: "4px 4px 0px #FFD60A",
          }}
        >
          Try Beta →
        </motion.a>
      </div>
    </motion.nav>
  );
}
