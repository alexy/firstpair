# History of the Rio-Grandense Republic Public Preview

This public package is a preview, not the complete book. It is designed to show
the historical cover image, the title/front matter, the full table of contents,
and the opening prefatory text of *History of the Rio-Grandense Republic: A
Revised English Reading Edition*.

## Preview Limit

| Item | Value |
| --- | --- |
| Full main body words | 37,640 |
| Preview body words | 770 |
| Preview percentage | 2.05% |
| Cut boundary | After the prefatory opening, before Chapter I |
| Reason for boundary | Adding Chapter I would raise the preview to 10,108 words, or 26.85% of the main body |
| Build date | 2026-07-09 |

The EPUB keeps the complete table of contents visible. Chapters and appendices
outside the preview window are represented by link-valid placeholders so the
contents remain navigable without exposing the complete text.

## Edition

| Edition | Purpose | PDF | EPUB | Reader | Chapters | Source commit | Notes |
| --- | --- | --- | --- | --- | --- | --- | --- |
| Alexy Preview | Revised English reading-edition preview. | [PDF](https://fl6nu3o2c1oqqnum.public.blob.vercel-storage.com/books/rio-grande/pdf/ab811cfd364fe6bf-historia_riograndense_brasil-alexy-preview.pdf) | [EPUB](https://fl6nu3o2c1oqqnum.public.blob.vercel-storage.com/books/rio-grande/epub/96c66ac959f1d904-historia_riograndense_brasil-alexy-preview.epub) | [Read](/read/rio-grande/) | [Chapter reader](/read/rio-grande/chapters/) | `9192d38cc94f7ab4e3d75a86a7ad10b9504d61f3` | Built from the current reading-edition EPUB XHTML and cover image. |

## Style And Rosetta Status

Rio Grande currently has one reading edition. No South, East, West, Rosetta, or
Rosetta Scored outputs were generated for this package because this title does
not have corresponding style branches or aligned comparison sources.

## Artifacts

| Artifact | Format | Size | SHA-256 |
| --- | --- | ---: | --- |
| `https://fl6nu3o2c1oqqnum.public.blob.vercel-storage.com/books/rio-grande/pdf/ab811cfd364fe6bf-historia_riograndense_brasil-alexy-preview.pdf` | PDF | 1,195,617 bytes | `ab811cfd364fe6bfef7aa15fc577c2aeddbcf8e5fea417614d2c1d0dd3c8fe3b` |
| `https://fl6nu3o2c1oqqnum.public.blob.vercel-storage.com/books/rio-grande/epub/96c66ac959f1d904-historia_riograndense_brasil-alexy-preview.epub` | EPUB | 568,608 bytes | `96c66ac959f1d904d3a760946b32ac34da697b08af0437ce4b32b52f63b19945` |
| `/read/rio-grande/` | Hosted HTML reader | 744,369 bytes | `b010ffb13fdb76e46a3530ff6b74a01ec69129bc8bf06cf3ce4b5a5aa7bdc5bf` |
| `/read/rio-grande/chapters/` | Hosted chapter reader | 7 files | `9403b1f5b300e2e443502956b23e96561a04cfd21ed685c2acb44f2ff5b3ad5d` |
| `assets/rio-grande-cover.png` | PNG | 551,309 bytes | `4ae020738758e72bf6102b9affaa2bba0e88b2638670eea9ba55c515dd58945f` |

## Source And Package State

| Item | Value |
| --- | --- |
| Source archive commit | `9192d38cc94f7ab4e3d75a86a7ad10b9504d61f3` |
| First Pair site base commit | `74c47ee5c43e1d1a9233d31776119c474ba62ca6` |
| Source inputs | Current tracked reading-edition PDF, EPUB, and EPUB cover image |
| Preview package URL | `/rio-grande/preview/` |
| Expected production URL after deployment | `https://firstpair.org/rio-grande/preview/` |

## Validation

| Check | Result |
| --- | --- |
| EPUB zip integrity | Passed: `unzip -t` reported no errors |
| EPUB spine | Passed: cover, title page, preview note, table of contents, and prefatory opening only |
| PDF metadata | Passed: title set to public preview, author set to Assis Brasil |
| PDF page count | Passed: 10 pages |
| PDF page size | Passed: 302.4 x 457.2 pt |
| PDF text check | Passed: preview ends before Chapter I body text |
| PDF render check | Passed: cover, title, preview note, contents, opening text, and final stop note inspected |
| Local path leak scan | Passed after package creation |
| First Pair site build | Passed after package creation |
| Public artifact upload | Passed: PDF and EPUB are direct artifacts; HTML readers are hosted on `firstpair.org` from Blob-backed sources |
| Public URL check | Pending after next First Pair site deployment |

Publishing is separate from package preparation. Do not describe the production
URL as live until the First Pair site has been deployed and checked.
