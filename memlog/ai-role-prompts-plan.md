# AI Role Prompts Plan

This document outlines the planned AI role prompts that will be used to guide AI agents in different aspects of game development.

## Overview

The Twine Template (TwT) project will include several AI role prompts to help users leverage AI agents (like Claude in VSCode with Cline) for different aspects of game development. These prompts will be stored in the `./prompts` directory and can be used to instruct the AI on how to assist with specific tasks.

## Planned AI Roles

### 1. Template Developer

This role focuses on extending and improving the template itself.

**File:** `./prompts/template-developer.md`

**Key Responsibilities:**
- Improving the template structure
- Enhancing VSCode tasks
- Updating GitHub Actions workflows
- Documenting template features
- Adding new template capabilities

**Knowledge Areas:**
- Tweego compiler
- VSCode integration
- GitHub Actions
- Twine/Sugarcube architecture

### 2. Game Writer

This role focuses on creating game content and narrative.

**File:** `./prompts/game-writer.md`

**Key Responsibilities:**
- Creating engaging story content
- Developing characters and dialogue
- Designing narrative branches and choices
- Writing descriptive passages
- Maintaining narrative consistency

**Knowledge Areas:**
- Storytelling techniques
- Character development
- Dialogue writing
- Interactive fiction conventions
- Twine passage structure

### 3. Web Developer

This role focuses on styling and UI improvements.

**File:** `./prompts/web-developer.md`

**Key Responsibilities:**
- Customizing game appearance
- Creating CSS styles
- Implementing UI enhancements
- Adding visual effects
- Ensuring responsive design

**Knowledge Areas:**
- HTML/CSS
- JavaScript
- Sugarcube styling capabilities
- Web accessibility
- Responsive design

### 4. Game Designer

This role focuses on game mechanics and structure.

**File:** `./prompts/game-designer.md`

**Key Responsibilities:**
- Designing game mechanics
- Creating inventory systems
- Implementing stat tracking
- Balancing gameplay elements
- Designing puzzles and challenges

**Knowledge Areas:**
- Game design principles
- Sugarcube scripting
- Variable management
- State tracking
- Game balance

## Prompt Structure

Each prompt file will follow this general structure:

```markdown
# [Role Name]

## Role Description
[A detailed description of the role and its responsibilities]

## Knowledge Areas
[List of knowledge areas and expertise]

## Instructions
[Specific instructions for the AI when operating in this role]

## Examples
[Examples of tasks the AI might perform in this role]

## References
[References to relevant documentation and resources]
```

## Implementation Plan

1. Create the `./prompts` directory
2. Create each role prompt file with the specified structure
3. Fill in detailed content for each role
4. Test the prompts with AI agents
5. Refine based on testing results

## Usage Instructions

Users will be instructed to:

1. Open the project in VSCode with the Cline extension and Claude
2. Decide which aspect of game development they need help with
3. Copy the content of the appropriate prompt file
4. Paste it to Claude in a new conversation
5. Provide specific instructions for their game

## Next Steps

1. Create detailed content for each role prompt
2. Test the prompts with different AI agents
3. Refine based on user feedback
4. Consider adding more specialized roles as needed