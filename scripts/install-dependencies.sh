#!/bin/bash
# Script to install dependencies based on the OS

# Detect OS
if [[ "$OSTYPE" == "linux-gnu"* ]]; then
    # Linux
    echo "Installing dependencies for Linux..."
    
    # Check if we're in a GitHub Actions environment
    if [ -n "$GITHUB_ACTIONS" ]; then
        # Install ImageMagick
        sudo apt-get update
        sudo apt-get install -y imagemagick
    else
        # For local development, just check if ImageMagick is installed
        if ! command -v convert &> /dev/null; then
            echo "ImageMagick is not installed. Please install it manually:"
            echo "sudo apt-get install imagemagick"
            exit 1
        fi
    fi
    
elif [[ "$OSTYPE" == "darwin"* ]]; then
    # macOS
    echo "Installing dependencies for macOS..."
    
    # Check if we're in a GitHub Actions environment
    if [ -n "$GITHUB_ACTIONS" ]; then
        # Install ImageMagick using brew
        brew install imagemagick
    else
        # For local development, just check if ImageMagick is installed
        if ! command -v convert &> /dev/null; then
            echo "ImageMagick is not installed. Please install it manually:"
            echo "brew install imagemagick"
            exit 1
        fi
    fi
    
elif [[ "$OSTYPE" == "msys" || "$OSTYPE" == "cygwin" || "$OSTYPE" == "win32" ]]; then
    # Windows
    echo "Installing dependencies for Windows..."
    
    # For Windows, we don't try to install ImageMagick automatically
    # as it requires a graphical installer
    echo "Note: On Windows, ImageMagick must be installed manually."
    echo "Download from: https://imagemagick.org/script/download.php"
    
    # If in GitHub Actions, we'll use a pre-installed version
    if [ -n "$GITHUB_ACTIONS" ]; then
        echo "Using pre-installed ImageMagick in GitHub Actions runner"
    fi
else
    echo "Unsupported OS: $OSTYPE"
    exit 1
fi

echo "Dependencies installation completed"