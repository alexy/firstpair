# First Pair Loop Lab

This is the First Pair Press proof book. It takes the small Kiffness controller
manual idea and rebuilds it through a Bell Labs-style workflow:

- Markdown as semantic source;
- Pandoc as linker;
- Typst for the modern PDF and EPUB path;
- generated utmac `.tr` plus Neatroff for the classic path;
- groff retained as a Pandoc `ms` compatibility fallback, matching the
  usavenice shipping pipeline.

Build it from the repo root or from this directory:

```sh
./proofs/kiffness-loop-lab/build.sh
```

Outputs land in `dist/`. The most important files are:

```text
firstpair-loop-lab-typst.pdf
firstpair-loop-lab-typst.epub
firstpair-loop-lab-neatroff.pdf
firstpair-loop-lab-groff.pdf
firstpair-loop-lab-utmac.pdf
firstpair-loop-lab-utmac.tr
VERSION.md
```

`firstpair-loop-lab-neatroff.pdf` and `firstpair-loop-lab-utmac.pdf` are both
Neatroff builds of the generated utmac source. `firstpair-loop-lab-groff.pdf` is
the Pandoc `ms` fallback.
