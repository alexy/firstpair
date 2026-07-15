#!/usr/bin/env python3
"""Write stable title and author metadata without changing rendered PDF pages."""

from __future__ import annotations

import argparse
import os
from pathlib import Path
from tempfile import NamedTemporaryFile

from pypdf import PdfReader, PdfWriter


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser()
    parser.add_argument("pdf", type=Path)
    parser.add_argument("--title", required=True)
    parser.add_argument("--author", default="")
    return parser.parse_args()


def main() -> None:
    args = parse_args()
    source = args.pdf.resolve()
    reader = PdfReader(source)
    writer = PdfWriter(clone_from=source)
    writer.pdf_header = reader.pdf_header

    metadata = dict(reader.metadata or {})
    metadata["/Title"] = args.title
    if args.author:
        metadata["/Author"] = args.author
    writer.add_metadata(metadata)

    mode = source.stat().st_mode
    with NamedTemporaryFile(
        mode="wb",
        prefix=f".{source.stem}-metadata-",
        suffix=".pdf",
        dir=source.parent,
        delete=False,
    ) as temporary:
        temporary_path = Path(temporary.name)
        writer.write(temporary)

    try:
        os.chmod(temporary_path, mode)
        os.replace(temporary_path, source)
    finally:
        temporary_path.unlink(missing_ok=True)


if __name__ == "__main__":
    main()
