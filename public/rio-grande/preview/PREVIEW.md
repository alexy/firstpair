# History of the Rio-Grandense Republic Public Preview

This public package is a preview, not the complete book. It is designed to show
the historical cover image, the title/front matter, the full table of contents,
and the opening prefatory text of *History of the Rio-Grandense Republic: A
Revised English Reading Edition*.

## Preview Limit

| Item | Value |
| --- | --- |
| Full manuscript words | 43,410 |
| Preview body words | 765 |
| Preview percentage | 1.76% |
| Cut boundary | After the prefatory opening, before Chapter I |
| Reason for boundary | Chapter I adds 9,335 words, raising the excerpt to 10,100 words or 23.27% of the manuscript |
| Build date | 2026-07-15 |

The EPUB keeps the complete table of contents visible. Chapters and appendices
outside the preview window are represented by link-valid placeholders so the
contents remain navigable without exposing the complete text.

## Edition

| Edition | Purpose | PDF | EPUB | Reader | Chapters | Source commit | Notes |
| --- | --- | --- | --- | --- | --- | --- | --- |
| Alexy Preview | Revised English reading-edition preview. | [PDF](/rio-grande/pdf/) | [EPUB](/rio-grande/epub/) | [Read](/read/rio-grande/) | [Chapter reader](/read/rio-grande/chapters/) | `ddbb1bb0157c0c4de14ed0e7521ad75b59f6e76b` | Built from the source manuscript through the unified First Pair builder. |

## Style And Rosetta Status

Rio Grande currently has one reading edition. No South, East, West, Rosetta, or
Rosetta Scored outputs were generated for this package because this title does
not have corresponding style branches or aligned comparison sources.

## Artifacts

| Artifact | Format | Size | SHA-256 |
| --- | --- | ---: | --- |
| `/rio-grande/pdf/` | PDF | 1,049,122 bytes | `d3e6b68469a50db002c755084bc91e935f929b80c68c220c88a6cdbd8f2067fb` |
| `/rio-grande/epub/` | EPUB | 536,665 bytes | `514491d02c636d4db52ce7c03e41ec5855e5af3a69e7a335180ee49ed63bb9b3` |
| `/read/rio-grande/` | Hosted HTML reader | 719,434 bytes | `23a7a1a0ca5e362161ef55a9030b8a4ca67662b3fbd7c5e8bbf6f0b447bda068` |
| `/read/rio-grande/chapters/` | Hosted chapter reader | 21 files | Built from the same preview manuscript |
| `assets/rio-grande-cover.png` | PNG | 520,603 bytes | `9db814bb2ab3f2ed70940174a2396d976b2a2e9f79768f04af2c8405067e9379` |
| `../rio-grande-headboard.png` | PNG | 2,627,574 bytes | `bf89685da3dd5521d02bd0948da4fb560142ddb3e25819f7cb00fe0f4149f526` |

The checksums above describe the built, staged, and published `2026.07.15`
package. The stable public routes serve these content-addressed payloads.

## Source And Package State

| Item | Value |
| --- | --- |
| Source commit | `ddbb1bb0157c0c4de14ed0e7521ad75b59f6e76b` |
| First Pair publication base | `2252027c61606e2151f5becf9a1a5e7368b6f6cb` |
| Source inputs | Source manuscript, original facsimile PDF title page, deterministic cover renderer, and generated lagoon headboard |
| Preview package URL | `/rio-grande/preview/` |
| Production URL | `https://firstpair.org/rio-grande/preview/` |

## Validation

| Check | Result |
| --- | --- |
| EPUB zip integrity | Passed: `unzip -t` reported no errors |
| EPUB reader-facing title | Passed: one exact preview title in package and navigation metadata |
| EPUB 3 navigation | Passed: 40 TOC links; every document and fragment target resolves |
| EPUB legacy navigation | Passed: 40 NCX entries agree with EPUB 3 labels and destinations |
| EPUB landmarks | Passed: cover and table-of-contents landmarks both resolve |
| EPUB spine | Passed: 19 unique XHTML documents in reading order; TOC targets follow that order |
| PDF metadata | Passed: title set to public preview, translator metadata names Alexy Khrabrov and firstpair.press |
| PDF page count | Passed: 13 pages |
| PDF page size | Passed: 302.4 x 457.2 pt |
| PDF bookmark outline | Passed: 43 navigable heading bookmarks with cover-adjusted destinations |
| PDF text check | Passed: preview ends before Chapter I body text |
| PDF render check | Passed: overprinted cover, title, preview note, contents, opening text, and final stop note inspected |
| Cover source check | Passed: renderer extracts page 7 from the original PDF and applies the exact three-line translator mask |
| Headboard check | Passed: 1672 x 941 lagoon scene, no embedded text or watermark |
| Local path leak scan | Passed after package creation |
| First Pair site build | Passed after package creation |
| Publisher dry-run | Passed: preview, cover, and headboard resolved with every outward action disabled |
| Local staging | Passed: PDF, EPUB, HTML, chapters, cover, and headboard staged |
| Public artifact upload | Passed: content-addressed PDF, EPUB, HTML, chapters, cover, and headboard uploaded |
| Public URL check | Passed: production preview, stable downloads, and hosted readers verified |

The preview is live in the First Pair library. The complete book remains
private and was not selected by the publisher.
