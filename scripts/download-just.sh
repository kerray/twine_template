#!/bin/bash
# Script to download Just binaries for different platforms

set -e

# Load environment variables from .env if it exists
if [ -f .env ]; then
  export $(cat .env | grep -v '^#' | xargs)
fi

# Set default version if not provided in .env
JUST_VERSION="${JUST_VERSION:-1.40.0}"
BIN_DIR="bin"

# Create bin directory if it doesn't exist
mkdir -p $BIN_DIR

# Function to download Just binary for a specific platform
download_just() {
  local platform=$1
  local format=$2
  local ext=$3
  local output_dir=$4
  local binary_name=$5

  echo "Downloading Just $JUST_VERSION for ${platform}..."
  
  local url="https://github.com/casey/just/releases/download/${JUST_VERSION}/just-${JUST_VERSION}-${platform}"
  if [ "$format" = "zip" ]; then
    url="${url}.zip"
  elif [ "$format" = "tar.gz" ]; then
    url="${url}.tar.gz"
  fi
  
  echo "Downloading from: $url"
  
  # Create output directory if it doesn't exist
  mkdir -p "$output_dir"
  
  case "$format" in
    "zip")
      local temp_zip="/tmp/just-${platform}.zip"
      
      # Download the zip file
      if command -v curl &> /dev/null; then
        curl -L --progress-bar "$url" -o "$temp_zip"
      elif command -v wget &> /dev/null; then
        wget --progress=bar:force "$url" -O "$temp_zip"
      else
        echo "Error: Neither curl nor wget is installed"
        exit 1
      fi

      # Create temporary directory for extraction
      local temp_dir="/tmp/just-${platform}"
      mkdir -p "$temp_dir"

      # Unzip the file
      unzip -q "$temp_zip" -d "$temp_dir"

      # Move the binary to final location
      mv "$temp_dir/just${ext}" "$output_dir/$binary_name"

      # Cleanup
      rm -rf "$temp_dir" "$temp_zip"
      ;;

    "tar.gz")
      local temp_tar="/tmp/just-${platform}.tar.gz"
      
      # Download the tar.gz file
      if command -v curl &> /dev/null; then
        curl -L --progress-bar "$url" -o "$temp_tar"
      elif command -v wget &> /dev/null; then
        wget --progress=bar:force "$url" -O "$temp_tar"
      else
        echo "Error: Neither curl nor wget is installed"
        exit 1
      fi

      # Create temporary directory for extraction
      local temp_dir="/tmp/just-${platform}"
      mkdir -p "$temp_dir"

      # Extract the tar.gz file
      tar xzf "$temp_tar" -C "$temp_dir"

      # Move the binary to final location
      mv "$temp_dir/just${ext}" "$output_dir/$binary_name"

      # Cleanup
      rm -rf "$temp_dir" "$temp_tar"
      ;;

    *)
      # Download binary directly
      if command -v curl &> /dev/null; then
        curl -L --progress-bar "$url" -o "$output_dir/$binary_name"
      elif command -v wget &> /dev/null; then
        wget --progress=bar:force "$url" -O "$output_dir/$binary_name"
      else
        echo "Error: Neither curl nor wget is installed"
        exit 1
      fi
      ;;
  esac

  # Make it executable
  chmod +x "$output_dir/$binary_name"
  
  echo "Just binary downloaded to $output_dir/$binary_name"
}

# Check if required tools are installed
if ! command -v unzip &> /dev/null; then
  echo "Error: unzip is not installed (required for Windows binary)"
  exit 1
fi

if ! command -v tar &> /dev/null; then
  echo "Error: tar is not installed (required for Linux and macOS binaries)"
  exit 1
fi

# Download Just for Linux (x64)
download_just "x86_64-unknown-linux-musl" "tar.gz" "" "$BIN_DIR/just-linux-x64" "just"

# Download Just for macOS (Intel)
download_just "x86_64-apple-darwin" "tar.gz" "" "$BIN_DIR/just-macos-x64" "just"

# Download Just for Windows (x64)
download_just "x86_64-pc-windows-msvc" "zip" ".exe" "$BIN_DIR/just-windows-x64" "just.exe"

echo "Verifying downloads..."

# Verify the downloads
for platform in "linux" "macos" "windows"; do
  binary_path="$BIN_DIR/just-${platform}-x64/just"
  if [ "$platform" = "windows" ]; then
    binary_path="${binary_path}.exe"
  fi
  
  if [ ! -f "$binary_path" ]; then
    echo "Error: Failed to download Just binary for $platform"
    exit 1
  fi
  
  if [ ! -s "$binary_path" ]; then
    echo "Error: Downloaded Just binary for $platform is empty"
    exit 1
  fi
done

echo "All Just binaries downloaded successfully!"

# Create platform-specific symlink
case "$(uname -s)" in
  Linux*)
    ln -sf bin/just-linux-x64/just just
    ;;
  Darwin*)
    ln -sf bin/just-macos-x64/just just
    ;;
  CYGWIN*|MINGW*|MSYS*)
    ln -sf bin/just-windows-x64/just.exe just
    ;;
esac

echo "Created platform-specific symlink 'just'"