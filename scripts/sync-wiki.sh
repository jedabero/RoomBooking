#!/usr/bin/env bash
set -euo pipefail

SOURCE_DIR="docs/wiki"
TARGET_DIR="../RoomBooking.wiki"

if [ ! -d "$TARGET_DIR/.git" ]; then
  echo "Wiki repository not found at $TARGET_DIR"
  echo "Clone it with:"
  echo "git clone git@github.com:jedabero/RoomBooking.wiki.git $TARGET_DIR"
  exit 1
fi

cp "$SOURCE_DIR"/*.md "$TARGET_DIR"/

cd "$TARGET_DIR"
git status
