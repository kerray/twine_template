#!/bin/bash
# Script to download Tweego binary for the current platform

set -e

# Load environment variables from .env if it exists
if [ -f .env ]; then
  # Try to load the .env file, but don't fail if it can't be read
  if ! export $(cat .env | grep -v '^#' | xargs) 2>/dev/null; then
    echo "Warning: Could not fully load .env file. Using default values."
  fi
fi

# Set default version if not provided in .env
TWEEGO_VERSION="${TWEEGO_VERSION:-2.1.1}"
BIN_DIR="bin"

# Create directory if it doesn't exist
mkdir -p $BIN_DIR

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

echo "Detected platform: $PLATFORM ($TWEEGO_PLATFORM)"

# Download Tweego
echo "Downloading Tweego $TWEEGO_VERSION for $TWEEGO_PLATFORM..."
TWEEGO_URL="https://github.com/tmedwards/tweego/releases/download/v${TWEEGO_VERSION}/tweego-${TWEEGO_VERSION}-${TWEEGO_PLATFORM}.zip"
TWEEGO_ZIP="/tmp/tweego-${TWEEGO_VERSION}-${TWEEGO_PLATFORM}.zip"
TWEEGO_DIR="$BIN_DIR/tweego-${TWEEGO_VERSION}-${TWEEGO_PLATFORM}"

# Download Tweego zip
if command -v curl &> /dev/null; then
  curl -L --progress-bar "$TWEEGO_URL" -o "$TWEEGO_ZIP"
elif command -v wget &> /dev/null; then
  wget --progress=bar:force "$TWEEGO_URL" -O "$TWEEGO_ZIP"
else
  echo "Error: Neither curl nor wget is installed"
  exit 1
fi

# Extract Tweego
echo "Extracting Tweego..."
rm -rf "$TWEEGO_DIR"
mkdir -p "$TWEEGO_DIR"
unzip -q "$TWEEGO_ZIP" -d "$TWEEGO_DIR"
rm "$TWEEGO_ZIP"

# Make Tweego executable
chmod +x "$TWEEGO_DIR/tweego${BINARY_EXT}"

echo "Verifying download..."

# Verify Tweego
if [ ! -f "$TWEEGO_DIR/tweego${BINARY_EXT}" ]; then
  echo "Error: Failed to download Tweego binary"
  exit 1
fi

if [ ! -s "$TWEEGO_DIR/tweego${BINARY_EXT}" ]; then
  echo "Error: Downloaded Tweego binary is empty"
  exit 1
fi

echo "Tweego $TWEEGO_VERSION downloaded successfully!"