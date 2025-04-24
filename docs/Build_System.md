# Twine Template Build System

This document provides detailed information about the build system used in the Twine Template project.

## Overview

The Twine Template build system is designed to provide a consistent and cross-platform way to compile Twine games and build mobile/desktop applications. It uses a combination of:

- **Just**: A modern command runner that provides standardized commands
- **Shell Scripts**: Handle OS-specific operations and setup
- **VSCode Tasks**: Integrate with the VSCode IDE
- **GitHub Actions**: Automate building and deployment

## Directory Structure

- `./scripts/`: Contains helper scripts for the build system
  - `setup-tweego.sh`: Sets up Tweego based on the OS
  - `install-dependencies.sh`: Installs dependencies like ImageMagick
  - `build-game.sh`: Builds the game
  - `download-just.sh`: Downloads Just binaries for different platforms
- `./bin/`: Contains Tweego compiler binaries and Just binaries for different platforms
- `./dist/`: Default output directory for compiled games
- `./.github/workflows/`: Contains GitHub Actions workflow definitions

## Just

The justfile provides a standardized interface for building and deploying Twine games. It automatically detects the operating system and uses the appropriate Tweego binary.

The `download-just.sh` script creates a platform-specific symlink named `just` in the root directory that points to the appropriate Just binary for your system. This allows you to run Just commands using `./just` regardless of your platform. For example:

```bash
# Run Just using the symlink
./just compile
./just watch
```

### Variables

You can customize the build process with these variables:

- `OUTPUT_DIR`: Output directory (default: `dist`)
- `STORY_FORMAT`: Story format to use (default: `sugarcube-2-37-3`)
- `SRC_DIR`: Source directory (default: `src`)
- `TWEEGO_PATH`: Path to Tweego (automatically detected based on OS)

### Commands

- `just`: Shows the list of available commands
- `just compile`: Compiles the game
- `just watch`: Watches for changes and recompiles automatically
- `just test`: Tests the compilation
- `just clean`: Cleans the output directory
- `just setup-tweego`: Sets up Tweego with proper permissions and storyformats
- `just install-deps`: Installs dependencies
- `just cordova-init`: Initializes the Cordova project
- `just cordova-resources`: Generates Cordova resources
- `just cordova-android`: Builds the Android app
- `just cordova-ios`: Builds the iOS app
- `just cordova-windows`: Builds the Windows app
- `just cordova-browser`: Builds the Browser app
- `just setup-android`: Sets up the Android development environment

### Examples

```bash
# Compile the game with default settings
just compile

# Compile the game with custom output directory
just compile OUTPUT_DIR=custom-output

# Compile the game with custom story format
just compile STORY_FORMAT=harlowe-3

# Watch for changes and recompile
just watch

# Test compilation
just test

# Clean the output directory
just clean

# Build for Android
just cordova-android
```

## Helper Scripts

### setup-tweego.sh

This script sets up Tweego based on the operating system:

- Detects the OS (Linux, macOS, Windows)
- Sets the appropriate Tweego path and binary
- Makes the Tweego binary executable
- Copies custom storyformats if they exist

Usage:
```bash
./scripts/setup-tweego.sh
```

### install-dependencies.sh

This script installs dependencies based on the operating system:

- Detects the OS (Linux, macOS, Windows)
- Installs ImageMagick if in a GitHub Actions environment
- Checks if ImageMagick is installed for local development

Usage:
```bash
./scripts/install-dependencies.sh
```

### build-game.sh

This script builds the Twine game:

- Takes parameters for output directory, story format, and source directory
- Detects the OS and sets the appropriate Tweego path and binary
- Ensures the output directory exists
- Runs the setup-tweego script
- Builds the game
- Optionally tests the compilation

Usage:
```bash
./scripts/build-game.sh [output_dir] [story_format] [src_dir] [test]
```

Example:
```bash
# Build with default settings
./scripts/build-game.sh

# Build with custom output directory
./scripts/build-game.sh custom-output

# Build with custom story format and output directory
./scripts/build-game.sh custom-output harlowe-3

# Build with custom settings and test compilation
./scripts/build-game.sh custom-output harlowe-3 src test
```

### download-just.sh

This script downloads Just binaries for different platforms:

