# Skill: Obsidian Mobile Vault

Use when deriving a compact Obsidian vault for phone and tablet reading from a
larger book, research vault, or source archive.

The mobile vault is a separate reader product, not a partial copy of the
archival vault. Its source repository owns the builder, validator, Reader
sequence, citation map, plugin bundle, and product manifest.

It should be rebuilt directly from the canonical manuscript and reviewed
source maps, not by pruning the generated full vault. This avoids carrying
desktop workspace state, archival files, and audit-only links into the phone
package.

1. Confirm the source repository, generated mobile-vault path, local Obsidian
   vault path, and dedicated Obsidian Sync remote. Never attach the compact
   vault to the complete vault's remote.
2. Ask the user to close the generated and local mobile vaults before a full
   rebuild. Wait for confirmation before writing either directory.
3. Derive the payload from canonical source. Include the complete continuous
   Reader sequence, the exact bilingual passages reached by its quotations,
   the canonical cover, compact derivatives of every selected Reader image, a
   root `Home.md`, and a complete static Markdown fallback.
4. Exclude archival masters, research graphs, uncited source witnesses,
   generated caches, personal workspaces, and desktop-only evidence unless the
   mobile reading contract explicitly requires them.
5. Give illustrations deterministic mobile derivatives, normally WebP with a
   fixed maximum dimension. Record source identity, output hash, dimensions,
   encoder version, byte count, and placement in the product manifest. A
   1200-pixel maximum dimension and a total package below 10 MiB are proven
   starting points, not universal limits.
6. Enforce explicit file-count and byte ceilings in the source-owned validator.
   Also verify every Reader target, quotation link, bilingual anchor, image,
   plugin file, and startup note.
7. Preserve the local vault root and `.obsidian` directory when refreshing an
   existing product. Preserve core-plugin state, community-plugin consent, and
   plugin `data.json` unless the product contract deliberately changes them.
8. Ship the Reader plugin files but keep community plugins disabled through the
   first Sync. Enable the plugin only after Markdown, images, configuration,
   and plugin files have reached the device.
9. Configure Obsidian Sync per device for images, other file types, vault
   configuration, the active community-plugin list, and installed community
   plugins. JSON Reader and quote indexes require **Sync all other types**;
   WebP plates require **Sync images**. A count that matches the Markdown-only
   payload is not evidence that Sync has stalled; inspect both selective-sync
   and configuration-sync settings before rebuilding.
10. Open only `Home.md` on first Sync. The plugin must not subscribe to vault
    create or modify events, and its file-open handler should return before
    loading Reader data unless the opened note belongs to the Reader surface.
11. Render exactly one plugin navigation rail, at the bottom by default, with a
    setting that moves the same rail to the top. The visible order is
    **Previous | Up | Back | Top | TOC | Next**. Keep Previous and Next in the
    flexible outside tracks; keep the four middle controls compact and
    touch-sized.
12. On phones, show destination titles for Previous and Next on one ellipsized
    line, put Next at the far right, hide page-progress text, and contain wide
    tables and images inside the reading column. Do not create page-level
    horizontal overflow.
13. Make Back return in the same leaf to the last ordinary vault note opened
    before the Reader. Exclude Reader notes from that history. Use Obsidian's
    fixed-size `rotate-ccw` Lucide icon and keep it recognizable while disabled.
    Static Markdown omits Back because it has no safe prior-note context.
14. Point Top at the true beginning of the Reader page, including pages that
    begin with a cover or plate, rather than only at the first heading.
15. Validate at phone width: all six controls, 44-pixel touch targets, visible
    enabled and disabled states, readable titles, contained tables and images,
    touch-sized source citations, clickable quote rails, independent Reader
    scrolling, and no viewport overflow.
16. Keep two explicit validation modes. The default closed-build gate requires
    deterministic first-open workspace aliases and exact aggregate package
    bytes. A separate live mode may tolerate only Obsidian's rewrites of
    volatile workspace aliases and their aggregate-byte effect; it must retain
    exact Reader, source, plugin, illustration, link, count, size-limit, and
    individual-hash checks.

The product manifest should bind at least the edition, Reader page count,
bilingual passage count, illustration count, plugin version, plugin hashes,
cover hash, Reader and quote-index hashes, illustration-index hash, total file
count, and total bytes. The source-owned validator is the release gate;
FirstPair must not infer mobile completeness from a ZIP listing.

## Safe Initial Sync

1. Disconnect or remove the old full vault from the phone. Deleting a local
   device vault is not permission to delete its remote or Mac source folder.
2. Open the generated mobile folder as a new local vault on the Mac. Create a
   dedicated remote with a distinct name and standard managed encryption unless
   the user requests another supported mode. Never connect it to the full-vault
   remote.
3. Before the first Mac transfer, enable **Sync images**, **Sync all other
   types**, **Active community plugin list**, and **Installed community plugin
   list**. Restart Obsidian when the device-specific Sync settings require it,
   resume, and wait for **Fully synced**.
4. On iOS, connect a fresh local vault to the mobile remote. Set the same four
   options before starting, then force-quit and reopen when required. Wait for
   transfer and indexing to settle on `Home.md`.
5. Enable the Reader plugin only after the phone is responsive and current.
   Verify the actual Reader, cover, six controls, illustrations, and bilingual
   targets instead of relying on the enabled toggle.
6. Fully quit and relaunch Obsidian, reopen the same mobile vault, rerun the live
   validator, and inspect the changed behavior. A source test, build message, or
   **Fully synced** badge alone is not deployment evidence.

The source build never creates, deletes, connects, or modifies a remote. It may
preserve Sync configuration in an already connected local vault, but remote
creation and connection are separate explicit user actions.

Reference shape:

```text
mobile-vault/
  Home.md
  README.md
  Reader/
  Sources/Bilingual/
  Illustrations/ (selected plates and cover)
  .obsidian/plugins/<reader-plugin>/
  MOBILE-VAULT.json
```

Pitfalls:

- do not trim chapters or citations merely to meet a size target;
- do not publish archival image masters to a phone vault;
- do not confuse Obsidian Sync with iCloud filesystem synchronization;
- do not enable a community plugin before its runtime and configuration have
  finished syncing;
- do not use a file count alone as a transfer-health signal.

Validated Cicero profile: 24 Reader pages, 33 cited bilingual passages, 33
1200-pixel WebP plates plus the cover, fewer than 110 files, and less than
10 MiB. Preserve the method, not those title-specific counts: every book should
declare and validate its own exact subset and ceilings.

For updates to an already connected Reader plugin, continue with
[`obsidian-reader-plugin-delivery.md`](obsidian-reader-plugin-delivery.md).
