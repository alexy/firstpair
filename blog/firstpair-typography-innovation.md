---
title: "Making Text Shine"
subtitle: "First Pair Press, Bell Labs typography, and the next source-native book"
date: 2026-07-08
author: "First Pair Press"
slug: "firstpair-typography-innovation"
canonical_url: "https://firstpair.press/firstpair-typography-innovation"
header_image: "assets/firstpair-typography-innovation-header.png"
header_alt: "Steampunk futuristic Benjamin Franklin beside an Independence Hall spaceship launching into a starry sky."
tags:
  - first-pair
  - typography
  - bell-labs
  - troff
  - typst
  - pandoc
  - neatroff
  - utmac
---

# Making Text Shine

![Steampunk futuristic Benjamin Franklin beside an Independence Hall spaceship launching into a starry sky.](assets/firstpair-typography-innovation-header.png)

First Pair Press is building an editing method before it is building a
typesetting stack.

The method begins with a simple wager: a book becomes better when its sources
remain visible. Not just the final PDF. Not just a polished EPUB. The Markdown,
the `.fp.tr` source, the generated intermediates, the warning logs, the
renderer comparisons, the manifest, and the human decisions should all remain
available to the next reader, editor, or collaborator.

That is why the First Pair workflow keeps two first-class sources:

- `Markdown` for semantic writing, links, citations, outlines, EPUB, HTML, and
  Pandoc-driven portability.
- `.fp.tr` for a direct Bell Labs line: readable troff, First Pair semantic
  macros, utmac page craft, and Neatroff output.

The point is not nostalgia. The point is editorial leverage. Markdown lets a
manuscript move through the modern ecosystem. `.fp.tr` lets the same house keep
faith with the classic Unix idea that serious documents can be written as
plain, inspectable programs.

## The Bell Labs Method

Bell Labs gave us more than a formatter. It gave us a way of thinking about
writing systems.

In the original Bell System Technical Journal paper "Document Preparation,"
Brian W. Kernighan, M. E. Lesk, and J. F. Ossanna Jr. described the method in
full:

> "These are programmable text formatters that accommodate a wide variety of formatting tasks by providing flexible fundamental tools rather than specific features."

That is the whole seed.

```text
not a menu of features
not a frozen page
not a proprietary box

text
  |
  +-- small programs
  +-- flexible primitives
  +-- visible transformations
  |
  `-- beautiful documents
```

The later troff manual keeps the same spirit: the source is text mixed with
formatting control, and the formatter emits device-independent output that a
driver turns into a printed page. The pipeline invites more tools, not fewer:
`refer`, `pic`, `tbl`, `eqn`, `troff`, and a device driver can each do their
own job.

First Pair Press inherits that method and asks what it means now.

## The Manifesto Becomes A Workshop

The [First Pair Bell Labs Manifesto](https://firstpair.press/firstpair-manifesto)
says that books are semantic source, that AI is another Unix filter, that
renderers should compete while source endures, and that Pandoc can act as a
publishing linker.

Those are not slogans for a website. They are workshop rules.

Editing at First Pair means:

- Turn the manuscript into semantic source before polishing the surface.
- Keep the source readable by a person in a terminal.
- Let the AI remove friction without hiding its hand.
- Compare renderers as editorial evidence.
- Preserve enough logs and manifests that the next pass can trust the last one.
- Choose the page that best serves the reader, not the tool that flatters the
  workflow.

The human owns taste, judgment, risk, and publication. The AI can check,
convert, compare, summarize, and suggest. The renderer can surprise us. The
source keeps everybody honest.

## Markdown And `.fp.tr`

Markdown is the portable editorial surface. It is where chapters can be
outlined, claims can be linked, citations can be managed, and EPUB or HTML can
be produced without ceremony. Pandoc makes Markdown valuable not because
Markdown is perfect, but because it can be linked to many backends.

`.fp.tr` is the deliberate classic source. It uses a small First Pair macro
vocabulary over troff:

```troff
.FP.TITLE "A Book Title"
.FP.SUBTITLE "A readable source-native edition"
.FP.CHAPTER "The First Problem"
.FP.P
The text is still text.
.FP.QUOTE
The page is a derived artifact.
.FP.END
```

That source can be inspected, revised, diffed, and built. It is a manuscript
and a score. It tells the formatter what the sentence is trying to be without
turning the writer into a mouse operator.

This is where classic Unix typography becomes exciting again. Pandoc gives us
the bridge. Typst gives us a contemporary programmable PDF path. Neatroff gives
us a living route back to the Bell Labs lineage. utmac gives troff a richer
book vocabulary for metadata, headings, notes, summaries, references, and page
craft.

First Pair is not choosing between old and new. It is making them collaborate.

## Making Text Shine

The phrase "making text shine" sounds decorative until you work through a real
manuscript.

Text shines when structure is clarified. It shines when a paragraph break is
earned. It shines when a citation becomes visible at the right moment. It
shines when a PDF lets the eye breathe, when an EPUB respects a small reader,
when a landscape editorial proof gives the editor room to think.

Typography is not icing. Typography is editorial instrumentation.

A page reveals whether the argument has rhythm. A chapter opening reveals
whether the book knows where it is. A table of contents reveals whether the
architecture is real. A narrow e-ink screen reveals whether the sentence can
walk by itself.

This is why First Pair treats output comparison as editing, not packaging.

## Continuous Innovation

The First Pair method will keep changing because the whole point is to keep the
source durable while letting the renderers improve.

Some of the next experiments are already obvious:

- Triptychs for comparing multiple fine-tuned styles side by side: classic,
  modern, and experimental renderings from the same source.
- EPUB viewing tests on black-and-white and color e-ink readers, because a book
  that only looks good on a desktop monitor is not finished.
- Comfortable landscape PDF editorials for deep review sessions, with generous
  margins, strong hierarchy, and room for notes.
- Source-linked proofs where a visible page can lead back to the Markdown,
  `.fp.tr`, or generated utmac that produced it.
- Renderer manifests that preserve not only what built, but what each build
  taught us about the text.
- More direct collaboration between AI editorial passes and deterministic
  typesetting passes, with every transformation inspectable.

The promise is not one magic format. The promise is continuous innovation on a
stable source contract.

```text
author intent
  |
  +-- markdown source
  |     +-- pandoc
  |     +-- typst
  |     +-- epub
  |
  +-- first pair troff source
        +-- fp.tmac
        +-- utmac
        +-- neatroff

one book, many proofs
many proofs, better judgment
better judgment, brighter text
```

First Pair Press is reviving classic Unix typography in the only way that
matters: by making it useful again for living books.

The page should be beautiful. The source should be honest. The text should
shine.

## Sources

- Brian W. Kernighan, M. E. Lesk, and J. F. Ossanna Jr.,
  ["Document Preparation"](https://www.tuhs.org/Archive/Documentation/Papers/BSTJ/bstj57-6-2115.pdf),
  *The Bell System Technical Journal*, July-August 1978.
- Joseph F. Ossanna and Brian W. Kernighan,
  [*Troff User's Manual*](https://9p.io/sys/doc/troff.ps), Plan 9 edition.
- [First Pair Bell Labs Manifesto](https://firstpair.press/firstpair-manifesto).
- [First Pair Bell Labs workflow](../firstpress-belllabs.md).
- [First Pair publishing workflow](../publishing/PUBLISH.md).
- [First Pair troff source](../fp.tr) and
  [First Pair macro layer](../publishing/tmac/fp.tmac).
