# FirstPair Publishing Handoff

Current date: 2026-07-07

## Goal

Make `/Users/alexy/src/firstpair` the canonical local home for publishing
workflow code:

- FirstPair-native books: hand-authored `.FP.*` troff source rendered through
  Neatroff and utmac.
- QueryGraph-family books: Markdown/Pandoc/Typst/EPUB workflows with
  `VERSION.md`, Mermaid rendering, exact iCloud delivery, and blog textpacks.
- Shared Neatroff tooling: installed once through FirstPair, not tucked inside
  individual book repos.

Do not make `/Users/alexy/src/querygraph/publishing` the long-term source of
truth. Treat it as the template source to fold into FirstPair.

## Current State

`/Users/alexy/src/querygraph` is clean on `main` and contains the reusable
publishing source:

- `publishing/PUBLISH.md`
- `publishing/scripts/build-book.sh`
- `publishing/scripts/check-version-marker.sh`
- `publishing/scripts/ensure-python-env.sh`
- `publishing/scripts/publish-versioned-artifacts.sh`
- `publishing/scripts/publish-versioned-blog.sh`
- `publishing/scripts/render-mermaid.mjs`
- `publishing/scripts/textpack.py`
- `publishing/skills/*.md`
- `PUBLISHING_WORKFLOWS.md`

`/Users/alexy/src/firstpair` is dirty. Preserve and inspect the dirty work
before staging:

- `publishing/scripts/build-firstpair-book.sh` has local support for a
  hand-authored FirstPair troff source path.
- `publishing/tmac/fp.tmac` is a new macro layer for `.FP.*` commands.
- `proofs/kiffness-loop-lab/source.fp.tr` is a new hand-authored proof source.
- `publishing/PUBLISH.md`, `firstpress-belllabs.md`,
  `proofs/kiffness-loop-lab/AI.md`, and
  `proofs/kiffness-loop-lab/README.md` describe the new FirstPair-native path.
- `proofs/kiffness-loop-lab/dist/` has regenerated proof PDFs/EPUBs and new
  versioned names using `0.1.0-7ac20f1`.

The shared Neatroff setup has already been pushed to FirstPair:

```sh
~/src/firstpair/publishing/scripts/setup-neatroff.sh
```

It installs/refreshes `~/src/neatroff_make`, exposes wrappers in
`~/.local/bin`, and writes `~/.local/share/firstpair/neatroff.env`.

## Suggested Finish Plan

1. Review and preserve the current FirstPair-native proof work.

   ```sh
   cd /Users/alexy/src/firstpair
   git status --short
   git diff -- publishing/scripts/build-firstpair-book.sh publishing/PUBLISH.md
   sed -n '1,180p' publishing/tmac/fp.tmac
   sed -n '1,180p' proofs/kiffness-loop-lab/source.fp.tr
   ```

2. Decide whether proof binaries remain tracked.

   The repo currently tracks proof artifacts under
   `proofs/kiffness-loop-lab/dist/`. That is acceptable for tiny proof outputs,
   but be deliberate. If the project should follow the new "no binary waste"
   convention, move toward tracking only source plus `VERSION.md` and ignoring
   generated proof PDFs/EPUBs.

3. Import QueryGraph publishing helpers into FirstPair without overwriting the
   FirstPair-native runbook.

   Recommended layout:

   ```text
   publishing/
     PUBLISH.md                    # FirstPair master runbook; merge sections
     QUERYGRAPH_WORKFLOWS.md       # copied comparison map
     scripts/
       build-firstpair-book.sh     # native FirstPair proof builder
       setup-neatroff.sh
       setup-utmac.sh
       md-to-utmac.py
       build-book.sh               # QueryGraph-family generic book builder
       check-version-marker.sh
       ensure-python-env.sh
       publish-versioned-artifacts.sh
       publish-versioned-blog.sh
       render-mermaid.mjs
       textpack.py
     skills/
       *.md
     tmac/
       fp.tmac
   ```

   Copy commands:

   ```sh
   cd /Users/alexy/src/firstpair
   cp /Users/alexy/src/querygraph/publishing/scripts/build-book.sh publishing/scripts/
   cp /Users/alexy/src/querygraph/publishing/scripts/check-version-marker.sh publishing/scripts/
   cp /Users/alexy/src/querygraph/publishing/scripts/ensure-python-env.sh publishing/scripts/
   cp /Users/alexy/src/querygraph/publishing/scripts/publish-versioned-artifacts.sh publishing/scripts/
   cp /Users/alexy/src/querygraph/publishing/scripts/publish-versioned-blog.sh publishing/scripts/
   cp /Users/alexy/src/querygraph/publishing/scripts/render-mermaid.mjs publishing/scripts/
   cp /Users/alexy/src/querygraph/publishing/scripts/textpack.py publishing/scripts/
   mkdir -p publishing/skills
   cp /Users/alexy/src/querygraph/publishing/skills/*.md publishing/skills/
   cp /Users/alexy/src/querygraph/PUBLISHING_WORKFLOWS.md publishing/QUERYGRAPH_WORKFLOWS.md
   chmod +x publishing/scripts/*.sh publishing/scripts/*.mjs publishing/scripts/*.py
   ```

