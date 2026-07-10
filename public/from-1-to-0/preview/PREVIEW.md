# From 1 to 0 — Preview Manifest

Public preview of *From 1 to 0: Notes on Startups, or How to Lose the Future*,
draft edition v0.1.0. Built 2026-07-10.

## What the preview contains

One reading edition, in four formats built from the same preview manuscript:

| Piece | Status |
|---|---|
| Cover | included |
| About This Preview note | included |
| Epigraphs | included |
| The Plan of the Book (full table of contents, annotated) | included |
| Introduction: The Silent Evidence | included |
| The Anti-Naval Ontology of Failure | included |
| Parts I–VI (Genesis, Ascension, Apotheosis, Fissures, Gravity, Ashes) | **not included** |
| The Culture That Required It (closing essay) | **not included** |
| Chapter source notes & master bibliography (500+ entries) | **not included** |

## Preview cut rule

- Full book body (excluding per-chapter source notes, table of contents, and
  build metadata): **28,655 words**
- Preview body (Introduction + Ontology): **2,684 words**
- Preview share: **9.4%** (ceiling: 10%)
- The cut falls on a clean section boundary: the preview ends where Part I
  begins.

## Formats

- **PDF** (7 pages, US Letter):
  `https://fl6nu3o2c1oqqnum.public.blob.vercel-storage.com/books/from-1-to-0/pdf/5d0add95822763da-from-1-to-0-preview.pdf`
  - sha256 `5d0add95822763da2d1b6127693c4d3131d3497ade6f019fbcebab066f36c0e9`
- **EPUB 3** (reflowable, with cover):
  `https://fl6nu3o2c1oqqnum.public.blob.vercel-storage.com/books/from-1-to-0/epub/69e3d5cfa67af592-from-1-to-0-preview.epub`
  - sha256 `69e3d5cfa67af592ae10f4c88109f36a7d610b6e885f17b594dd031dba71c11d`
- **Single-file HTML** (hosted reader): `/read/from-1-to-0/`
- **Chapter HTML** (hosted reader, 12 sections): `/read/from-1-to-0/chapters/`

## Build

- Source: the book's manuscript chapters, assembled by the source repository's
  preview build script (pandoc 3.9, typst PDF engine; HTML derived from the
  preview EPUB — no PDF slicing).
- Version: draft edition v0.1.0, per the source repository's VERSION manifest.

## Validation

- `pdfinfo`: 7 pages, title "From 1 to 0 (Preview)" — pass
- `unzip -t` on the EPUB — pass
- Preview ceiling check (9.4% ≤ 10%) — pass, enforced by the build script
- Blob upload hashes match local sha256 — pass
