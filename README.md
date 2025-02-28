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
- **World building templates** to help define your game world

## Directory Structure

- `./src/` - Twine source files (*.tw)
- `./src/media/` - Media files for the game
- `./pub/` - Compiled game output
- `./world/` - Game world information (worldbuilding, character sheets, etc.)
- `./world/templates/` - Templates for world building documents
- `./prompts/` - AI role prompts
- `./bin/` - Tweego compiler binaries
- `./docs/` - Documentation
- `./memlog/` - Logs of completed work
- `./tests/` - Template tests
- `./.github/workflows/` - GitHub Actions workflows

## Getting Started

1. **Clone this repository**
   ```
   git clone https://github.com/yourusername/twine-template.git
   cd twine-template
   ```

2. **Open it with VSCode and the Cline extension with Claude**
   - Install [VSCode](https://code.visualstudio.com/)
   - Install the [Cline extension](https://marketplace.visualstudio.com/items?itemName=RooveVeterinaryInc.roo-cline)
   - Open the project folder in VSCode

3. **Define your game world**
   - Copy the templates from `./world/templates/` to the `./world/` directory
   - Fill in the world building documents with your game's details
   ```
   cp ./world/templates/* ./world/
   ```

4. **Use AI to help develop your game**
   - Use the prompts in the `./prompts/` directory to guide Claude in different aspects of game development
   - Copy the content of the appropriate prompt file and paste it to Claude in a new conversation

5. **Compile your game**
   - Use the VSCode tasks to compile your game:
     - Press `Ctrl+Shift+P` (or `Cmd+Shift+P` on macOS)
     - Type "Tasks: Run Task"
     - Select "Compile Game"
   - Alternatively, use the Tweego compiler directly:
     ```
     ./bin/tweego-2.1.1-[platform]/tweego -o pub/game.html -f sugarcube-2 src
     ```

6. **View your game**
   - Open `./pub/game.html` in a web browser

7. **Deploy your game**
   - Push your changes to GitHub
   - The GitHub Actions workflow will automatically compile and deploy your game to GitHub Pages

## Using with AI Agents

This template is designed to work with AI agents like Claude. The AI can take on different roles:

- **Template Developer** - For extending and improving the template
  - Use `./prompts/template-developer.md`
  - Focus on technical aspects, VSCode tasks, GitHub Actions, etc.

- **Game Writer** - For creating game content and narrative
  - Use `./prompts/game-writer.md`
  - Focus on story, characters, dialogue, and descriptive passages

- **Web Developer** - For styling and UI improvements
  - Use `./prompts/web-developer.md`
  - Focus on CSS, JavaScript, and UI enhancements

- **Game Designer** - For game mechanics and structure
  - Use `./prompts/game-designer.md`
  - Focus on game mechanics, inventory systems, stat tracking, etc.

## World Building

The `./world/templates/` directory contains templates for defining your game world:

- **World.md** - Overview of the game world, setting, themes, and key locations
- **Characters.md** - Player character, main characters, supporting characters, and antagonists
- **Items.md** - Key items, collectibles, consumables, equipment, and currency
- **Mechanics.md** - Core mechanics, stats, inventory system, progression, and special systems
- **Story.md** - Main plot, story branches, endings, side stories, and story progression

## VSCode Tasks

The template includes several VSCode tasks to help with development:

- **Compile Game** - Compiles the game and outputs it to `./pub/game.html`
- **Watch and Compile** - Watches for changes in the `./src/` directory and automatically recompiles
- **Test Compilation** - Tests the compilation process without generating output

## Recommended VSCode Extensions

The template includes recommendations for VSCode extensions that enhance the development experience:

- **Twine Language Tools** - Syntax highlighting and language support for Twine files
- **Live Server** - Easily view the compiled HTML game
- **ESLint** - JavaScript linting
- **Prettier** - Code formatting
- **Path Intellisense** - Path autocompletion
- **HTML CSS Support** - Enhanced HTML and CSS support
- **JavaScript (ES6) code snippets** - Useful JavaScript snippets
- **Markdown All in One** - Enhanced Markdown editing
- **Markdown Preview GitHub Styles** - Preview Markdown files with GitHub styling
- **Code Spell Checker** - Spell checking for code and documentation
- **Auto Rename Tag** - Automatically rename paired HTML/XML tags
- **Auto Close Tag** - Automatically add closing tags

When you open the project in VSCode, you'll be prompted to install these recommended extensions.

## GitHub Actions

The template includes a GitHub Actions workflow that:

- Compiles the game using Tweego
- Tests the compilation
- Deploys the compiled game to GitHub Pages

## License

MIT License

Copyright (c) 2025 [Your Name]

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

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