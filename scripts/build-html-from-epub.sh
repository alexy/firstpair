#!/usr/bin/env bash
set -euo pipefail

if [[ "$#" -lt 4 ]]; then
  cat >&2 <<'USAGE'
usage: scripts/build-html-from-epub.sh <source.epub> <output-dir> <stem> <title>

Builds:
  <output-dir>/<stem>.html
  <output-dir>/<stem>-chapters/index.html
  <output-dir>/<stem>-chapters/chapter-*.html
USAGE
  exit 2
fi

epub="$(cd "$(dirname "$1")" && pwd)/$(basename "$1")"
out_dir="$2"
stem="$3"
title="$4"
split_level="${HTML_SPLIT_LEVEL:-1}"
toc_depth="${HTML_TOC_DEPTH:-2}"

if [[ ! -f "$epub" ]]; then
  echo "missing EPUB: $epub" >&2
  exit 1
fi

mkdir -p "$out_dir"
out_dir="$(cd "$out_dir" && pwd)"
chapters_dir="$out_dir/$stem-chapters"
tmpdir="$(mktemp -d)"
trap 'rm -rf "$tmpdir"' EXIT

pandoc "$epub" \
  --from epub \
  --to html \
  --standalone \
  --embed-resources \
  --toc \
  --toc-depth="$toc_depth" \
  --number-sections \
  --metadata "title=$title" \
  --output "$out_dir/$stem.html"

pandoc "$epub" \
  --from epub \
  --to chunkedhtml \
  --standalone \
  --embed-resources \
  --toc \
  --toc-depth="$toc_depth" \
  --number-sections \
  --metadata "title=$title" \
  --split-level="$split_level" \
  --chunk-template="chapter-%n.html" \
  --output "$tmpdir/$stem-chapters.zip"

rm -rf "$chapters_dir"
mkdir -p "$chapters_dir"
unzip -q "$tmpdir/$stem-chapters.zip" -d "$chapters_dir"

echo "Built EPUB HTML:"
echo "  $out_dir/$stem.html"
echo "  $chapters_dir/"
