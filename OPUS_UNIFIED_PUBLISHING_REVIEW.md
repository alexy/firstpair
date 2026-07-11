# Review — Unified Book Build Script Proposal

Reviewer: Claude Opus 4.8 (1M context)
Review date: 2026-07-11
Reviews: `publishing/UNIFIED_BOOK_BUILD_SCRIPT_PROPOSAL.md` (Codex, 2026-07-11)

## Verdict

**Approve the direction.** It is a strong, implementable proposal — more grounded
than an abstract sketch because it inventories all 11 catalog books and their real
build states rather than reasoning in the abstract. Its closing principle —
*"centralize the build graph and artifact contract, not the authorship logic"* — is
exactly the right seam, and it is the same insight that made deployment generalize
cleanly: **standardize the output, not the internals.** Build is where books
legitimately differ (Markdown+pandoc/typst here; Rosetta multi-source for Venezia;
Python builders for rio-grande/zucchero; LaTeX/Ableton exports elsewhere), so the
generalization must live at the entry point, the output contract, and a shared
toolchain — not in one builder that renders every book.

## What it gets right (keep as-is)

1. **The handoff chain is the correct architecture.**
   `source build.sh → publishing/scripts/build-library-book.sh → publish-complete dist → library:publish`.
   Build becomes shared, authorship stays in the source repo, publishing stays where
   it was already generalized.

2. **The "what the script must NOT own" list is the load-bearing part.** Excluding
   manuscript contents, source-tree assembly, editorial/preview-cut policy, diagrams,
   and *the full-over-preview decision* is the boundary that stops the abstraction from
   rotting into `if book == …`. It correctly defers full publication to the `--full`
   gate: "the build script may create `dist-full`; it must not publish it."

3. **The publishable-dist contract formalizes the seam we already use.** Key-value
   `VERSION.md` + `<stable-stem>.{pdf,epub,html}` + `<stable-stem>-chapters/`. Making
   `VERSION.md` machine-readable (not Markdown bullets) is the right call and matches
   how `publish-book-to-library.mjs` already parses it.

4. **The inventory is the real value.** It surfaces concrete, true gaps:
   omnighost/rio-grande/from-1-to-0 lack HTML/`VERSION.md`; zucchero's manifest is not
   key-value-parseable; lakecat's `VERSION.md` omits `pdf_file`; sail-rust-book does not
   resolve from repo root. It names `invented-enemy` (this session's `dist-preview` /
   `dist-full` + `edition:` shape) as the preview/full reference implementation.

5. **"Wrap, don't rewrite" the Python builders** (rio-grande, zucchero) is the right
   risk posture — preserve working authorship logic, add the manifest + HTML emission.

6. **Preview-first default** and the `preview | full | both` entry point match what we
   just shipped for `invented-enemy`.

## What I would tighten before building

1. **Pin the toolchain — the missing piece.** The proposal centralizes the *script*
   but never addresses *tool versions* (pandoc/typst/calibre). "Every repo builds
   slightly differently" is partly a version-drift problem; a central bash script does
   not fix that if machine A has pandoc 3.1 and machine B 3.9. Add a shared
   `.tool-versions`/lockfile or a build container so builds are reproducible.
   Otherwise the code is centralized but the determinism is not.

2. **Narrow the config surface.** It proposes env vars *and* config files *and* CLI
   flags — three input styles that will drift. Pick one canonical form (a
   `book.build.json` / `build.config.sh` per repo), CLI flags as overrides, env vars as
   legacy-compat only. Converge sooner than "support both first."

3. **Make render/layout verification a standard step, not optional.** It lists
   `check_pdf_layout.sh` as optional. Given the recent failure — a PDF that was
   catastrophically broken (whole chapters crammed into a one-word-wide column from a
   dash-table misparse) while passing `pdfinfo` and exit-0 — the central contract should
   mandate a minimal "render N pages; assert no overflow / no empty / no one-word
   column" check. A shared builder should make that failure mode impossible for every
   book at once, which is one of the strongest arguments for centralizing at all.

## Smaller notes

- **Do §170 fix #3 now regardless of the rest:** print `edition` in
  `library:publish --dry-run` output. The AGENTS.md guidance just committed
  (`717a30d`) tells agents to "show the resolved `distDir`/`edition`," but the script
  does not currently print `edition`. Cheap, and it closes a guidance-vs-tool gap.
- **§170 fixes #4 and #6** (manifest alias normalization; `primary_format` for
  dual-format dists) prevent the filename-sort fragility that would otherwise publish a
  preview as the full book when a `VERSION.md` is absent — the exact hazard the
  `invented-enemy` split + manifest were designed to remove.
- **`version_stamp = <version>-<git-hash>` needs a non-git fallback.** The reference
  book (`~/src/russophobia`) is not a git repo, so the stamp would fail there. The
  proposal says "with override," so it is covered — but the template is the case that
  trips it; make the fallback automatic, not manual.

## Recommended sequencing

1. Land the six FirstPair-side edges first (§170), starting with **printing `edition`
   in `--dry-run`**, since current guidance depends on it. Fold in the toolchain pin.
2. Implement `build-library-book.sh` against a disposable fixture (one single-format,
   one dual-format, one preview/full book), with mandatory layout verification wired in.
3. Migrate closest-first (typesec, grust, lakecat), using `invented-enemy` as the
   preview/full reference; wrap the Python builders (rio-grande, zucchero) rather than
   rewriting; handle omnighost/lighthouse-republics (dual-format + preview) after the
   `primary_format` field lands.

**Bottom line:** solid plan, ready to execute in roughly its proposed order. Add
toolchain pinning and mandatory layout verification to the contract, collapse the
config surface to one form, and ship the dry-run `edition` print immediately.