- Downloads Just for Linux (x64)
- Downloads Just for macOS (x64)
- Downloads Just for Windows (x64)
- Places them in the `./bin/` directory

Usage:
```bash
./scripts/download-just.sh
```

## VSCode Tasks

The VSCode tasks are defined in `.vscode/tasks.json` and provide an easy way to run the build commands from within VSCode:

- **Compile Game**: Runs `just compile`
- **Watch and Compile**: Runs `just watch`
- **Test Compilation**: Runs `just test`
- **Clean Output Directory**: Runs `just clean`
- **Initialize Cordova Project**: Runs `just cordova-init`
- **Setup Android Development Environment**: Runs `just setup-android`
- **Generate App Resources**: Runs `just cordova-resources`
- **Add Android Platform**: Runs `just cordova-android`
- **Add iOS Platform**: Runs `just cordova-ios`
- **Add Windows Platform**: Runs `just cordova-windows`
- **Add Browser Platform**: Runs `just cordova-browser`
- **Install Dependencies**: Runs `just install-deps`
- **Download Just**: Runs `./scripts/download-just.sh`

To run a task:
1. Press `Ctrl+Shift+P` (or `Cmd+Shift+P` on macOS)
2. Type "Tasks: Run Task"
3. Select the task you want to run

## GitHub Actions

The GitHub Actions workflow is defined in `.github/workflows/build-and-deploy.yml` and automates the build and deployment process:

- **build-web**: Compiles the game and deploys it to GitHub Pages
  - Sets up Just
  - Installs dependencies
  - Compiles the game
  - Tests the compilation
  - Uploads the web artifact
  - Deploys to GitHub Pages (conditionally)

- **build-android**: Builds the Android app
  - Sets up Just
  - Downloads the web artifact
  - Sets up Java and Android SDK
  - Installs Cordova and cordova-res
  - Builds the Android app
  - Uploads the Android artifact

- **build-windows**: Builds the Windows app
  - Sets up Just
  - Downloads the web artifact
  - Installs Cordova and cordova-res
  - Builds the Windows app
  - Uploads the Windows artifact

- **build-ios**: Builds the iOS app
  - Sets up Just
  - Downloads the web artifact
  - Installs Cordova and cordova-res
  - Builds the iOS app
  - Uploads the iOS artifact

The workflow is triggered on:
- Push to the main branch
- Pull requests to the main branch
- Manual dispatch with optional parameters

## Customizing the Build System

### Adding a New Story Format

1. Add the story format files to `.storyformats/your-format-name/`
2. Use the format in your build command:
   ```
   just compile STORY_FORMAT=your-format-name
   ```

### Adding a New Platform

1. Create a new script in `cordova/scripts/` for the platform
2. Add a new command to the justfile
3. Add a new task to `.vscode/tasks.json`
4. Add a new job to `.github/workflows/build-and-deploy.yml`

### Customizing the Output

1. Change the `OUTPUT_DIR` variable:
   ```
   just compile OUTPUT_DIR=custom-output
   ```
2. Update the paths in the GitHub Actions workflow
3. Update the paths in the VSCode tasks

## Troubleshooting

### Tweego Not Found

If Tweego is not found, make sure:
1. The Tweego binaries are in the `./bin/` directory
2. The binaries have executable permissions
3. The correct OS-specific binary is being used

Solution:
```bash
chmod +x ./bin/tweego-2.1.1-*/tweego*
./scripts/setup-tweego.sh
```

### Just Not Found

If Just is not found, make sure:
1. The Just binaries are in the `./bin/` directory
2. The binaries have executable permissions

Solution:
```bash
./scripts/download-just.sh
chmod +x ./bin/just-*
```

### ImageMagick Not Installed

If ImageMagick is not installed, you'll see an error when trying to generate resources.

Solution:
```bash
# Linux
sudo apt-get install imagemagick

# macOS
brew install imagemagick

# Windows
# Download and install from https://imagemagick.org/script/download.php
```

### GitHub Pages Deployment Not Working

If the GitHub Pages deployment is not working, check:
1. The repository settings to ensure GitHub Pages is enabled
2. The branch name in the workflow file matches your main branch
3. The conditional deployment is set correctly

Solution:
Edit `.github/workflows/build-and-deploy.yml` and update the conditions for the "Deploy to GitHub Pages" step.