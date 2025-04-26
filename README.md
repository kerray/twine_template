# Twine Template (TwT)

A comprehensive batteries-included template for creating text games in Twine with Sugarcube, designed to work seamlessly with AI agents.

## Overview

Twine Template (TwT) is a project that aims to streamline the development of text-based games using Twine and Sugarcube. It provides a structured template that can be used with AI agents (in VSCode with Cline or Roo Code) to employ AI in writing Twine games and their presentation.

## Features

### Demo Game: Neural Nest
The template includes a demo game that showcases Twine/Sugarcube capabilities:

- **Variable Management & State Tracking**
  - Demonstrates `$awareness` and `$loops` variables
  - Shows how to persist and update game state
  - Examples of conditional content based on variables

- **Dynamic Content & Meta-Commentary**
  - Passages that evolve based on player progress
  - Meta-narrative elements that respond to player actions
  - Multiple paths with varying requirements

- **Modern Styling & Effects**
  - Custom CSS animations and transitions
  - Responsive design for all devices
  - Dark mode support
  - Status displays and UI components

See the demo game in action, built and published with GitHub Actions - https://kerray.github.io/twine_template/ 

### Core Features

- **Ready-to-use structure** for Twine game development
- **Built-in Tweego compiler** for all major platforms
- **VSCode integration** with tasks for compiling and testing
- **AI-friendly prompts** for different development roles
- **GitHub Actions** for continuous integration and deployment
- **Comprehensive documentation** for both template development and game creation
- **World building templates** to help define your game world
- **Cross-platform build system** using Just and shell scripts

## Directory Structure

- `./src/` - Twine source files (*.tw), can be in subfolders
- `./src/_media/` - Media files for the game
- `./dist/` - Compiled game output
- `./world/` - Game world information (worldbuilding, character sheets, etc.)
- `./world/templates/` - Templates for world building documents
- `./prompts/` - AI role prompts
- `./bin/` - binaries for Tweego compiler and Just
- `./docs/` - Documentation
- `./memlog/` - Logs of completed work
- `./scripts/` - Build and utility scripts
- `./tests/` - Template tests
- `./.github/workflows/` - GitHub Actions workflows

## Getting Started

See [INSTALL.md](INSTALL.md) for detailed setup instructions - give it as prompt to an AI agent to help you set up this project properly.

Once you have the template set up:

1. **Define your game world**
   - Copy the templates from `./world/templates/` to the `./world/` directory
   - Fill in the world building documents with your game's details
   ```bash
   cp ./world/templates/* ./world/
   ```

2. **Use AI to help develop your game**
   - Use the prompts (and update them - or have AI update them - for your needs!)  in `./prompts/` directory to guide the AI in different aspects of game development
   - The AI will help you create content, implement mechanics, and style your game

3. **Build and test your game**
   - Use VSCode tasks or Just commands to build:
     ```bash
     # Build the game
     ./just compile
     
     # Watch for changes
     just watch
     ```
   - Open `./dist/index.html` in a web browser to test

## Build System

The template includes a comprehensive build system using Just and shell scripts:

### Dependency Management Philosophy

The template follows a modular approach to dependencies:

1. **Base Setup (Minimal)**:
   - Just Tweego and Just command runner
   - Sufficient for basic Twine game development
   - No npm, Java, or other heavy dependencies
   - Use `just install-deps` for this minimal setup

2. **Testing Layer**:
   - Adds npm and Playwright
   - Only installed when user explicitly needs testing capabilities
   - Use `just install-tests` to set up

3. **Cordova Browser Builds**:
   - Adds capabilities for browser app packaging
   - Separate from mobile builds to keep dependencies minimal

4. **Mobile Builds** (work in progress):
   - Adds Java for Android and Mac-specific requirements
   - Heaviest dependency footprint
   - Only installed when explicitly needed for mobile development

This approach ensures you only install what you need for your specific use case.

### Basic Commands

- `just compile` - Compiles the game to a single HTML file.
- `just watch` - Watches for changes and recompiles the game file automatically
- `just clean` - Cleans the output directory
- `just install-deps` - Installs core dependencies (Tweego, Sugarcube, etc.)
- `just install-tests` - Installs test dependencies (npm, Playwright)
- `just install-all` - Installs all dependencies including test dependencies
- `just test` - Runs tests (without reinstalling test dependencies)

### Mobile App Commands - TODO - not yet tested

For automatically building mobile apps from compiled games with Cordova, see `docs/Cordova_Integration.md`. Available commands:

