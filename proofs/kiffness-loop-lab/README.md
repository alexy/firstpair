# First Pair Loop Lab

This is the First Pair Press proof book. It takes the small Kiffness controller
manual idea and rebuilds it through a Bell Labs-style workflow:

- Markdown as semantic source;
- hand-authored First Pair troff as the pure Bell Labs source;
- Pandoc as linker;
- Typst for the modern PDF and EPUB path;
- generated utmac `.tr` plus Neatroff for renderer comparison;
- First Pair `.FP.*` macros on top of utmac for the direct troff path;
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
firstpair-loop-lab-firstpair.pdf
firstpair-loop-lab-firstpair.tr
firstpair-loop-lab-neatroff.pdf
firstpair-loop-lab-groff.pdf
firstpair-loop-lab-utmac.pdf
firstpair-loop-lab-utmac.tr
VERSION.md
```

`firstpair-loop-lab-firstpair.pdf` is the hand-authored pure troff proof:
`source.fp.tr` rendered by Neatroff with `publishing/tmac/fp.tmac` and utmac.

`firstpair-loop-lab-neatroff.pdf` and `firstpair-loop-lab-utmac.pdf` are both
Neatroff builds of the generated utmac source. They prove the conversion path.
`firstpair-loop-lab-groff.pdf` is the Pandoc `ms` fallback.
