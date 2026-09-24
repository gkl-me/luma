#!/bin/bash

# ─────────────────────────────────────
# Config
# ─────────────────────────────────────

FRONTEND_DIR="./web"
BACKEND_DIR="./api"

# ─────────────────────────────────────
# Colors
# ─────────────────────────────────────

CYAN='\033[0;36m'
MAGENTA='\033[0;35m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
BOLD='\033[1m'
DIM='\033[2m'
NC='\033[0m'

# ─────────────────────────────────────
# PIDs
# ─────────────────────────────────────

FRONTEND_PID=""
BACKEND_PID=""

# ─────────────────────────────────────
# Helpers
# ─────────────────────────────────────

prefix_logs() {
    local label="$1"
    local color="$2"
    while IFS= read -r line; do
        echo -e "${color}${BOLD}${label}${NC}${DIM} │${NC} ${line}"
    done
}

# ─────────────────────────────────────
# Graceful Shutdown
# ─────────────────────────────────────

shutdown() {
    echo ""
    echo -e "${YELLOW}${BOLD}⏹  Shutting down...${NC}"

    if [ -n "$FRONTEND_PID" ] && kill -0 "$FRONTEND_PID" 2>/dev/null; then
        echo -e "${CYAN}${BOLD}[FRONTEND]${NC} Stopping (PID $FRONTEND_PID)..."
        kill -TERM "$FRONTEND_PID" 2>/dev/null
        wait "$FRONTEND_PID" 2>/dev/null
        echo -e "${CYAN}${BOLD}[FRONTEND]${NC} Stopped."
    fi

    if [ -n "$BACKEND_PID" ] && kill -0 "$BACKEND_PID" 2>/dev/null; then
        echo -e "${MAGENTA}${BOLD}[BACKEND]${NC}  Stopping (PID $BACKEND_PID)..."
        kill -TERM "$BACKEND_PID" 2>/dev/null
        wait "$BACKEND_PID" 2>/dev/null
        echo -e "${MAGENTA}${BOLD}[BACKEND]${NC}  Stopped."
    fi

    echo ""
    echo -e "${GREEN}${BOLD}✔  All services stopped. Goodbye!${NC}"
    echo ""
    exit 0
}

trap shutdown SIGINT SIGTERM

# ─────────────────────────────────────
# Start services
# ─────────────────────────────────────

echo ""
echo -e "${BOLD}╔══════════════════════════════════════╗${NC}"
echo -e "${BOLD}║        🚀  Starting Luma App          ║${NC}"
echo -e "${BOLD}╚══════════════════════════════════════╝${NC}"
echo ""

# Start backend
echo -e "${MAGENTA}${BOLD}[BACKEND]${NC}  Starting..."
(
    cd "$BACKEND_DIR"
    pnpm dev 2>&1
) | prefix_logs "[BACKEND] " "$MAGENTA" &
BACKEND_PID=$!
echo -e "${MAGENTA}${BOLD}[BACKEND]${NC}  Running  ${DIM}(PID $BACKEND_PID)${NC}"

# Start frontend
echo -e "${CYAN}${BOLD}[FRONTEND]${NC} Starting..."
(
    cd "$FRONTEND_DIR"
    pnpm dev 2>&1
) | prefix_logs "[FRONTEND]" "$CYAN" &
FRONTEND_PID=$!
echo -e "${CYAN}${BOLD}[FRONTEND]${NC} Running  ${DIM}(PID $FRONTEND_PID)${NC}"

echo ""
echo -e "${GREEN}${BOLD}✔  All services started. Press Ctrl+C to stop.${NC}"
echo ""

# ─────────────────────────────────────
# Wait (keep script alive)
# ─────────────────────────────────────

wait
