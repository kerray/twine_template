# Twine Template (TwT) Development Plan

This document outlines the development plan for the Twine Template project. We'll keep this document precise and current by marking sections as completed and cleaning up once larger units of work are done.

## Phase 1: Project Structure and Basic Setup

- [x] **Directory Structure**
  - [x] Create ./memlog directory for logging plans and completed work
  - [x] Create ./src directory for Twine source files
  - [x] Create ./src/media directory for media files
  - [x] Create ./pub directory for compiled game output
  - [x] Create ./world directory for game world information
  - [x] Create ./prompts directory for AI role prompts
  - [x] Create ./tests directory for template tests

- [x] **Documentation**
  - [x] Create README.md with project overview and usage instructions
  - [x] Organize existing documentation in ./docs
  - [x] Create template usage documentation
  - [x] Document directory structure and purpose

- [ ] **Rewrite .clinerules**
  - [ ] Reorganize .clinerules into logical sections
  - [ ] Complete the Game writing mode section
  - [ ] Add any additional AI roles needed

## Phase 2: Template Development

- [x] **Basic Game Template**
  - [x] Create a minimal working game template in ./src
  - [x] Include essential passages (Start, StoryTitle, etc.)
  - [ ] Add basic CSS styling
  - [ ] Create sample media files

- [x] **VSCode Integration**
  - [x] Plan VSCode tasks for compiling with Tweego (docs/vscode-tasks-plan.md)
  - [x] Plan task for watching file changes and auto-compiling
  - [x] Configure recommended VSCode extensions

- [x] **AI Role Prompts**
  - [x] Plan Template developer mode prompt (docs/ai-role-prompts-plan.md)
  - [x] Plan Game writing mode prompt
  - [x] Plan Web developer mode prompt for styling/UI
  - [x] Plan Game designer mode prompt

## Phase 3: Testing and CI/CD

- [ ] **Testing Framework**
  - [ ] Create basic tests for template functionality
  - [ ] Set up test script to verify compilation works

- [x] **GitHub Actions**
  - [x] Plan workflow for compiling games (docs/github-actions-plan.md)
  - [x] Plan testing in CI pipeline
  - [x] Plan automatic publishing to GitHub Pages

## Phase 4: Documentation and Refinement

- [x] **User Documentation**
  - [x] Create step-by-step guide for using the template (in README.md)
  - [x] Plan how to document template customization
  - [ ] Create examples of different game styles

- [ ] **Template Refinement**
  - [ ] Optimize template based on testing
  - [ ] Add additional features based on feedback
  - [ ] Create sample games demonstrating template capabilities

## Phase 5: World Building Structure

- [x] **World Building Documentation**
  - [x] Plan world building structure (docs/world-building-plan.md)
  - [ ] Create template files for world building
  - [ ] Document how to use world building files

## Immediate Next Steps

1. ✅ Create Plans.md with detailed development plan
2. ✅ Set up a minimal README.md
3. ✅ Document the planned directory structure
4. ✅ Create detailed plans for various components
5. ✅ Create the basic directory structure (src, pub, world, prompts, tests)
6. ✅ Create a basic game template in ./src
7. Implement VSCode tasks for compiling with Tweego
8. Test the basic template compilation

## Definition of Done

For each task to be considered complete:
- Implementation is finished
- Testing is complete and passing
- Documentation is updated
- Work is logged in ./memlog with timestamp

## Completed Planning Work (2025-02-28)

- ✅ Created Plans.md with detailed development plan
- ✅ Created README.md with project overview
- ✅ Created memlog directory and initial log entry
- ✅ Created detailed plans for:
  - ✅ VSCode tasks (docs/vscode-tasks-plan.md)
  - ✅ Basic game template (docs/basic-game-template-plan.md)
  - ✅ GitHub Actions workflow (docs/github-actions-plan.md)
  - ✅ AI role prompts (docs/ai-role-prompts-plan.md)
  - ✅ World building structure (docs/world-building-plan.md)

## Next Implementation Phase

The next phase will involve implementing the plans we've created. The current priorities are:

1. Implement VSCode tasks for compiling with Tweego
2. Add basic CSS styling to the game template
3. Create sample media files
4. Create template files for world building
5. Set up basic tests for template functionality