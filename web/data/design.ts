/**
 * Luma Design System
 * Neo-Brutalist color palette, gradients, and design tokens
 * All visual design decisions should live here.
 */

// ─── Color Palette ──────────────────────────────────────────────────────────

export const colors = {
  // Primary Brand Colors
  primary: {
    black: "#0A0A0A",
    white: "#FAFAFA",
    cream: "#F5F0E8",
    creamDark: "#F0E9D2",
  },

  // Accent Colors — bold, saturated neo-brutalist palette
  accent: {
    yellow: "#FFD60A",
    amber: "#FFAA00",
    orange: "#FF6B2B",
    coral: "#FF3D5A",
    pink: "#FF2D78",
    violet: "#7B2FBE",
    indigo: "#4361EE",
    blue: "#2563EB",
    cyan: "#00CFFF",
    teal: "#00D4AA",
    lime: "#ADFF2F",
    green: "#22C55E",
  },

  // Semantic tokens
  border: "#0A0A0A",
  shadow: "#0A0A0A",
  shadowAccent: "#FFD60A",
  shadowCoral: "#FF3D5A",
  shadowIndigo: "#4361EE",
} as const;


// ─── Gradients ───────────────────────────────────────────────────────────────

export const gradients = {
  // Page backgrounds
  pageBg: `linear-gradient(160deg, #F5F0E8 0%, #F0E9D2 50%, #EDE5CC 100%)`,
  heroBg: `linear-gradient(135deg, #FFD60A 0%, #FF6B2B 55%, #FF3D5A 100%)`,
  darkBg: `linear-gradient(135deg, #0A0A0A 0%, #1A1040 100%)`,

  // CTA gradients
  ctaBg: `linear-gradient(135deg, #FF3D5A 0%, #FF6B2B 100%)`,
  ctaAlt: `linear-gradient(135deg, #4361EE 0%, #7B2FBE 100%)`,

  // Card accent bars
  cardYellow: `linear-gradient(135deg, #FFD60A 0%, #FFAA00 100%)`,
  cardBlue: `linear-gradient(135deg, #4361EE 0%, #7B2FBE 100%)`,
  cardCoral: `linear-gradient(135deg, #FF3D5A 0%, #FF6B2B 100%)`,
  cardTeal: `linear-gradient(135deg, #00D4AA 0%, #00CFFF 100%)`,

  // Text gradients
  textGold: `linear-gradient(90deg, #FFD60A 0%, #FF6B2B 100%)`,
  textCool: `linear-gradient(90deg, #4361EE 0%, #00CFFF 100%)`,
  textFire: `linear-gradient(90deg, #FF3D5A 0%, #FF6B2B 100%)`,
  textLime: `linear-gradient(90deg, #ADFF2F 0%, #00D4AA 100%)`,

  // Marquee / ticker
  marqueeBg: `linear-gradient(90deg, #FFD60A 0%, #FFAA00 100%)`,

  // Step number badges
  stepBadge: `linear-gradient(135deg, #FFD60A 0%, #FF6B2B 60%)`,
} as const;

// ─── Typography ──────────────────────────────────────────────────────────────

export const typography = {
  fontDisplay: "'Space Grotesk', sans-serif",
  fontBody: "'Inter', sans-serif",
  fontMono: "'Space Mono', monospace",
} as const;

// ─── Shadows (Neo-Brutalist offset box-shadows) ───────────────────────────────

export const shadows = {
  sm: "3px 3px 0px #0A0A0A",
  md: "5px 5px 0px #0A0A0A",
  lg: "8px 8px 0px #0A0A0A",
  xl: "12px 12px 0px #0A0A0A",
  accentYellow: "6px 6px 0px #FFD60A",
  accentCoral: "6px 6px 0px #FF3D5A",
  accentIndigo: "6px 6px 0px #4361EE",
  hover: "2px 2px 0px #0A0A0A",
} as const;

// ─── Borders ─────────────────────────────────────────────────────────────────