4. Merge, do not replace, the QueryGraph runbook material.

   Keep `publishing/PUBLISH.md` centered on FirstPair. Add sections that say:

   - FirstPair-native path: `.FP.*` troff source -> `fp.tmac` + utmac ->
     Neatroff PDF.
   - QueryGraph-family path: Markdown -> Mermaid assets -> Typst/EPUB/troff
     helpers -> `VERSION.md` -> exact iCloud delivery.
   - Blog path: Markdown + local assets -> versioned `.textpack` ->
     `~/icloud/blogs`.

5. Make the copied QueryGraph scripts portable inside FirstPair.

   Watch for scripts that assume they live in the target repo's root
   `publishing/scripts/` directory. The safest near-term model is still:

   - Copy the helper into a target repo, or
   - Call it from a repo-local wrapper with `REPO_ROOT=<target>`.

   The likely improvement is to compute `script_dir` from `${BASH_SOURCE[0]}`
   and use that for helper lookups, while `REPO_ROOT` remains the target repo.
   In particular, review:

   - `publish-versioned-blog.sh`, which currently invokes
     `$repo_root/publishing/scripts/textpack.py`.
   - `build-book.sh`, which defaults `BOOK_RENDER_SCRIPT` to
     `$repo_root/publishing/scripts/render-mermaid.mjs`.
   - `publish-versioned-artifacts.sh`, which is already mostly standalone.

6. Clean generated clutter deliberately.

   Suggested ignores:

   ```gitignore
   .DS_Store
   publishing/.DS_Store
   publishing/scripts/__pycache__/
   **/__pycache__/
   *.pyc
   ```

   If proof binaries become generated-only, also ignore:

   ```gitignore
   proofs/*/dist/*.pdf
   proofs/*/dist/*.epub
   proofs/*/dist/*.log
   proofs/*/dist/*\ (*\).pdf
   proofs/*/dist/*\ (*\).epub
   ```

   Do not delete proof artifacts casually if they are intentionally part of the
   FirstPair proof record.

7. Validate.

   ```sh
   cd /Users/alexy/src/firstpair
   bash -n publishing/scripts/*.sh
   python3 -m py_compile publishing/scripts/*.py
   node --check publishing/scripts/render-mermaid.mjs
   ~/src/firstpair/publishing/scripts/setup-neatroff.sh
   proofs/kiffness-loop-lab/build.sh
   publishing/scripts/check-version-marker.sh proofs/kiffness-loop-lab/dist
   git diff --check
   ```

   If `render-mermaid.mjs` is imported, `node --check` only checks syntax.
   Actual Mermaid rendering still requires `mmdc`.

8. Commit in small logical pieces.

   Recommended commits:

   ```text
   Add FirstPair native troff proof
   Import QueryGraph publishing helpers
   Document FirstPair publishing consolidation
   ```

   Keep generated proof artifacts in the first commit only if the project wants
   proof binaries tracked. Otherwise commit source, scripts, docs, and ignores
   only.

## Known Risks

- Broad `find`/listing over `~/icloud/books` can fail on macOS/iCloud even when
  exact `stat` and `cmp` on specific files work. Prefer exact path probes.
- QueryGraph scripts are good as templates but not yet a fully relocatable
  library. Make helper lookup explicit before claiming FirstPair can drive
  every sibling repo directly.
- Do not overwrite `publishing/PUBLISH.md` with QueryGraph's version. FirstPair
  has a distinct identity and now has native `.FP.*` troff concerns that
  QueryGraph did not have.
- The current proof build uses both generated utmac from Markdown and
  hand-authored `.FP.*` troff. Keep those two paths named separately; otherwise
  "Neatroff" becomes ambiguous again.

## Desired End State

FirstPair should become the place a future book repo points to for publishing
practice:

```sh
~/src/firstpair/publishing/scripts/setup-neatroff.sh
REPO_ROOT=/path/to/repo \
BOOK_ROOT=docs/book \
BOOK_MANUSCRIPT=docs/book/manuscript.md \
BOOK_FORMATS=typst,troff \
~/src/firstpair/publishing/scripts/build-book.sh
```

and for native FirstPair books:

```sh
cd ~/src/firstpair
proofs/kiffness-loop-lab/build.sh
```

When this handoff is complete, QueryGraph's `publishing/` directory can either
be left as a snapshot for existing repos or replaced later with a short pointer
to FirstPair.
