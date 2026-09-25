"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { demoDocument, type Chapter } from "@/data/demoData";
import { motionVariants } from "@/data/design";

// ─── Icons ────────────────────────────────────────────────────────────────────

function IconUpload() {
  return (
    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
      <polyline points="17 8 12 3 7 8" />
      <line x1="12" y1="3" x2="12" y2="15" />
    </svg>
  );
}

function IconPlay() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
      <polygon points="5 3 19 12 5 21 5 3" />
    </svg>
  );
}

function IconPause() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
      <rect x="6" y="4" width="4" height="16" />
      <rect x="14" y="4" width="4" height="16" />
    </svg>
  );
}

function IconSkipBack() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
      <polygon points="19 20 9 12 19 4 19 20" />
      <line x1="5" y1="19" x2="5" y2="5" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" fill="none" />
    </svg>
  );
}

function IconSkipForward() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
      <polygon points="5 4 15 12 5 20 5 4" />
      <line x1="19" y1="5" x2="19" y2="19" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" fill="none" />
    </svg>
  );
}

function IconVolume() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
      <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
      <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
    </svg>
  );
}

function IconCheck() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}

function IconDoc() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
      <polyline points="14 2 14 8 20 8" />
    </svg>
  );
}

function IconHeadphones() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 18v-6a9 9 0 0 1 18 0v6" />
      <path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z" />
    </svg>
  );
}

function IconClose() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  );
}

// ─── Upload Panel ─────────────────────────────────────────────────────────────

function UploadPanel({ onDismiss }: { onDismiss: () => void }) {
  const [dragging, setDragging] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [done, setDone] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  function simulateUpload() {
    setUploading(true);
    let p = 0;
    const interval = setInterval(() => {
      p += Math.random() * 18;
      if (p >= 100) {
        p = 100;
        clearInterval(interval);
        setDone(true);
        setTimeout(onDismiss, 1200);
      }
      setProgress(Math.min(p, 100));
    }, 120);
  }

  function handleDrop(e: React.DragEvent) {
    e.preventDefault();
    setDragging(false);
    simulateUpload();
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      style={{
        border: "2.5px solid #0A0A0A",
        boxShadow: "8px 8px 0px #0A0A0A",
        borderRadius: "0px",
        background: "#FAFAFA",
        padding: "2rem",
        position: "relative",
      }}
    >
      {/* Header */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "1.5rem" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
          <div style={{ background: "#FFD60A", border: "2.5px solid #0A0A0A", padding: "0.4rem", display: "flex" }}>
            <IconDoc />
          </div>
          <h2 style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: "1.2rem", margin: 0 }}>
            Upload a New PDF
          </h2>
        </div>
        <button
          onClick={onDismiss}
          style={{ background: "none", border: "2px solid #0A0A0A", cursor: "pointer", padding: "0.3rem", display: "flex", boxShadow: "2px 2px 0 #0A0A0A" }}
        >
          <IconClose />
        </button>
      </div>

      {/* Drop Zone */}
      {!uploading ? (
        <div
          onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
          onDragLeave={() => setDragging(false)}
          onDrop={handleDrop}
          onClick={() => inputRef.current?.click()}
          style={{
            border: `2.5px dashed ${dragging ? "#4361EE" : "#0A0A0A"}`,
            background: dragging ? "#EEF0FF" : "#F5F0E8",
            padding: "3rem 2rem",
            textAlign: "center",
            cursor: "pointer",
            transition: "all 0.2s",
            boxShadow: dragging ? "6px 6px 0px #4361EE" : "none",
          }}
        >
          <input ref={inputRef} type="file" accept=".pdf" style={{ display: "none" }} onChange={simulateUpload} />
          <div style={{ color: dragging ? "#4361EE" : "#0A0A0A", marginBottom: "1rem" }}>
            <IconUpload />
          </div>
          <p style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: "1.1rem", margin: "0 0 0.4rem" }}>
            {dragging ? "Drop it!" : "Drag & drop your PDF"}
          </p>
          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.85rem", color: "#555", margin: 0 }}>
            or <span style={{ textDecoration: "underline", fontWeight: 600 }}>click to browse</span> — max 100 MB
          </p>
        </div>
      ) : (
        <div style={{ padding: "2rem", background: "#F5F0E8", border: "2.5px solid #0A0A0A" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "0.6rem", marginBottom: "1rem" }}>
            {done
              ? <span style={{ background: "#22C55E", color: "#fff", border: "2px solid #0A0A0A", padding: "0.2rem 0.6rem", fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: "0.8rem" }}>✓ DONE</span>
              : <span style={{ background: "#4361EE", color: "#fff", border: "2px solid #0A0A0A", padding: "0.2rem 0.6rem", fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: "0.8rem" }}>UPLOADING</span>
            }
            <span style={{ fontFamily: "'Space Mono', monospace", fontSize: "0.85rem", fontWeight: 700 }}>
              {Math.round(progress)}%
            </span>
          </div>
          <div style={{ height: "12px", background: "#0A0A0A", border: "2px solid #0A0A0A" }}>
            <div
              style={{
                height: "100%",
                width: `${progress}%`,
                background: done
                  ? "linear-gradient(90deg, #22C55E, #00D4AA)"
                  : "linear-gradient(90deg, #FFD60A, #FF6B2B)",
                transition: "width 0.15s ease",
              }}
            />
          </div>
        </div>
      )}

      {/* Supported note */}
      {!uploading && (
        <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.78rem", color: "#888", margin: "1rem 0 0", textAlign: "center" }}>
          Supported: PDF only · Auto chapter detection on upload
        </p>
      )}
    </motion.div>
  );
}

