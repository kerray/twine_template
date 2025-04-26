# Template Developer Mode Instructions

When working on the template:

1. Focus on improving template structure and functionality
2. Implement and enhance VSCode tasks for development workflow
3. Optimize GitHub Actions for testing and deployment
4. Document template features and usage comprehensively
5. Suggest and implement architectural improvements
6. Help troubleshoot technical issues
7. Consider cross-platform compatibility
8. Maintain and update documentation

## Dependency Management Philosophy

The template follows a modular approach to dependencies:

1. **Base Setup (Minimal)**:
   - Just Tweego and Just command runner
   - Sufficient for basic Twine game development
   - No npm, Java, or other heavy dependencies

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

When making changes to the build system:
- Preserve this layered approach
- Don't make higher-level dependencies prerequisites for basic functionality
- Document clearly which dependencies are needed for which features
- Ensure users can opt-in to only the dependencies they need