export const borders = {
  thin: "2px solid #0A0A0A",
  standard: "2.5px solid #0A0A0A",
  thick: "3.5px solid #0A0A0A",
  accentYellow: "2.5px solid #FFD60A",
  accentOrange: "2.5px solid #FF6B2B",
  accentIndigo: "2.5px solid #4361EE",
  white: "2.5px solid #FAFAFA",
} as const;

// ─── Spacing ─────────────────────────────────────────────────────────────────

export const spacing = {
  sectionPaddingY: "6rem",
  sectionPaddingX: "1.5rem",
  containerMaxWidth: "1200px",
  navHeight: "4.5rem",
} as const;

// ─── Animation Variants (for Framer Motion) ──────────────────────────────────

export const motionVariants = {
  fadeUp: {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
  },
  fadeIn: {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.5, ease: "easeOut" } },
  },
  scaleIn: {
    hidden: { opacity: 0, scale: 0.85 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.5, ease: [0.34, 1.56, 0.64, 1] as [number, number, number, number] },
    },
  },

  slideLeft: {
    hidden: { opacity: 0, x: -60 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: "easeOut" } },
  },
  staggerContainer: {
    hidden: {},
    visible: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
  },
} as const;

// ─── Features (Phase 1 from Todo.md) ─────────────────────────────────────────

export const features = [
  {
    id: "upload",
    icon: "📄",
    label: "Upload",
    title: "Drop Any PDF",
    description:
      "Upload textbooks, research papers, or reports. Luma parses every byte and intelligently extracts clean content — no formatting headaches.",
    gradient: "linear-gradient(135deg, #FFD60A 0%, #FFAA00 100%)",
    accentColor: "#FFD60A",
    shadowColor: "6px 6px 0px #FFD60A",
    tag: "Phase 1",
  },
  {
    id: "chapters",
    icon: "📖",
    label: "Parse",
    title: "Auto-Chapter Split",
    description:
      "Luma reads your document structure and slices it into logical chapters — so you learn at your own pace, one crisp section at a time.",
    gradient: "linear-gradient(135deg, #4361EE 0%, #7B2FBE 100%)",
    accentColor: "#4361EE",
    shadowColor: "6px 6px 0px #4361EE",
    tag: "Phase 1",
  },
  {
    id: "listen",
    icon: "🎧",
    label: "Listen",
    title: "Audio Listen Mode",
    description:
      "Transform any chapter into crisp, natural audio. Study while commuting, exercising, or just chilling — without losing your place.",
    gradient: "linear-gradient(135deg, #FF3D5A 0%, #FF6B2B 100%)",
    accentColor: "#FF3D5A",
    shadowColor: "6px 6px 0px #FF3D5A",
    tag: "Phase 1",
  },
] as const;

// ─── How It Works Steps ───────────────────────────────────────────────────────

export const steps = [
  {
    number: "01",
    title: "Upload Your PDF",
    description: "Drag & drop or browse to upload any PDF. We handle the rest instantly.",
    color: "#FFD60A",
    bg: "#FFF9D6",
  },
  {
    number: "02",
    title: "We Parse It",
    description:
      "Luma analyzes document structure and breaks it into clean, numbered chapters automatically.",
    color: "#4361EE",
    bg: "#EEF0FF",
  },
  {
    number: "03",
    title: "Start Listening",
    description:
      "Pick a chapter and hit play. Natural text-to-speech, chapter by chapter, on any device.",
    color: "#FF3D5A",
    bg: "#FFF0F2",
  },
] as const;

// ─── Navigation ───────────────────────────────────────────────────────────────

export const navLinks = [
  { label: "Features", href: "#features" },
  { label: "How It Works", href: "#how-it-works" },
  { label: "Get Started", href: "#cta" },
] as const;

// ─── Marquee Tags ─────────────────────────────────────────────────────────────

export const marqueeItems = [
  "PDF to Audio",
  "✦",
  "Chapter Parsing",
  "✦",
  "Hands-Free Learning",
  "✦",
  "Smart Upload",
  "✦",
  "Listen Anywhere",
  "✦",
  "Study Smarter",
  "✦",
] as const;