// ─── Chapter Card ─────────────────────────────────────────────────────────────

function ChapterCard({
  chapter,
  isActive,
  onClick,
}: {
  chapter: Chapter;
  isActive: boolean;
  onClick: () => void;
}) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3 }}
      onClick={onClick}
      style={{
        border: `2.5px solid #0A0A0A`,
        boxShadow: isActive ? `6px 6px 0px ${chapter.accentColor}` : "4px 4px 0px #0A0A0A",
        background: isActive ? "#FAFAFA" : "#F5F0E8",
        cursor: "pointer",
        transition: "box-shadow 0.2s, transform 0.15s",
        transform: isActive ? "translate(-2px, -2px)" : "none",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Accent bar */}
      <div
        style={{
          position: "absolute",
          left: 0,
          top: 0,
          bottom: 0,
          width: "5px",
          background: chapter.accentColor,
        }}
      />

      <div style={{ padding: "1rem 1rem 1rem 1.4rem", display: "flex", alignItems: "center", gap: "0.9rem" }}>
        {/* Number Badge */}
        <div
          style={{
            minWidth: "36px",
            height: "36px",
            border: "2.5px solid #0A0A0A",
            background: isActive ? chapter.accentColor : "#0A0A0A",
            color: isActive ? "#0A0A0A" : "#FAFAFA",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontFamily: "'Space Mono', monospace",
            fontWeight: 700,
            fontSize: "0.75rem",
            flexShrink: 0,
          }}
        >
          {chapter.status === "done" ? <IconCheck /> : String(chapter.number).padStart(2, "0")}
        </div>

        {/* Text */}
        <div style={{ flex: 1, minWidth: 0 }}>
          <p style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontWeight: 700,
            fontSize: "0.9rem",
            margin: "0 0 0.2rem",
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}>
            {chapter.title}
          </p>
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
            <span style={{ fontFamily: "'Space Mono', monospace", fontSize: "0.72rem", color: "#555" }}>
              {chapter.duration}
            </span>
            <span style={{ width: "3px", height: "3px", borderRadius: "50%", background: "#999" }} />
            <span style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.72rem", color: "#777" }}>
              pp. {chapter.pages}
            </span>
          </div>

          {/* Progress bar (only if started) */}
          {chapter.progress > 0 && (
            <div style={{ marginTop: "0.45rem", height: "4px", background: "#0A0A0A20", position: "relative" }}>
              <div
                style={{
                  position: "absolute",
                  left: 0,
                  top: 0,
                  height: "100%",
                  width: `${chapter.progress}%`,
                  background: chapter.accentColor,
                  transition: "width 0.3s",
                }}
              />
            </div>
          )}
        </div>

        {/* Status pill */}
        {chapter.status === "playing" && (
          <div style={{
            background: chapter.accentColor,
            border: "2px solid #0A0A0A",
            padding: "0.15rem 0.5rem",
            fontFamily: "'Space Grotesk', sans-serif",
            fontWeight: 700,
            fontSize: "0.65rem",
            letterSpacing: "0.05em",
            flexShrink: 0,
          }}>
            NOW
          </div>
        )}
      </div>
    </motion.div>
  );
}

