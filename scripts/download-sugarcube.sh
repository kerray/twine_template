#!/bin/bash
# Script to download Sugarcube storyformat

set -e

# Load environment variables from .env if it exists
if [ -f .env ]; then
  export $(cat .env | grep -v '^#' | xargs)
fi

# Set default version if not provided in .env
SUGARCUBE_VERSION="${SUGARCUBE_VERSION:-2.37.3}"
STORYFORMATS_DIR=".storyformats"

# Create directory if it doesn't exist
mkdir -p $STORYFORMATS_DIR

# Download Sugarcube
echo "Downloading Sugarcube $SUGARCUBE_VERSION..."
SUGARCUBE_URL="https://github.com/tmedwards/sugarcube-2/releases/download/v${SUGARCUBE_VERSION}/sugarcube-${SUGARCUBE_VERSION}-for-twine-2.1-local.zip"
SUGARCUBE_ZIP="/tmp/sugarcube-${SUGARCUBE_VERSION}.zip"
SUGARCUBE_DIR="$STORYFORMATS_DIR/sugarcube-2-${SUGARCUBE_VERSION//./-}"

# Download Sugarcube zip
if command -v curl &> /dev/null; then
  curl -L --progress-bar "$SUGARCUBE_URL" -o "$SUGARCUBE_ZIP"
elif command -v wget &> /dev/null; then
  wget --progress=bar:force "$SUGARCUBE_URL" -O "$SUGARCUBE_ZIP"
else
  echo "Error: Neither curl nor wget is installed"
  exit 1
fi

# Extract Sugarcube
echo "Extracting Sugarcube..."
rm -rf "$SUGARCUBE_DIR"
mkdir -p "$SUGARCUBE_DIR"
unzip -q "$SUGARCUBE_ZIP" "sugarcube-2/*" -d "/tmp"
mv /tmp/sugarcube-2/* "$SUGARCUBE_DIR/"
rm -rf "/tmp/sugarcube-2" "$SUGARCUBE_ZIP"

# Verify Sugarcube
if [ ! -f "$SUGARCUBE_DIR/format.js" ]; then
  echo "Error: Failed to download Sugarcube format"
  exit 1
fi

if [ ! -s "$SUGARCUBE_DIR/format.js" ]; then
  echo "Error: Downloaded Sugarcube format is empty"
  exit 1
fi

echo "Sugarcube $SUGARCUBE_VERSION downloaded successfully!"