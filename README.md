# Twine Template (TwT)

A comprehensive template for creating text games in Twine with Sugarcube, designed to work seamlessly with AI agents.

## Overview

Twine Template (TwT) is a project that aims to streamline the development of text-based games using Twine and Sugarcube. It provides a structured template that can be used with AI agents (like Claude in VSCode with Cline) to quickly generate game content and presentation.

## Features

- **Ready-to-use structure** for Twine game development
- **Built-in Tweego compiler** for all major platforms
- **VSCode integration** with tasks for compiling and testing
- **AI-friendly prompts** for different development roles
- **GitHub Actions** for continuous integration and deployment
- **Comprehensive documentation** for both template development and game creation

## Directory Structure

- `./src/` - Twine source files (*.tw)
- `./src/media/` - Media files for the game
- `./pub/` - Compiled game output
- `./world/` - Game world information (worldbuilding, character sheets, etc.)
- `./prompts/` - AI role prompts
- `./bin/` - Tweego compiler binaries
- `./docs/` - Documentation
- `./memlog/` - Logs of completed work
- `./tests/` - Template tests

## Getting Started

1. Clone this repository
2. Open it with VSCode and the Cline extension with Claude
3. Use the provided VSCode tasks to compile your game
4. Start creating your game by defining your world in `./world/World.md`
5. Add your game content in `./src/` as .tw files

## Using with AI Agents

This template is designed to work with AI agents like Claude. The AI can take on different roles:

- **Template Developer** - For extending and improving the template
- **Game Writer** - For creating game content and narrative
- **Web Developer** - For styling and UI improvements
- **Game Designer** - For game mechanics and structure

## License

[License information to be added]

## Contributing

[Contribution guidelines to be added]