#!/usr/bin/env sh
# ============================================================
#  Optimistic UI — installer
#  Copies design tokens + components into your project.
#  Run from anywhere:   sh install.sh [components...] [--dir path]
# ============================================================
set -e

HERE="$(cd "$(dirname "$0")" && pwd)"

if ! command -v node >/dev/null 2>&1; then
  echo "Optimistic UI needs Node.js (https://nodejs.org). Please install it and re-run."
  exit 1
fi

node "$HERE/install.mjs" "$@"
