#!/bin/bash
# Script to build the Twine game

# Load environment variables from .env if it exists
if [ -f .env ]; then
  export $(cat .env | grep -v '^#' | xargs)
fi

# Default variables
OUTPUT_DIR=${1:-dist}
TWEEGO_VERSION="${TWEEGO_VERSION:-2.1.1}"
SUGARCUBE_VERSION="${SUGARCUBE_VERSION:-2.37.3}"
STORY_FORMAT=${2:-"sugarcube-2-${SUGARCUBE_VERSION//./-}"}
SRC_DIR=${3:-src}

# Detect platform
case "$(uname -s)" in
  Linux*)
    PLATFORM="linux"
    ARCH="$(uname -m)"
    case "$ARCH" in
      x86_64) ARCH_SUFFIX="x64";;
      i386|i686) ARCH_SUFFIX="x86";;
      *) echo "Unsupported Linux architecture: $ARCH"; exit 1;;
    esac
    TWEEGO_PLATFORM="linux-${ARCH_SUFFIX}"
    BINARY_EXT=""
    ;;
  Darwin*)
    PLATFORM="macos"
    ARCH="$(uname -m)"
    case "$ARCH" in
      x86_64) ARCH_SUFFIX="x64";;
      i386) ARCH_SUFFIX="x86";;
      *) echo "Unsupported macOS architecture: $ARCH"; exit 1;;
    esac
    TWEEGO_PLATFORM="macos-${ARCH_SUFFIX}"
    BINARY_EXT=""
    ;;
  CYGWIN*|MINGW*|MSYS*)
    PLATFORM="windows"
    ARCH="$(uname -m)"
    case "$ARCH" in
      x86_64) ARCH_SUFFIX="x64";;
      i386|i686) ARCH_SUFFIX="x86";;
      *) echo "Unsupported Windows architecture: $ARCH"; exit 1;;
    esac
    TWEEGO_PLATFORM="windows-${ARCH_SUFFIX}"
    BINARY_EXT=".exe"
    ;;
  *)
    echo "Unsupported platform: $(uname -s)"
    exit 1
    ;;
esac

TWEEGO_PATH="bin/tweego-${TWEEGO_VERSION}-${TWEEGO_PLATFORM}"
TWEEGO_BIN="$TWEEGO_PATH/tweego${BINARY_EXT}"

# Ensure output directory exists
mkdir -p "$OUTPUT_DIR"

# Make Tweego executable
chmod +x "$TWEEGO_BIN"

# Copy custom storyformats if they exist
if [ -d .storyformats ]; then
    mkdir -p "$TWEEGO_PATH/storyformats"
    cp -r .storyformats/* "$TWEEGO_PATH/storyformats/"
fi

# Build the game
echo "Building game with Tweego..."
echo "Output directory: $OUTPUT_DIR"
echo "Story format: $STORY_FORMAT"
echo "Source directory: $SRC_DIR"

"$TWEEGO_BIN" -o "$OUTPUT_DIR/index.html" -f "$STORY_FORMAT" "$SRC_DIR"

# Check if build was successful
if [ $? -eq 0 ]; then
    echo "Game built successfully: $OUTPUT_DIR/index.html"
else
    echo "Error building game"
    exit 1
fi

# Test compilation if requested
if [ "$4" == "test" ]; then
    echo "Testing compilation..."
    "$TWEEGO_BIN" -t -o "$OUTPUT_DIR/index.html" -f "$STORY_FORMAT" "$SRC_DIR"

    if [ $? -eq 0 ]; then
        echo "Compilation test passed"
    else
        echo "Compilation test failed"
        exit 1
    fi
fi