# Installation Protocol

This document serves as a comprehensive step-by-step protocol for both human users and AI coding agents to set up and develop a new Twine game project using this template. It is designed as both a human-readable guide and a sophisticated multi-step prompt for AI agents.

## For AI Agents: How to Use This Protocol

As an AI agent, you should approach this protocol as a structured workflow for assisting users setting up their Twine game development using this template (TwT). First you help the user set up the template so that Just works and that compilation of Twee works. During the process, you evaluate how much help the user needs in technical stuff, in planning out their game, writing it and so on, and whether they already have some content or notes, which they could include in /world/, on which you then create a new README.md for this particular game and its development, and updated Roo Code rules to suit this particular user's needs.


## Prerequisites

### Required
- Bash shell environment
  - Linux/macOS: Built-in terminal
  - Windows: Install Git Bash, WSL, or similar Bash environment
- Git installed and configured
- VSCode with Roo Code extension installed
  - This enables AI assistance throughout development
  - The AI can guide you through this protocol - just ask it to "Guide me through the INSTALL.md protocol" in Code mode (or any mode with access to terminal)

### Optional but Recommended
- GitHub account for:
  - Version control
  - Automated build and publication
  - Web hosting via GitHub Pages
  - Access to the "Use this template" feature

## Installation Steps

### 1. Create New Repository

#### Option A: Using GitHub Template (Recommended)
1. Visit https://github.com/kerray/twine_template
2. Click the green "Use this template" button
3. Choose "Create a new repository"
4. Name it whatever you want your game project to be called
5. Clone your new repository and open it in VSCode:
   ```bash
   git clone https://github.com/yourusername/your-game-name.git
   cd your-game-name
   ```

#### Option B: Manual Setup
1. Create a new empty repository on GitHub
   - Name it whatever you want your game project to be called
   - Don't initialize it with any files

2. Clone this template repository with a special remote name:
   ```bash
   git clone --origin template https://github.com/kerray/twine_template.git your-game-name
   cd your-game-name
   ```

3. Set up your repository as the primary remote:
   ```bash
   git remote add origin https://github.com/yourusername/your-game-name.git
   git branch -M main
   git push -u origin main
   ```

### 2. Install Dependencies

Run the installation script:
```bash
./install.sh
```

This script will:
1. Create the `.env` file from `.env.example` if it doesn't exist
2. Download and set up Just command runner
3. Download and set up Tweego compiler
4. Download and set up Sugarcube storyformat
5. Install other dependencies
6. Compile the initial game

### 3. Initial Configuration

Update these files with information about your game:

1. `src/StoryTitle.tw` - Set your game's title
2. `src/StoryData.tw` - Update author name and other metadata
3. `src/StoryStylesheet.tw` - Game colors, fonts etc.
4. `world/World.md` and other .md files - If you have existing notes, save them in the world/ folder. Define your game design, paint the game's world and basic concepts.

## Basic Usage

1. Write your game content in `.tw` files in the `src` directory and subfolders, manually or together with AIs through Roo Code
2. Use VSCode tasks or Just commands to build your game:
   ```bash
   # Build the game
   ./just compile
   
   # Watch for changes and rebuild automatically
   ./just watch
   ```

The compiled game will be available as `/dist/index.html`.

## GitHub Pages Setup (Optional)

To publish your game online:

1. Go to your GitHub repository's Settings
2. Navigate to Pages section
3. Under "Source", select "GitHub Actions"
4. Commit and push any change to trigger the first build

Your game will be available at `https://yourusername.github.io/your-game-name`

## Advanced Features

For information about advanced features like mobile app builds with Cordova, refer to:
- `docs/Cordova_Integration.md` for mobile deployment
- `docs/Build_System.md` for detailed build system documentation

## AI Assistance Workflow

When using VSCode with the Roo Code extension, follow this structured workflow:

### 1. Project Setup Phase
- AI will guide you through installation steps
- AI will help configure initial files
- AI will explain the project structure and purpose

### 2. World Building Phase
- AI will ask targeted questions about your game concept
- AI will help populate world files in the `world/` directory
- AI will ensure world files define clear boundaries and concepts
- AI will help setting up special game design mechanisms - variables etc.
- 
### 3. Content Creation Phase
- AI will help you create and she pepassage content based on world files
- AI will maintain narrative consistency
- AI will implement game mechanics using Sugarcube syntax
- AI will organize passages in appropriate directories, when the game structure requires sectioning

### 4. Testing and Refinement Phase
- AI will help compile the game
- AI will troubleshoot any issues (copy errors and paste them into new task in Code mode)
- AI will suggest improvements and enhancements

### AI Mode Selection Guide

Different AI modes are available for different tasks:

1. **Writer Mode**
   - **When to use**: For creating narrative content, dialogue, and story elements
   - **Capabilities**: Creates passage content with proper Twine links and formatting
   - **Example prompt**: "Switch to Writer mode and help me create the introduction passage for my game"

2. **Game Designer Mode**
   - **When to use**: For designing game mechanics, variables, and systems
   - **Capabilities**: Implements game logic, state tracking, and progression systems
   - **Example prompt**: "Switch to Game Designer mode and help me create an inventory system"

3. **Web Developer Mode**
   - **When to use**: For enhancing visual presentation and user interface
   - **Capabilities**: Creates CSS styling, animations, and responsive layouts
   - **Example prompt**: "Switch to Web Developer mode and help me style the status bar"

4. **Template Developer Mode**
   - **When to use**: For modifying template infrastructure or build system
   - **Capabilities**: Updates build scripts, configuration, and project organization
   - **Example prompt**: "Switch to Template Developer mode and help me add a new build task"

To start, simply ask AI through Roo Code: "Start and guide me through the INSTALL.md protocol"
