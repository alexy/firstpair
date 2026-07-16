#!/usr/bin/env python3
"""Create a deterministic, UTF-8-safe ZIP of an Obsidian vault."""

from __future__ import annotations

import argparse
import json
import os
import shutil
import stat
import tempfile
import zipfile
from pathlib import Path, PurePosixPath


ARCHIVE_TIMESTAMP = (1980, 1, 1, 0, 0, 0)
FIRST_OPEN_HELPER = PurePosixPath(".obsidian/workspace-first-open.json")
DESKTOP_WORKSPACE = PurePosixPath(".obsidian/workspace.json")
MOBILE_WORKSPACE = PurePosixPath(".obsidian/workspace-mobile.json")
SAVED_WORKSPACES = PurePosixPath(".obsidian/workspaces.json")
VOLATILE_WORKSPACE_NAMES = frozenset(
    {DESKTOP_WORKSPACE.name, MOBILE_WORKSPACE.name}
)
FIRST_OPEN_PAYLOAD = {
    "main": {
        "id": "0531043c990df55e",
        "type": "split",
        "children": [
            {
                "id": "9999cbdea50fbe72",
                "type": "tabs",
                "children": [
                    {
                        "id": "fb59b2571954a561",
                        "type": "leaf",
                        "state": {
                            "type": "markdown",
                            "state": {
                                "file": "Home.md",
                                "mode": "preview",
                                "source": False,
                            },
                            "icon": "lucide-file",
                            "title": "Home",
                        },
                    }
                ],
            }
        ],
        "direction": "vertical",
    },
    "left": {
        "id": "fbb039bb5e18d3b2",
        "type": "split",
        "children": [
            {
                "id": "f52d68d4d1bea7f2",
                "type": "tabs",
                "children": [
                    {
                        "id": "a900cdd0c196c7e8",
                        "type": "leaf",
                        "state": {
                            "type": "file-explorer",
                            "state": {
                                "sortOrder": "alphabetical",
                                "autoReveal": False,
                            },
                            "icon": "lucide-folder-closed",
                            "title": "Files",
                        },
                    },
                    {
                        "id": "cea44760eccde1a3",
                        "type": "leaf",
                        "state": {
                            "type": "search",
                            "state": {
                                "query": "",
                                "matchingCase": False,
                                "explainSearch": False,
                                "collapseAll": False,
                                "extraContext": False,
                                "sortOrder": "alphabetical",
                            },
                            "icon": "lucide-search",
                            "title": "Search",
                        },
                    },
                    {
                        "id": "630f9c4a9ac0b16b",
                        "type": "leaf",
                        "state": {
                            "type": "bookmarks",
                            "state": {},
                            "icon": "lucide-bookmark",
                            "title": "Bookmarks",
                        },
                    },
                ],
            }
        ],
        "direction": "horizontal",
        "width": 300,
    },
    "right": {
        "id": "1b7c9dc5a4742406",
        "type": "split",
        "children": [
            {
                "id": "7da908430128da70",
                "type": "tabs",
                "children": [
                    {
                        "id": "40b875ecfdd371ed",
                        "type": "leaf",
                        "state": {
                            "type": "outline",
                            "state": {
                                "file": "Home.md",
                                "followCursor": False,
                                "showSearch": False,
                                "searchQuery": "",
                            },
                            "icon": "lucide-list",
                            "title": "Outline of Home",
                        },
                    }
                ],
            }
        ],
        "direction": "horizontal",
        "width": 300,
        "collapsed": True,
    },
    "active": "fb59b2571954a561",
    "lastOpenFiles": ["Home.md"],
}
FIRST_OPEN_BYTES = (json.dumps(FIRST_OPEN_PAYLOAD, indent=2) + "\n").encode("utf-8")


def excluded(relative: PurePosixPath) -> bool:
    """Match the publication contract's volatile/private path exclusions."""

    return (
        relative.name == ".DS_Store"
        or ".git" in relative.parts
        or any(part in VOLATILE_WORKSPACE_NAMES for part in relative.parts)
        or relative in {FIRST_OPEN_HELPER, SAVED_WORKSPACES}
    )


def first_open_workspace(vault: Path) -> bytes | None:
    """Validate and return the source-owned first-open seed, when present."""

    helper = vault / FIRST_OPEN_HELPER
    if not helper.exists() and not helper.is_symlink():
        return None
    if helper.is_symlink() or not helper.is_file():
        raise ValueError(f"first-open workspace helper must be a regular file: {FIRST_OPEN_HELPER}")

    raw = helper.read_bytes()
    try:
        payload = json.loads(raw.decode("utf-8"))
    except (UnicodeDecodeError, json.JSONDecodeError) as error:
        raise ValueError(f"invalid first-open workspace helper: {error}") from error
    if payload != FIRST_OPEN_PAYLOAD or raw != FIRST_OPEN_BYTES:
        raise ValueError(
            "first-open workspace helper must be exactly the canonical complete "
            f"Home workspace: {FIRST_OPEN_HELPER}"
        )

    home = vault / "Home.md"
    if home.is_symlink() or not home.is_file():
        raise ValueError("first-open workspace helper requires a regular root Home.md")
    return raw


