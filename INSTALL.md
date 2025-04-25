# Installation Protocol

This document serves as a step-by-step protocol/checklist for both human users and AI coding agents to set up a new Twine game project using this template.

## Prerequisites

### Required
- Bash shell environment
  - Linux/macOS: Built-in terminal
  - Windows: Install Git Bash, WSL, or similar Bash environment
- Git installed and configured
- VSCode with Roo Code extension installed
  - This enables AI assistance throughout development
  - The AI can guide you through this protocol - just ask it to "Start and guide me through the INSTALL.md protocol"

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

Update these files with your game's information:

1. `src/StoryTitle.tw` - Set your game's title
2. `src/StoryData.tw` - Update author name and other metadata
3. `world/World.md` - Define your game's world and basic concepts

## Basic Usage

1. Write your game content in `.tw` files in the `src` directory
2. Use VSCode tasks or Just commands to build your game:
   ```bash
   # Build the game
   ./just compile
   
   # Watch for changes and rebuild automatically
   ./just watch
   ```

The compiled game will be available in the `dist` directory.

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

## AI Assistance

When using VSCode with the Roo Code extension:
1. The AI can guide you through any part of this protocol
2. It can help you:
   - Set up and configure your project
   - Define your game world
   - Create and edit content
   - Handle technical aspects
3. Different AI modes are available for different tasks:
   - Writer mode for story content
   - Code mode for technical implementation
   - Architect mode for planning and structure
4. To start, simply ask the AI to "Start and guide me through the INSTALL.md protocol"

## Next Steps

Once installation is complete:
1. Read the main README.md for game development guidelines
2. Start defining your game world in `world/World.md`:
   - Set up the features of your game
   - Define the limits and borders of your game world
   - This information will guide the AI Writer in creating consistent content
3. Begin creating your first passages in `src`:
   - Recommended approach is one passage per file
   - Use the AI Writer mode for content creation