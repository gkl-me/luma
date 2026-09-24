# Luma — Phase 1 Documentation

> **Scope:** Upload PDF → Parse into Chapters → Listen to Audio
> **Constraint:** Support PDFs up to ~300 pages. Entirely free to use, no auth in Phase 1.

---

## Table of Contents

1. [Answering Your Questions First](#1-answering-your-questions-first)
2. [Functional Requirements](#2-functional-requirements)
3. [Non-Functional Requirements](#3-non-functional-requirements)
4. [System Architecture](#4-system-architecture)
5. [Tool Selection](#5-tool-selection)
6. [How It Works — Step by Step](#6-how-it-works--step-by-step)
7. [API Design](#7-api-design)
8. [Data Model](#8-data-model)
9. [Error Handling & Edge Cases](#9-error-handling--edge-cases)
10. [Phase 1 Boundaries](#10-phase-1-boundaries-whats-out-of-scope)

---

## 1. Answering Your Questions First

### ❓ Do we need auth / login for Phase 1?

**No. Auth is not necessary in Phase 1.**

| Consideration | Decision |
|---|---|
| Phase 1 goal | Validate the core loop: upload → parse → listen |
| User experience | No friction — user arrives, uploads, listens immediately |
| Data sensitivity | No user data is persisted beyond the session |
| Free product | No accounts needed to gate access |
| Auth complexity | Adds significant build time — not worth it yet |

**How session identity works without auth:**
- When a user uploads a PDF, generate a temporary **session token** (UUID v4) on the server
- All subsequent requests (fetch chapters, stream audio) are tied to this session token
- Session data (parsed text, chapter list) lives in **server memory** with a short TTL (2 hours)
- After TTL expires, data is cleared automatically — no persistent storage needed

> Auth becomes necessary in **Phase 2** when you add progress saving, user profiles, and cross-device sync.

---

### ❓ Best free tools to use (parsing, TTS, streaming)?

| Layer | Tool | Why |
|---|---|---|
| PDF Parsing | `unpdf` (Node.js) | Modern, runtime-agnostic, actively maintained |
| Chapter Detection | Custom rule-based logic | Font size heuristics + regex patterns |
| Text Chunking | Sentence-boundary regex | Best for natural TTS prosody |
| TTS | `edge-tts` (Python sidecar) | Free, no API key, neural voices, streaming |
| Audio Streaming | HTTP chunked streaming | Simple, browser-native, no WebSocket overhead |
| Temp Storage | `node-cache` (in-memory) | Free, fast, no DB needed in Phase 1 |

---

### ❓ How to chunk a chapter and convert to audio?

**The chunking pipeline:**

```
Raw Chapter Text
      ↓
Split by Paragraphs (double newlines)
      ↓
Split each paragraph by sentences  (regex: /(?<=[.!?])\s+/)
      ↓
Accumulate sentences into chunks ≤ 3,800 characters
      ↓
Each chunk → TTS engine → audio buffer stream
      ↓
Pipe audio buffers sequentially → browser
```

This gives **gapless, streaming playback** that starts almost instantly (chunk 1 plays while chunk 2 is being generated).

---

### ❓ How to stream audio properly for good performance?

**Architecture:**

```
Browser (fetch + ReadableStream)
    ↕ HTTP Chunked Transfer (no Content-Length header)
Express API Server
    ↕ child_process / subprocess
edge-tts (Python — generates neural audio)
```

Key rules:
- **Do NOT buffer the entire audio** before sending — stream chunks as they arrive
- `Transfer-Encoding: chunked` is automatic when you stream without setting `Content-Length`
- Use **MP3** for output (edge-tts default) — widely supported in browsers
- Use the Web `Audio API` on the frontend to play chunks as they arrive
- Use `AbortController` — cancel TTS generation when user stops playback (saves CPU/resources)

---

## 2. Functional Requirements

### FR-1: PDF Upload

| ID | Requirement |
|---|---|
| FR-1.1 | User can drag-and-drop or click to upload a PDF file |
| FR-1.2 | System accepts only `.pdf` files (validated client-side + server-side) |
| FR-1.3 | Maximum file size: **50 MB** (sufficient for a 300-page book) |
| FR-1.4 | Upload progress is shown to the user with a progress bar |
| FR-1.5 | System returns an error if file is password-protected or corrupted |
| FR-1.6 | A session token (UUID) is returned after successful upload |

### FR-2: PDF Parsing

| ID | Requirement |
|---|---|
| FR-2.1 | System extracts all text content from the PDF |
| FR-2.2 | System detects and preserves reading order |
| FR-2.3 | System strips irrelevant content (page numbers, running headers/footers) |
| FR-2.4 | System handles standard text-based PDFs (not scanned image PDFs) |

### FR-3: Chapter Detection

| ID | Requirement |
|---|---|
| FR-3.1 | System detects chapter/section boundaries from the parsed text |
| FR-3.2 | Each detected chapter has a title and an ordered index |
| FR-3.3 | System falls back to page-based chunking if no headings are detected |
| FR-3.4 | User can see the full list of chapters before starting playback |
| FR-3.5 | Each chapter shows estimated listening time |

### FR-4: Audio Listen Mode

| ID | Requirement |
|---|---|
| FR-4.1 | User can select any chapter and start listening |
| FR-4.2 | Audio playback starts within **3 seconds** of pressing play |
| FR-4.3 | Audio streams progressively — does not wait for full generation |
| FR-4.4 | User can pause and resume playback |
| FR-4.5 | User can stop and switch to a different chapter |
| FR-4.6 | Playback progress is shown as a visual progress bar |

---

## 3. Non-Functional Requirements

### NFR-1: Performance

| ID | Requirement |
|---|---|
| NFR-1.1 | PDF parsing (300 pages) completes in < 10 seconds |
| NFR-1.2 | Chapter list returned to client in < 12 seconds post-upload |
| NFR-1.3 | First audio chunk reaches browser in < 3 seconds of pressing play |
| NFR-1.4 | Audio streaming has no noticeable gaps between text chunks |

### NFR-2: Scalability

| ID | Requirement |
|---|---|
| NFR-2.1 | System handles at least **10 concurrent users** without degradation |
| NFR-2.2 | Each user's session is fully isolated |
| NFR-2.3 | TTS requests are queued per-session to prevent flooding |

### NFR-3: Reliability

| ID | Requirement |
|---|---|
| NFR-3.1 | If TTS fails for a chunk, the system retries up to 2 times before erroring |
| NFR-3.2 | If user disconnects mid-stream, server resources are released immediately |
| NFR-3.3 | Session data expires after **2 hours** and is cleaned up automatically |

### NFR-4: Security

| ID | Requirement |
|---|---|
| NFR-4.1 | Uploaded PDFs are stored only in memory — never written to persistent disk |
| NFR-4.2 | Session tokens are UUID v4 — not guessable or sequential |
| NFR-4.3 | File type validated by extension AND MIME type (magic bytes: `%PDF-`) |
| NFR-4.4 | File size enforced server-side regardless of client-provided value |
| NFR-4.5 | API endpoints are rate-limited per IP (e.g., 5 uploads/hour) |

### NFR-5: Accessibility & Usability

| ID | Requirement |
|---|---|
| NFR-5.1 | No login or account creation required — zero friction |
| NFR-5.2 | Works in any modern browser — no installation |
| NFR-5.3 | Mobile-responsive layout |
| NFR-5.4 | Keyboard accessible player (Space = play/pause) |

---

## 4. System Architecture

```
┌─────────────────────────────────────────────┐
│              Browser (Next.js)               │
│                                              │
│  Upload UI → Chapter List UI → Player UI     │
└─────────────────────┬───────────────────────┘
                      │ HTTP
┌─────────────────────▼───────────────────────┐
│           Express API Server (Node.js)        │
│                                              │
│  POST /upload                                │
│  GET  /session/:id   (poll parse status)     │
│  GET  /stream/:id/:chapterId  (audio stream) │
│                                              │
│  ┌──────────┐  ┌────────────┐  ┌──────────┐ │
│  │  unpdf   │  │  Chapter   │  │  TTS     │ │
│  │  Parser  │  │  Detector  │  │  Proxy   │ │
│  └──────────┘  └────────────┘  └────┬─────┘ │
│                                     │        │
│  ┌──────────────────────────────┐   │        │
│  │  node-cache (Session Store)  │   │        │
│  │  TTL: 2 hours                │   │        │
│  └──────────────────────────────┘   │        │
└─────────────────────────────────────┼────────┘
                                      │ child_process
                               ┌──────▼──────┐
                               │  edge-tts   │
                               │  (Python)   │
                               │  MP3 stream │
                               └─────────────┘
```

---

## 5. Tool Selection

### 5.1 PDF Parsing — `unpdf`

**Install:** `pnpm add unpdf`

**Why unpdf over pdf-parse:**
- Runtime-agnostic (Node.js, edge, browser)
- Actively maintained (2024–2026)
- Clean TypeScript API
- Built on Mozilla's battle-tested PDF.js under the hood
- `pdf-parse` has ESM compatibility issues and is effectively unmaintained

```typescript
import { extractText } from 'unpdf'

const buffer = await fs.readFile('document.pdf')
const { text, totalPages } = await extractText(new Uint8Array(buffer), {
  mergePages: true  // join all pages into one string
})
```

> **Limitation:** Only works on **text-embedded** PDFs. Scanned/image-only PDFs produce empty text — return a clear error to the user.

---

### 5.2 Chapter Detection — Custom Rule-Based Logic

No external package. Use regex + line-length heuristics on extracted text.

**Detection priority (applied in order):**

1. Lines matching `Chapter \d+`, `CHAPTER`, `Part \d+`, `Section \d+`
2. Lines matching `\d+\.\s+[A-Z]` (numbered sections like `1. Introduction`)
3. Roman numerals at line start: `I.`, `II.`, `III.`
4. Short ALL-CAPS lines (< 80 chars) — common book heading pattern
5. Short lines (< 60 chars) preceded and followed by blank lines
6. **Fallback:** Split by every 10 pages if nothing detected

```typescript
const headingPattern =
  /^(chapter\s+\d+|part\s+\d+|section\s+\d+|\d+\.\s+[A-Z]|[IVXLCDM]+\.\s)/i

function isLikelyHeading(line: string): boolean {
  return (
    line.trim().length < 80 &&
    line.trim() === line.trim().toUpperCase() &&
    /[A-Z]{2,}/.test(line)
  )
}
```

---

### 5.3 Text Chunking — Sentence-Boundary Splitting

TTS engines have character limits (~3,000–5,000 chars per request). Cutting mid-sentence causes unnatural audio. Splitting at sentence boundaries preserves prosody and keeps streaming smooth.

**Max chunk size:** 3,800 characters (leaves safe buffer below TTS limits)

```typescript
const MAX_CHUNK = 3800

function chunkText(text: string): string[] {
  // Split at sentence endings, keeping the punctuation
  const sentences = text.match(/[^.!?]+[.!?]+(\s|$)/g) ?? [text]
  const chunks: string[] = []
  let current = ''

  for (const sentence of sentences) {
    if ((current + sentence).length > MAX_CHUNK) {
      if (current.trim()) chunks.push(current.trim())
      current = sentence
    } else {
      current += sentence
    }
  }

  if (current.trim()) chunks.push(current.trim())
  return chunks
}
```

---

### 5.4 Text-to-Speech — Options Comparison

There are multiple paths here. Here's the full breakdown — from zero-setup to production-grade, all **free**.

---

#### TTS Options at a Glance

| Option | Quality | Setup | Streaming | Cost | Best For |
|---|---|---|---|---|---|
| **edge-tts** | ⭐⭐⭐⭐ Good | 1 min (Python) | ✅ Yes | Free | Quick MVP, zero infra |
| **kokoro-js** | ⭐⭐⭐⭐⭐ Excellent | 5 min (npm) | ✅ Yes | Free | Best free quality, runs in Node directly |
| **Kokoro-FastAPI** | ⭐⭐⭐⭐⭐ Excellent | Docker | ✅ Yes | Free (self-host) | Production, OpenAI-compatible API |
| **Piper TTS** | ⭐⭐⭐ Good | Binary install | ✅ Yes | Free | Ultra-low latency, CPU-only servers |
| **Google Cloud TTS** | ⭐⭐⭐⭐⭐ Best | 15 min (GCP setup) | ⚠️ Buffer | Free tier (4M chars/mo) | Reliability + quality guarantee |

---

#### 🥇 Option A — `kokoro-js` (Recommended for Phase 1)

> **Best choice if you want the highest quality free TTS that runs directly in Node.js with no Python dependency.**

**Model:** Kokoro 82M — Apache 2.0 licensed, open source, runs on CPU
**Quality:** Rivals ElevenLabs in natural prosody for long-form reading
**Install:** `pnpm add kokoro-js`

**Why Kokoro over edge-tts:**
- ✅ Pure Node.js — no Python sidecar needed
- ✅ Apache 2.0 — safe for commercial use (unlike edge-tts which uses Microsoft's proprietary backend)
- ✅ Runs fully offline — no external API calls, no rate limits, no usage caps
- ✅ Built-in `TextSplitterStream` handles chunking automatically
- ✅ WAV output — no MP3 frame-boundary streaming issues
- ✅ 10+ voices, multiple languages
- ⚠️ First load downloads ONNX model (~80MB) — initialize once at server startup

**Express integration (full streaming endpoint):**

```typescript
import express from 'express'
import { KokoroTTS, TextSplitterStream } from 'kokoro-js'

const app = express()

// Initialize once at startup — model cached after first download
let tts: KokoroTTS
async function initTTS() {
  tts = await KokoroTTS.from_pretrained('onnx-community/Kokoro-82M-v1.0-ONNX', {
    dtype: 'fp32',
    device: 'cpu',
  })
  console.log('✅ Kokoro TTS ready')
}
initTTS()

app.get('/api/stream/:sessionId/:chapterId', async (req, res) => {
  const session = sessionStore.get<Session>(req.params.sessionId)
  if (!session) return res.status(410).json({ error: 'Session expired' })

  const chapter = session.chapters[Number(req.params.chapterId)]
  if (!chapter) return res.status(404).json({ error: 'Chapter not found' })

  res.setHeader('Content-Type', 'audio/wav')
  res.setHeader('Transfer-Encoding', 'chunked')
  res.setHeader('Cache-Control', 'no-cache')

  const aborted = { value: false }
  req.on('close', () => { aborted.value = true })

  for (const chunk of chapter.chunks) {
    if (aborted.value) break

    const splitter = new TextSplitterStream()
    const stream = tts.stream(splitter)

    splitter.add(chunk)
    splitter.close()

    for await (const { audio } of stream) {
      if (aborted.value) break
      res.write(Buffer.from(audio.buffer))
    }
  }

  res.end()
})
```

**Voices:** `af_alloy`, `af_bella`, `af_nicole`, `af_sarah`, `am_adam`, `am_michael`, `bf_emma`, `bm_george`

---

#### 🥈 Option B — `edge-tts` (Python sidecar)

> **Best if you want zero npm dependencies and are already comfortable with Python.**

Uses Microsoft Edge's neural voices. Free, no API key — but depends on Microsoft's backend externally (grey area for commercial use at scale).

**Install:** `pip install edge-tts`

```typescript
import { spawn } from 'child_process'
import type { Response } from 'express'

function streamEdgeTTS(text: string, res: Response, signal: AbortSignal): Promise<void> {
  return new Promise((resolve, reject) => {
    const proc = spawn('edge-tts', [
      '--voice', 'en-US-AriaNeural',
      '--rate', '+0%',
      '--text', text,
      '--write-media', '/dev/stdout',
    ])

    proc.stdout.pipe(res, { end: false })
    proc.on('close', resolve)
    proc.on('error', reject)
    signal.addEventListener('abort', () => { proc.kill(); resolve() })
  })
}
```

**Best voices for reading:** `en-US-AriaNeural`, `en-US-JennyNeural`, `en-GB-SoniaNeural`, `en-US-GuyNeural`

---

#### 🥉 Option C — Kokoro-FastAPI (Docker, OpenAI-compatible)

> **Best for production scale — OpenAI-compatible `/v1/audio/speech` endpoint, runs Kokoro under the hood.**

Your Express server just proxies to it — if you later upgrade to OpenAI TTS or ElevenLabs, zero code changes needed.

**Run locally:**
```bash
docker run -p 8880:8880 ghcr.io/remsky/kokoro-fastapi-cpu:latest
```

**Express proxy:**
```typescript
app.get('/api/stream/:sessionId/:chapterId', async (req, res) => {
  const chapter = getChapter(req.params)

  res.setHeader('Content-Type', 'audio/mpeg')
  res.setHeader('Transfer-Encoding', 'chunked')

  const aborted = { value: false }
  req.on('close', () => { aborted.value = true })

  for (const chunk of chapter.chunks) {
    if (aborted.value) break

    const ttsRes = await fetch('http://localhost:8880/v1/audio/speech', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ input: chunk, voice: 'af_bella', speed: 1.0 }),
    })

    const reader = ttsRes.body!.getReader()
    while (true) {
      const { done, value } = await reader.read()
      if (done || aborted.value) break
      res.write(value)
    }
  }

  res.end()
})
```

---

#### Option D — Google Cloud TTS (Free Tier, Enterprise-grade)

> **Best if you want maximum reliability and quality with a guaranteed free tier.**

**Free tier:** 4 million characters/month (WaveNet), 1M/month (Neural2)
**Requires:** Google Cloud account with billing enabled — won't actually charge within free quota.

**Install:** `pnpm add @google-cloud/text-to-speech`

```typescript
import textToSpeech from '@google-cloud/text-to-speech'

const client = new textToSpeech.TextToSpeechClient()

async function synthesizeChunk(text: string): Promise<Buffer> {
  const [response] = await client.synthesizeSpeech({
    input: { text },
    voice: { languageCode: 'en-US', name: 'en-US-Neural2-F' },
    audioConfig: { audioEncoding: 'MP3' },
  })
  return response.audioContent as Buffer
}

// In stream endpoint — buffer then write each chunk
for (const chunk of chapter.chunks) {
  const audio = await synthesizeChunk(chunk)
  res.write(audio)
}
res.end()
```

> ⚠️ Google TTS does **not** true-stream — it returns a complete buffer per call. Simulated streaming by writing chunks sequentially still feels smooth to the user.

---

#### Option E — Piper TTS (Ultra-fast, CPU-only)

> **Best for cheap VPS deployments where you need the fastest possible response time.**

Download the binary from [OHF-Voice/piper1-gpl](https://github.com/OHF-Voice/piper1-gpl/releases).

```typescript
import { spawn } from 'child_process'

function streamPiper(text: string, res: Response): Promise<void> {
  return new Promise((resolve, reject) => {
    const proc = spawn('./piper', [
      '--model', 'en_US-libritts-high.onnx',
      '--output_raw',   // raw PCM, ultra-low latency
    ])

    res.setHeader('Content-Type', 'audio/pcm')
    proc.stdin.write(text)
    proc.stdin.end()
    proc.stdout.pipe(res, { end: false })
    proc.on('close', resolve)
    proc.on('error', reject)
  })
}
```

- First byte in < 200ms on CPU
- Browser must handle raw PCM via `AudioContext` (more complex client-side code)

---

#### 📌 Decision Guide

```
Fastest to prototype?        → edge-tts       (pip install, done)
Best quality + pure Node.js? → kokoro-js      ← Recommended for Phase 1
Production + scalable?       → Kokoro-FastAPI  (Docker, OpenAI-compatible)
Guaranteed reliability?      → Google TTS     (free 4M chars/mo)
Cheapest VPS / lowest TTFB?  → Piper TTS      (binary, raw PCM)
```

**For Luma Phase 1:** Start with `kokoro-js` for development. When deploying to a server, run `Kokoro-FastAPI` in Docker alongside your Express API.

---

### 5.5 Session Storage — `node-cache`

**Install:** `pnpm add node-cache`

```typescript
import NodeCache from 'node-cache'

// 2-hour TTL, check for expired keys every 10 minutes
export const sessionStore = new NodeCache({ stdTTL: 7200, checkperiod: 600 })
```

> **Scaling note:** For production with multiple server instances, switch to [Upstash Redis](https://upstash.com) (10k req/day free tier, no infra required — just HTTP).

---

### 5.6 File Upload — `multer`

**Install:** `pnpm add multer @types/multer`

```typescript
import multer from 'multer'

export const upload = multer({
  storage: multer.memoryStorage(),       // RAM only — never touches disk
  limits: { fileSize: 50 * 1024 * 1024 }, // 50 MB max
  fileFilter: (_req, file, cb) => {
    if (file.mimetype === 'application/pdf') cb(null, true)
    else cb(new Error('Only PDF files are accepted'))
  }
})
```

---

## 6. How It Works — Step by Step

### Step 1: PDF Upload

```
1. User drops PDF on upload zone
2. Client checks: extension=.pdf, size≤50MB
3. POST /api/upload (multipart/form-data)
4. Server: MIME check (magic bytes %PDF-)
5. Server: stores buffer in memory
6. Server: returns { sessionId, status: "parsing" }
7. Server: begins async parsing in background
8. Client: polls GET /api/session/:id every 1.5s
```

### Step 2: PDF Parsing

```
PDF Buffer
  → unpdf.extractText()           # page-by-page text arrays
  → join with [PAGE_BREAK] marker
  → strip page numbers            # /^\s*\d+\s*$/m
  → strip running headers/footers # detect repeated short lines
  → fix hyphenated line breaks    # "some-\nthing" → "something"
  → normalize whitespace
  → store in session
```

### Step 3: Chapter Detection & Chunking

```
Clean text
  → run headingPattern regex line by line
  → build Chapter[] array
  → if 0 chapters found → page fallback (every 10 pages)
  → for each chapter:
      chunkText(content) → string[]
      estimatedMinutes = wordCount / 150
  → store { id, title, chunks[], wordCount, estimatedMinutes } in session
  → update session.status = "ready"
```

### Step 4: Audio Streaming

```
Client: selects chapter, presses play
Client: GET /api/stream/:sessionId/:chapterId
Server: sets Content-Type: audio/mpeg, Transfer-Encoding: chunked
Server: for each chunk in chapter.chunks:
    → spawn edge-tts subprocess
    → pipe stdout (MP3) → res stream
    → wait for subprocess close
    → repeat for next chunk
Server: res.end()
Client: receives MP3 binary stream
```

### Step 5: Browser Playback

```typescript
// Simple approach using HTML <audio> element
// The browser handles MP3 streaming natively when fed via a MediaSource

const audio = new Audio()
const mediaSource = new MediaSource()
audio.src = URL.createObjectURL(mediaSource)

mediaSource.addEventListener('sourceopen', async () => {
  const sourceBuffer = mediaSource.addSourceBuffer('audio/mpeg')
  const response = await fetch(`/api/stream/${sessionId}/${chapterId}`)
  const reader = response.body!.getReader()

  while (true) {
    const { done, value } = await reader.read()
    if (done) {
      mediaSource.endOfStream()
      break
    }
    // Wait for SourceBuffer to be ready before appending
    await new Promise(r => {
      sourceBuffer.addEventListener('updateend', r, { once: true })
      sourceBuffer.appendBuffer(value)
    })
  }
})

audio.play()
```

> This `MediaSource` approach is the correct way to feed a streaming MP3 to an `<audio>` element without buffering the entire file first.

---

## 7. API Design

### `POST /api/upload`

**Request:** `multipart/form-data`, field `file`

**Response 200:**
```json
{
  "sessionId": "550e8400-e29b-41d4-a716-446655440000",
  "status": "parsing",
  "filename": "lecture_notes.pdf",
  "totalPages": 142
}
```

**Errors:** `400` invalid file | `413` too large | `415` wrong type

---

### `GET /api/session/:sessionId`

**Response (parsing):**
```json
{ "status": "parsing", "progress": 45 }
```

**Response (ready):**
```json
{
  "status": "ready",
  "totalPages": 142,
  "chapters": [
    {
      "id": 0,
      "title": "Chapter 1: Introduction",
      "wordCount": 2340,
      "estimatedMinutes": 16,
      "chunkCount": 4
    }
  ]
}
```

**Errors:** `404` session not found | `410` session expired

---

### `GET /api/stream/:sessionId/:chapterId`

**Response headers:**
```
Content-Type: audio/mpeg
Transfer-Encoding: chunked
Cache-Control: no-cache
```

**Response body:** Binary MP3 stream (chunked, progressive)

**Errors:** `404` chapter not found | `410` session expired

---

## 8. Data Model

No database in Phase 1. All data in session store (TTL: 2 hours).

```typescript
// api/src/types/session.ts

export interface Chapter {
  id: number
  title: string
  chunks: string[]          // pre-computed sentence-boundary chunks
  wordCount: number
  estimatedMinutes: number
}

export interface Session {
  id: string                // UUID v4
  filename: string
  totalPages: number
  status: 'parsing' | 'ready' | 'error'
  errorMessage?: string
  chapters: Chapter[]
  createdAt: Date
  expiresAt: Date           // createdAt + 2 hours
}
```

---

## 9. Error Handling & Edge Cases

| Scenario | Server Response |
|---|---|
| Password-protected PDF | 400 — "PDF is password protected. Please use an unlocked PDF." |
| Scanned/image-only PDF | 400 — "No text detected. Please use a text-based PDF." |
| File > 50 MB | 413 — "File too large. Maximum size is 50 MB." |
| Non-PDF uploaded | 415 — "Only PDF files are accepted." |
| 0 chapters detected | Fall back to page-based splitting silently |
| TTS subprocess crash | Retry ×2, then respond with 500 and partial audio up to failure point |
| User disconnects mid-stream | `req.on('close')` → abort subprocess → release memory |
| Session expired (> 2h) | 410 — "Session expired. Please re-upload your PDF." |
| Very short PDF (< 1 page) | Works normally — single chapter |

---

## 10. Phase 1 Boundaries (What's Out of Scope)

| Feature | Planned Phase |
|---|---|
| User accounts / login | Phase 2 |
| Progress saving (resume position) | Phase 2 |
| Cross-device sync | Phase 2 |
| Bookmarks / highlights | Phase 2 |
| AI summaries / smart notes | Phase 2 |
| Multiple voice selection | Phase 3 |
| AI voice customization | Phase 3 |
| Character-based narration | Phase 3 |
| Scanned PDF / OCR support | Future |
| Playback speed control | Phase 1 stretch goal |
| Mobile app | Future |

---

## Tech Stack Summary

| Layer | Technology |
|---|---|
| Frontend | Next.js 16 + Framer Motion + TypeScript |
| API Server | Node.js + Express + TypeScript |
| PDF Parsing | `unpdf` |
| Chapter Detection | Custom rule-based (regex + heuristics) |
| Text Chunking | Sentence-boundary regex, max 3,800 chars |
| TTS Engine | `kokoro-js` (Node.js, Apache 2.0, free, offline) → `Kokoro-FastAPI` (production) |
| Audio Format | MP3 (streamed via HTTP chunked transfer) |
| Browser Playback | `MediaSource` API + HTML `<audio>` |
| Session Store | `node-cache` → Upstash Redis (production) |
| File Upload | `multer` (memory storage, 50 MB limit) |
| Session IDs | `crypto.randomUUID()` (UUID v4) |
| Rate Limiting | `express-rate-limit` |
| Package Manager | `pnpm` |

---

*Document: Phase 1 | Version: 1.0 | Last updated: September 2026*
