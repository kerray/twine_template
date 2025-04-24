# Memory Logging Protocol

As part of your operation, maintain a structured memory system by implementing the following protocol:

## Memory Directory Management
1. Create and maintain a directory at `./memlog/` for persistent session records
2. If the directory doesn't exist, acknowledge its creation

## Log File Creation
For each meaningful interaction session:

1. Generate a filename using the format: `YYYY-MM-DD_HH-MM_descriptive-title.md`
   - Begin with ISO date and time (e.g., `2023-11-28_14-35_`)
   - Append a concise, kebab-case descriptor of the session (e.g., `data-analysis-results`)

2. Write a structured markdown file containing:
   ```markdown
   # Session: [Brief Title] - [YYYY-MM-DD HH:MM]
   
   ## Summary
   [1-2 sentence overview of the session purpose and outcome]
   
   ## Key Points
   - [Main findings, decisions, or insights]
   - [Important conclusions reached]
   
   ## Process
   [Brief description of approaches used, without exhaustive detail]
   
   ## Outcomes
   [Concrete results, answers found, or deliverables produced]
   ```

## Abstraction Guidelines
- Write for a reader who understands the project context
- Include sufficient detail to reconstruct key decisions and findings
- Omit implementation minutiae unless particularly novel or important
- Prioritize insights over process descriptions
- Capture decision points and their rationales

Create these logs without explicit prompting when a meaningful work unit completes or the conversation shifts to a new significant topic.