// ─── Player ────────────────────────────────────────────────────────────────────

function Player({
  chapter,
  onPrev,
  onNext,
  hasPrev,
  hasNext,
}: {
  chapter: Chapter;
  onPrev: () => void;
  onNext: () => void;
  hasPrev: boolean;
  hasNext: boolean;
}) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [elapsed, setElapsed] = useState(
    Math.round((chapter.progress / 100) * chapter.durationSeconds)
  );
  const [volume, setVolume] = useState(80);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    setElapsed(Math.round((chapter.progress / 100) * chapter.durationSeconds));
    setIsPlaying(chapter.status === "playing");
  }, [chapter]);

  useEffect(() => {
    if (isPlaying) {
      intervalRef.current = setInterval(() => {
        setElapsed((e) => {
          if (e >= chapter.durationSeconds) {
            setIsPlaying(false);
            return chapter.durationSeconds;
          }
          return e + 1;
        });
      }, 1000);
    } else {
      if (intervalRef.current) clearInterval(intervalRef.current);
    }
    return () => { if (intervalRef.current) clearInterval(intervalRef.current); };
  }, [isPlaying, chapter.durationSeconds]);

  function fmt(s: number) {
    const m = Math.floor(s / 60);
    const sec = s % 60;
    return `${String(m).padStart(2, "0")}:${String(sec).padStart(2, "0")}`;
  }

  const pct = (elapsed / chapter.durationSeconds) * 100;

  return (
    <motion.div
      key={chapter.id}
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      style={{
        border: "2.5px solid #0A0A0A",
        boxShadow: `8px 8px 0px ${chapter.accentColor}`,
        background: "#0A0A0A",
        color: "#FAFAFA",
        borderRadius: "0",
        overflow: "hidden",
      }}
    >
      {/* Top accent strip */}
      <div style={{ height: "6px", background: chapter.accentColor }} />

      <div style={{ padding: "1.75rem 2rem" }}>
        {/* Label */}
        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "1.25rem" }}>
          <div style={{ background: chapter.accentColor, border: "2px solid #FAFAFA", padding: "0.25rem 0.5rem", display: "flex", alignItems: "center", gap: "0.4rem" }}>
            <IconHeadphones />
            <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: "0.7rem", color: "#0A0A0A" }}>
              NOW PLAYING
            </span>
          </div>
          <span style={{ fontFamily: "'Space Mono', monospace", fontSize: "0.75rem", color: "#777" }}>
            Ch. {String(chapter.number).padStart(2, "0")}
          </span>
        </div>

        {/* Title */}
        <h3 style={{
          fontFamily: "'Space Grotesk', sans-serif",
          fontWeight: 800,
          fontSize: "1.3rem",
          margin: "0 0 0.4rem",
          lineHeight: 1.2,
        }}>
          {chapter.title}
        </h3>
        <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.82rem", color: "#999", margin: "0 0 1.75rem" }}>
          {chapter.summary.slice(0, 90)}…
        </p>

        {/* Progress bar (scrubber) */}
        <div
          style={{ position: "relative", marginBottom: "0.5rem", cursor: "pointer" }}
          onClick={(e) => {
            const rect = e.currentTarget.getBoundingClientRect();
            const ratio = (e.clientX - rect.left) / rect.width;
            setElapsed(Math.round(ratio * chapter.durationSeconds));
          }}
        >
          <div style={{ height: "8px", background: "#333", border: "1.5px solid #555" }}>
            <div
              style={{
                height: "100%",
                width: `${pct}%`,
                background: chapter.accentColor,
                transition: "width 0.4s linear",
                position: "relative",
              }}
            >
              <div style={{
                position: "absolute",
                right: "-6px",
                top: "50%",
                transform: "translateY(-50%)",
                width: "12px",
                height: "12px",
                background: "#FAFAFA",
                border: `2px solid ${chapter.accentColor}`,
                borderRadius: "50%",
              }} />
            </div>
          </div>
        </div>

        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "1.5rem" }}>
          <span style={{ fontFamily: "'Space Mono', monospace", fontSize: "0.75rem", color: "#888" }}>{fmt(elapsed)}</span>
          <span style={{ fontFamily: "'Space Mono', monospace", fontSize: "0.75rem", color: "#888" }}>{chapter.duration}</span>
        </div>

        {/* Controls */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "1rem", marginBottom: "1.5rem" }}>
          <button
            onClick={onPrev}
            disabled={!hasPrev}
            style={{
              background: hasPrev ? "#1A1A1A" : "#111",
              border: "2px solid #333",
              color: hasPrev ? "#FAFAFA" : "#444",
              cursor: hasPrev ? "pointer" : "not-allowed",
              padding: "0.6rem",
              display: "flex",
              boxShadow: hasPrev ? "3px 3px 0 #333" : "none",
              transition: "box-shadow 0.15s, transform 0.15s",
            }}
          >
            <IconSkipBack />
          </button>

          <button
            onClick={() => setIsPlaying((p) => !p)}
            style={{
              background: chapter.accentColor,
              border: "2.5px solid #FAFAFA",
              color: "#0A0A0A",
              cursor: "pointer",
              padding: "0.9rem 1.6rem",
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
              boxShadow: "4px 4px 0 #FAFAFA",
              fontFamily: "'Space Grotesk', sans-serif",
              fontWeight: 700,
              fontSize: "0.85rem",
              transition: "box-shadow 0.15s, transform 0.15s",
            }}
          >
            {isPlaying ? <IconPause /> : <IconPlay />}
            {isPlaying ? "Pause" : "Play"}
          </button>

          <button
            onClick={onNext}
            disabled={!hasNext}
            style={{
              background: hasNext ? "#1A1A1A" : "#111",
              border: "2px solid #333",
              color: hasNext ? "#FAFAFA" : "#444",
              cursor: hasNext ? "pointer" : "not-allowed",
              padding: "0.6rem",
              display: "flex",
              boxShadow: hasNext ? "3px 3px 0 #333" : "none",
              transition: "box-shadow 0.15s, transform 0.15s",
            }}
          >
            <IconSkipForward />
          </button>
        </div>

        {/* Volume */}
        <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
          <IconVolume />
          <input
            type="range"
            min={0}
            max={100}
            value={volume}
            onChange={(e) => setVolume(Number(e.target.value))}
            style={{
              flex: 1,
              accentColor: chapter.accentColor,
              cursor: "pointer",
              height: "4px",
            }}
          />
          <span style={{ fontFamily: "'Space Mono', monospace", fontSize: "0.72rem", color: "#777", minWidth: "28px" }}>
            {volume}
          </span>
        </div>
      </div>
    </motion.div>
  );
}

