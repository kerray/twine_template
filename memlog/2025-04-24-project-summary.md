# Twine Template (TwT) Project Summary - 2025-04-24

## Project Overview
The Twine Template (TwT) project was developed as a comprehensive template for creating text-based games using Twine with Sugarcube. The project aims to provide a standardized, self-contained development environment that enables both manual development and AI-assisted game creation.

## Key Components and Decisions

### 1. Source Organization
- Strict .tw-only policy in /src directory:
  - All game content in .tw files
  - CSS contained in StoryStylesheet.tw
  - JavaScript contained in StoryScript.tw
  - No HTML files allowed for consistency
- Rationale: Maintains project consistency and aligns with Twine's philosophy
- Makes the project more maintainable and easier to manage

### 2. Development Environment
- VSCode-centric with carefully selected extensions:
  - Twine Language Tools for syntax highlighting
  - Live Server for game preview
  - ESLint and Prettier for code quality
  - Markdown tools for documentation
  - HTML/CSS/JavaScript support
  - Quality of life improvements (auto-rename, spell check, etc.)
- Comprehensive settings for consistent development experience

### 3. Project Structure
- Organized with clear separation of concerns:
  - `/src`: Game source files (*.tw only)
  - `/world`: Game world documentation and templates
  - `/prompts`: AI role-specific prompts
  - `/docs`: Project and technical documentation
  - `/bin`: Self-contained binaries (Tweego, Just)
  - `/memlog`: Development tracking and planning
  - `/tests`: Testing infrastructure

### 2. Build System Evolution
- Initially used Makefile for build processes
- Migrated to Just (https://just.systems) for:
  - Simpler, more intuitive syntax
  - Better cross-platform compatibility
  - Improved error messages and user experience
  - Self-contained binary distribution
  - Better maintainability

### 3. AI Integration
Created specialized AI role prompts for different aspects:
- Template Developer: Technical development and infrastructure
- Game Writer: Story content and narrative
- Web Developer: Styling and UI improvements
- Game Designer: Game mechanics and systems

### 4. Mobile/Desktop/Web Deployment
Implemented comprehensive Cordova integration for multi-platform deployment:
- Native Apps:
  - Android, iOS, and Windows platforms
  - Platform-specific optimizations
  - Native UI elements and capabilities
- Web Applications:
  - Browser platform support
  - Progressive Web App (PWA) potential
  - Installable web apps with service workers
- Common Features:
  - Responsive design
  - Touch input handling
  - Offline capabilities
  - Automated build processes

### 5. Development Workflow
- VSCode-centric development environment
- Integrated GitHub Actions for:
  - Automated game compilation
  - Testing
  - Deployment to GitHub Pages
  - Mobile/desktop app builds

### 6. World Building Framework
Created structured templates for:
- World.md: Game world, setting, themes, locations
- Characters.md: Player character, NPCs, antagonists
- Items.md: Collectibles, equipment, currency
- Mechanics.md: Core systems, stats, progression
- Story.md: Plot structure, branches, progression

## Technical Decisions

### 1. Sugarcube Format Choice
- Selected Sugarcube v2 for:
  - Rich feature set
  - Good documentation
  - Active community support
  - Flexibility for game development

### 2. Self-Contained Design
- Included all necessary binaries:
  - Tweego compiler for different platforms
  - Just build system
  - Sugarcube story format
- Minimizes external dependencies
- Ensures consistent behavior across environments

### 3. Mobile-First Approach
- Implemented responsive design from the start
- Added touch input optimization
- Included offline capabilities
- Created platform-specific UI adaptations

### 4. Development Workflow
- VSCode-centric development environment with:
  - Customized tasks for compilation
  - Integrated preview capabilities
  - Code quality tools
  - Consistent formatting
- GitHub Actions integration for:
  - Automated game compilation
  - Testing
  - Deployment to GitHub Pages
  - Mobile/desktop app builds

### 5. Documentation Strategy
- Comprehensive technical documentation
- Example-driven guides
- Clear installation and usage instructions
- Platform-specific setup guides

## Future Considerations

1. Enhanced Testing
- More comprehensive test coverage
- Automated testing for mobile builds
- Performance testing framework

2. AI Role Expansion
- Additional specialized AI roles
- Enhanced prompts for specific game genres
- Integration with more AI tools/platforms

3. Template Features
- Advanced game mechanics templates
- Additional UI components
- Enhanced platform optimizations
- Progressive Web App features
- Extended deployment options

## Project Philosophy
- Maintain simplicity while providing power
- Enable both manual and AI-assisted development
- Ensure cross-platform compatibility
- Keep everything self-contained
- Prioritize user experience
- Support scalable game development

This template serves as a foundation for creating Twine games with professional tooling and processes, whether working manually or with AI assistance. The focus on self-contained tools, clear documentation, and automated processes makes it accessible while maintaining the flexibility for complex game development.