- `just cordova-init` - Initializes the Cordova project
- `just cordova-resources` - Generates Cordova resources
- `just cordova-android` - Builds the Android app
- `just cordova-ios` - Builds the iOS app
- `just cordova-windows` - Builds the Windows app
- `just cordova-browser` - Builds the Browser app
- `just setup-android` - Sets up the Android development environment

### Environment Variables

You can customize the build process with these variables:

- `OUTPUT_DIR` - Output directory (default: `dist`)
- `STORY_FORMAT` - Story format to use (default: `sugarcube-2-37-3`)
- `SRC_DIR` - Source directory (default: `src`)
- `TWEEGO_PATH` - Path to Tweego (automatically detected based on OS)

Example:
```
./just compile OUTPUT_DIR=custom-output STORY_FORMAT=harlowe-3
```

### Helper Scripts

The `./scripts/` directory contains helper scripts:

- `build-game.sh` - Builds the game
- `download-just.sh` - Downloads Just binaries for different platforms and symlink just in root folder
- `download-sugarcube.sh` - Downloads and sets up Sugarcube story format
- `download-tweego.sh` - Downloads and sets up Tweego compiler
- `install-dependencies.sh` - Installs dependencies like ImageMagick

## Using with AI Agents

This template is designed to work with AI agents. The project includes several specialized AI roles defined in `.roomodes` that help with different aspects of game development:

- **Template Developer** - For extending and improving the template itself
- **Game Writer** - For creating game content and narrative
- **Web Developer** - For styling and UI improvements
- **Game Designer** - For game mechanics and structure

Each role has specific capabilities and access restrictions to ensure focused development. See `.roomodes` for detailed role definitions and capabilities.

## World Building

The `./world/templates/` directory contains templates for defining your game world:

- **World.md** - Overview of the game world, setting, themes, and key locations
- **Characters.md** - Player character, main characters, supporting characters, and antagonists
- **Items.md** - Key items, collectibles, consumables, equipment, and currency
- **Mechanics.md** - Core mechanics, stats, inventory system, progression, and special systems
- **Story.md** - Main plot, story branches, endings, side stories, and story progression

## VSCode Tasks

The template includes several VSCode tasks to help with development:

- **Compile Game** - Compiles the game and outputs it to `./dist/index.html`
- **Watch and Compile** - Watches for changes in the `./src/` directory and automatically recompiles
- **Test Compilation** - Tests the compilation process without generating output
- **Clean Output Directory** - Cleans the output directory
- **Install Dependencies** - Installs required dependencies

## GitHub Actions

The template includes a GitHub Actions workflow that:

- Compiles the game using Tweego
- Tests the compilation
- Builds mobile and desktop versions using Cordova
- Deploys the compiled game to GitHub Pages (conditionally based on repository settings)

The workflow is configured to use Just and provide artifacts for all platforms on GitHub, just as it would locally.

## Recommended VSCode Extensions

The template includes recommendations for VSCode extensions that enhance the development experience:

- **Twine Language Tools** - Syntax highlighting and language support for Twine files
- **Live Server** - Easily view the compiled HTML game
- **ESLint** - JavaScript linting
- **Prettier** - Code formatting
- **Path Intellisense** - Path autocompletion
- **HTML CSS Support** - Enhanced HTML and CSS support
- **Markdown All in One** - Enhanced Markdown editing
- **Markdown Preview GitHub Styles** - Preview Markdown files with GitHub styling

When you open the project in VSCode, you'll be prompted to install these recommended extensions.

## License

This project uses a dual licensing approach:

1. **Non-Commercial Use**: GNU Affero General Public License v3.0
   - Free to use, modify, and distribute
   - Must keep source code open
   - Changes must be shared under the same license
   - See the LICENSE file for full terms

2. **Commercial Use**: Custom Commercial License
   - Required for any commercial use including:
     - Selling games created with this template
     - Using this template in commercial products
     - Incorporating this template into commercial services
   - Contact the author to obtain a commercial license
   - Ensures fair compensation while maintaining availability for non-commercial use

For more details, see the LICENSE file in the repository.

## Contributing

Contributions are welcome! Here's how you can contribute:

1. **Fork the repository**
2. **Create a feature branch**
   ```
   git checkout -b feature/your-feature-name
   ```
3. **Make your changes**
4. **Commit your changes**
   ```
   git commit -m "Add your feature description"
   ```
5. **Push to the branch**
   ```
   git push origin feature/your-feature-name
   ```
6. **Create a Pull Request**

Please make sure your code follows the existing style and includes appropriate documentation.