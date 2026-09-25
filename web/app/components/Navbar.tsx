"use client";

import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { useState } from "react";
import Logo from "./Logo";
import { navLinks, siteConfig } from "@/data/design";

function GitHubIcon({ size = 20 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0 1 12 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
    </svg>
  );
}

export default function Navbar() {
  const { scrollY } = useScroll();
  const borderOpacity = useTransform(scrollY, [0, 60], [0, 1]);
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
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
          className="flex items-center justify-between h-[4.5rem] px-4 sm:px-6"
          style={{ maxWidth: "1200px", margin: "0 auto" }}
        >
          {/* Logo */}
          <motion.a
            href="#"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="flex items-center gap-2 no-underline"
          >
            <Logo size={36} />
          </motion.a>

          {/* Desktop Nav Links */}
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

          {/* Right side — GitHub + CTA + Hamburger */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* GitHub icon */}
            <motion.a
              href={siteConfig.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="View on GitHub"
              whileHover={{ scale: 1.1, color: "#FF6B2B" }}
              whileTap={{ scale: 0.95 }}
              transition={{ duration: 0.15 }}
              style={{ color: "#0A0A0A", display: "flex", alignItems: "center" }}
            >
              <GitHubIcon size={22} />
            </motion.a>

            {/* Desktop CTA */}
            <motion.a
              href="#cta"
              whileHover={{ x: -2, y: -2, boxShadow: "6px 6px 0px #0A0A0A" }}
              whileTap={{ x: 1, y: 1, boxShadow: "2px 2px 0px #0A0A0A" }}
              transition={{ duration: 0.1 }}
              className="hidden sm:block px-5 py-2.5 font-bold text-sm no-underline"
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

            {/* Mobile hamburger */}
            <motion.button
              id="nav-menu-toggle"
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              aria-expanded={menuOpen}
              onClick={() => setMenuOpen((v) => !v)}
              whileTap={{ scale: 0.9 }}
              className="md:hidden flex flex-col justify-center items-center gap-1.5 w-9 h-9"
              style={{ background: "transparent", border: "none", cursor: "pointer", padding: 4 }}
            >
              <motion.span
                animate={menuOpen ? { rotate: 45, y: 8 } : { rotate: 0, y: 0 }}
                transition={{ duration: 0.2 }}
                style={{ display: "block", width: 22, height: 2.5, background: "#0A0A0A", borderRadius: 2 }}
              />
              <motion.span
                animate={menuOpen ? { opacity: 0, scaleX: 0 } : { opacity: 1, scaleX: 1 }}
                transition={{ duration: 0.15 }}
                style={{ display: "block", width: 22, height: 2.5, background: "#0A0A0A", borderRadius: 2 }}
              />
              <motion.span
                animate={menuOpen ? { rotate: -45, y: -8 } : { rotate: 0, y: 0 }}
                transition={{ duration: 0.2 }}
                style={{ display: "block", width: 22, height: 2.5, background: "#0A0A0A", borderRadius: 2 }}
              />
            </motion.button>
          </div>
        </div>

        {/* Mobile dropdown menu */}
        <AnimatePresence>
          {menuOpen && (
            <motion.div
              id="mobile-nav-menu"
              key="mobile-menu"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.25, ease: "easeInOut" }}
              style={{
                overflow: "hidden",
                borderTop: "2.5px solid #0A0A0A",
                background: "#F5F0E8",
              }}
            >
              <div className="flex flex-col px-4 py-4 gap-2">
                {navLinks.map((link) => (
                  <motion.a
                    key={link.href}
                    href={link.href}
                    onClick={() => setMenuOpen(false)}
                    whileHover={{ backgroundColor: "#FFD60A", paddingLeft: "1.25rem" }}
                    transition={{ duration: 0.15 }}
                    className="px-4 py-3 font-medium text-sm no-underline"
                    style={{
                      fontFamily: "'Inter', sans-serif",
                      color: "#0A0A0A",
                      border: "2px solid #0A0A0A",
                    }}
                  >
                    {link.label}
                  </motion.a>
                ))}

                <motion.a
                  href="#cta"
                  onClick={() => setMenuOpen(false)}
                  whileHover={{ x: -2, y: -2, boxShadow: "6px 6px 0px #0A0A0A" }}
                  whileTap={{ x: 1, y: 1 }}
                  transition={{ duration: 0.1 }}
                  className="mt-1 px-5 py-3 font-bold text-sm no-underline text-center"
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
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>
    </>
  );
}