def archive_info(name: str, *, directory: bool) -> zipfile.ZipInfo:
    if directory and not name.endswith("/"):
        name += "/"
    info = zipfile.ZipInfo(name, date_time=ARCHIVE_TIMESTAMP)
    info.create_system = 3
    info.compress_type = zipfile.ZIP_DEFLATED
    info._compresslevel = 9
    mode = (stat.S_IFDIR | 0o755) if directory else (stat.S_IFREG | 0o644)
    info.external_attr = mode << 16
    if directory:
        info.external_attr |= 0x10
    return info


def publication_members(vault: Path) -> list[tuple[PurePosixPath, Path]]:
    root_name = PurePosixPath(vault.name)
    members: list[tuple[PurePosixPath, Path]] = [(root_name, vault)]
    for path in sorted(vault.rglob("*"), key=lambda item: item.relative_to(vault).as_posix()):
        relative = PurePosixPath(path.relative_to(vault).as_posix())
        if excluded(relative):
            continue
        if path.is_symlink():
            raise ValueError(f"symbolic links are forbidden in a published vault: {relative}")
        if not path.is_dir() and not path.is_file():
            raise ValueError(f"unsupported filesystem entry in published vault: {relative}")
        members.append((root_name / relative, path))
    return members


def build_archive(vault: Path, output: Path, guide: Path | None) -> None:
    vault = vault.expanduser()
    if vault.is_symlink():
        raise ValueError(f"vault root must not be a symbolic link: {vault}")
    vault = vault.resolve(strict=True)
    output = output.expanduser().resolve()
    guide = guide.expanduser().resolve(strict=True) if guide else None
    if not vault.is_dir():
        raise ValueError(f"vault is not a directory: {vault}")
    if output == vault or output.is_relative_to(vault):
        raise ValueError(f"archive output must be outside the vault: {output}")
    if guide is not None and not guide.is_file():
        raise ValueError(f"vault guide is not a regular file: {guide}")

    members: list[tuple[PurePosixPath, Path | bytes]] = publication_members(vault)
    workspace = first_open_workspace(vault)
    if workspace is not None:
        members.extend(
            [
                (PurePosixPath(vault.name) / DESKTOP_WORKSPACE, workspace),
                (PurePosixPath(vault.name) / MOBILE_WORKSPACE, workspace),
            ]
        )
    guide_name = PurePosixPath(vault.name, "README.md") if guide else None
    if guide_name is not None and guide is not None:
        members = [member for member in members if member[0] != guide_name]
        members.append((guide_name, guide))
    members.sort(key=lambda member: member[0].as_posix())
    output.parent.mkdir(parents=True, exist_ok=True)
    descriptor, temporary_name = tempfile.mkstemp(
        prefix=f".{output.name}.", suffix=".tmp", dir=output.parent
    )
    os.close(descriptor)
    temporary = Path(temporary_name)
    try:
        with zipfile.ZipFile(
            temporary,
            mode="w",
            compression=zipfile.ZIP_DEFLATED,
            compresslevel=9,
            strict_timestamps=True,
        ) as archive:
            for archive_path, source in members:
                if isinstance(source, bytes):
                    info = archive_info(archive_path.as_posix(), directory=False)
                    info.file_size = len(source)
                    archive.writestr(info, source)
                elif source.is_dir():
                    archive.writestr(archive_info(archive_path.as_posix(), directory=True), b"")
                else:
                    info = archive_info(archive_path.as_posix(), directory=False)
                    info.file_size = source.stat().st_size
                    with source.open("rb") as source_file, archive.open(info, "w") as target:
                        shutil.copyfileobj(source_file, target, length=1024 * 1024)
        temporary.chmod(0o644)
        os.replace(temporary, output)
    finally:
        temporary.unlink(missing_ok=True)


def main() -> None:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--vault", type=Path, required=True)
    parser.add_argument("--output", type=Path, required=True)
    parser.add_argument("--guide", type=Path)
    args = parser.parse_args()
    try:
        build_archive(args.vault, args.output, args.guide)
    except (OSError, ValueError, zipfile.BadZipFile) as error:
        parser.error(str(error))


if __name__ == "__main__":
    main()