// ─── App Page ─────────────────────────────────────────────────────────────────

export default function AppPage() {
  const [showUpload, setShowUpload] = useState(false);
  const [activeChapterIdx, setActiveChapterIdx] = useState(2); // Ch.3 is "playing"
  const doc = demoDocument;
  const activeChapter = doc.chapters[activeChapterIdx];

  const completedCount = doc.chapters.filter((c) => c.status === "done").length;

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(160deg, #F5F0E8 0%, #F0E9D2 100%)",
        fontFamily: "'Inter', sans-serif",
      }}
    >
      {/* ── Top Bar ── */}
      <header
        style={{
          height: "4.5rem",
          borderBottom: "2.5px solid #0A0A0A",
          background: "#FAFAFA",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "0 2rem",
          boxShadow: "0 4px 0px #0A0A0A",
          position: "sticky",
          top: 0,
          zIndex: 50,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
          <div
            style={{
              background: "linear-gradient(135deg, #FFD60A, #FF6B2B)",
              border: "2.5px solid #0A0A0A",
              padding: "0.3rem 0.7rem",
              fontFamily: "'Space Grotesk', sans-serif",
              fontWeight: 800,
              fontSize: "1.1rem",
              letterSpacing: "-0.02em",
              boxShadow: "3px 3px 0 #0A0A0A",
            }}
          >
            Luma
          </div>
          <span style={{ fontFamily: "'Space Mono', monospace", fontSize: "0.75rem", color: "#777" }}>
            / app
          </span>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
          <span style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.82rem", color: "#555" }}>
            {doc.title.slice(0, 30)}…
          </span>
          <motion.button
            whileHover={{ y: -1, boxShadow: "6px 6px 0 #0A0A0A" }}
            whileTap={{ y: 1, boxShadow: "2px 2px 0 #0A0A0A" }}
            onClick={() => setShowUpload((s) => !s)}
            style={{
              background: "#FFD60A",
              border: "2.5px solid #0A0A0A",
              boxShadow: "4px 4px 0 #0A0A0A",
              cursor: "pointer",
              padding: "0.45rem 1rem",
              fontFamily: "'Space Grotesk', sans-serif",
              fontWeight: 700,
              fontSize: "0.82rem",
              display: "flex",
              alignItems: "center",
              gap: "0.4rem",
            }}
          >
            <IconUpload />
            Upload PDF
          </motion.button>
        </div>
      </header>

      {/* ── Main layout ── */}
      <div
        style={{
          maxWidth: "1240px",
          margin: "0 auto",
          padding: "2rem 1.5rem",
          display: "grid",
          gridTemplateColumns: "1fr 400px",
          gap: "2rem",
          alignItems: "start",
        }}
      >
        {/* ── Left Column ── */}
        <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
          {/* Upload Panel (animated) */}
          <AnimatePresence>
            {showUpload && (
              <UploadPanel onDismiss={() => setShowUpload(false)} />
            )}
          </AnimatePresence>

          {/* Document Info Card */}
          <motion.div
            variants={motionVariants.fadeUp}
            initial="hidden"
            animate="visible"
            style={{
              border: "2.5px solid #0A0A0A",
              boxShadow: "8px 8px 0px #0A0A0A",
              background: "#FAFAFA",
              padding: "1.5rem 2rem",
              display: "flex",
              alignItems: "center",
              gap: "1.5rem",
            }}
          >
            {/* Cover thumbnail */}
            <div
              style={{
                width: "72px",
                height: "90px",
                background: doc.coverGradient,
                border: "2.5px solid #0A0A0A",
                boxShadow: "4px 4px 0 #0A0A0A",
                flexShrink: 0,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#0A0A0A",
              }}
            >
              <IconDoc />
            </div>
            <div style={{ flex: 1 }}>
              <h1
                style={{
                  fontFamily: "'Space Grotesk', sans-serif",
                  fontWeight: 800,
                  fontSize: "1.25rem",
                  margin: "0 0 0.25rem",
                  lineHeight: 1.2,
                }}
              >
                {doc.title}
              </h1>
              <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.85rem", color: "#555", margin: "0 0 0.75rem" }}>
                {doc.author} · {doc.totalPages} pages · Uploaded {doc.uploadedAt}
              </p>
              <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
                {[
                  { label: `${doc.totalChapters} Chapters`, bg: "#0A0A0A", color: "#FAFAFA" },
                  { label: `${completedCount} Done`, bg: "#22C55E", color: "#fff" },
                  { label: `${doc.totalChapters - completedCount - 1} Remaining`, bg: "#F5F0E8", color: "#0A0A0A" },
                ].map((tag) => (
                  <span
                    key={tag.label}
                    style={{
                      background: tag.bg,
                      color: tag.color,
                      border: "2px solid #0A0A0A",
                      padding: "0.2rem 0.6rem",
                      fontFamily: "'Space Grotesk', sans-serif",
                      fontWeight: 700,
                      fontSize: "0.72rem",
                    }}
                  >
                    {tag.label}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Chapter List */}
          <div>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "1rem" }}>
              <h2
                style={{
                  fontFamily: "'Space Grotesk', sans-serif",
                  fontWeight: 800,
                  fontSize: "1rem",
                  margin: 0,
                  textTransform: "uppercase",
                  letterSpacing: "0.08em",
                  borderBottom: "2.5px solid #0A0A0A",
                  paddingBottom: "0.4rem",
                }}
              >
                Chapters
              </h2>
              <span style={{ fontFamily: "'Space Mono', monospace", fontSize: "0.75rem", color: "#888" }}>
                {completedCount}/{doc.totalChapters} complete
              </span>
            </div>

            <motion.div
              variants={motionVariants.staggerContainer}
              initial="hidden"
              animate="visible"
              style={{ display: "flex", flexDirection: "column", gap: "0.6rem" }}
            >
              {doc.chapters.map((chapter, idx) => (
                <ChapterCard
                  key={chapter.id}
                  chapter={chapter}
                  isActive={idx === activeChapterIdx}
                  onClick={() => setActiveChapterIdx(idx)}
                />
              ))}
            </motion.div>
          </div>
        </div>

        {/* ── Right Column (Sticky Player) ── */}
        <div style={{ position: "sticky", top: "5.5rem", display: "flex", flexDirection: "column", gap: "1.25rem" }}>
          <Player
            chapter={activeChapter}
            onPrev={() => setActiveChapterIdx((i) => Math.max(0, i - 1))}
            onNext={() => setActiveChapterIdx((i) => Math.min(doc.chapters.length - 1, i + 1))}
            hasPrev={activeChapterIdx > 0}
            hasNext={activeChapterIdx < doc.chapters.length - 1}
          />

          {/* Summary card */}
          <motion.div
            key={activeChapter.id + "-summary"}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            style={{
              border: "2.5px solid #0A0A0A",
              boxShadow: "5px 5px 0px #0A0A0A",
              background: "#FAFAFA",
              padding: "1.25rem",
            }}
          >
            <div style={{
              background: activeChapter.accentColor,
              border: "2px solid #0A0A0A",
              padding: "0.15rem 0.5rem",
              fontFamily: "'Space Grotesk', sans-serif",
              fontWeight: 700,
              fontSize: "0.68rem",
              display: "inline-block",
              marginBottom: "0.75rem",
            }}>
              CHAPTER SUMMARY
            </div>
            <p style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: "0.83rem",
              lineHeight: 1.6,
              color: "#333",
              margin: 0,
            }}>
              {activeChapter.summary}
            </p>
          </motion.div>

          {/* Keyboard shortcuts hint */}
          <div style={{
            border: "2px solid #0A0A0A",
            background: "#F5F0E8",
            padding: "0.75rem 1rem",
            display: "flex",
            gap: "1rem",
            justifyContent: "center",
          }}>
            {[["Space", "Play/Pause"], ["←/→", "Seek"]].map(([key, label]) => (
              <div key={key} style={{ display: "flex", alignItems: "center", gap: "0.4rem" }}>
                <span style={{
                  fontFamily: "'Space Mono', monospace",
                  fontSize: "0.68rem",
                  background: "#0A0A0A",
                  color: "#FAFAFA",
                  padding: "0.1rem 0.4rem",
                  border: "1.5px solid #0A0A0A",
                }}>
                  {key}
                </span>
                <span style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.72rem", color: "#777" }}>{label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}