# VSCode Tasks Plan

This document outlines the planned VSCode tasks for compiling Twine games using Tweego.

## Planned Tasks

### 1. Compile Game

This task will compile all Twine source files in the `./src` directory into a single HTML file in the `./pub` directory.

```json
{
    "label": "Compile Game",
    "type": "shell",
    "command": "${workspaceFolder}/bin/tweego-2.1.1-${platformSpecific}/tweego",
    "args": [
        "-o",
        "${workspaceFolder}/pub/game.html",
        "--head",
        "${workspaceFolder}/src/head.html",
        "-f",
        "sugarcube-2",
        "${workspaceFolder}/src"
    ],
    "group": {
        "kind": "build",
        "isDefault": true
    },
    "presentation": {
        "reveal": "always",
        "panel": "new"
    },
    "problemMatcher": []
}
```

### 2. Watch and Compile

This task will watch for changes in the `./src` directory and automatically recompile the game when files are modified.

```json
{
    "label": "Watch and Compile",
    "type": "shell",
    "command": "${workspaceFolder}/bin/tweego-2.1.1-${platformSpecific}/tweego",
    "args": [
        "-o",
        "${workspaceFolder}/pub/game.html",
        "--head",
        "${workspaceFolder}/src/head.html",
        "-f",
        "sugarcube-2",
        "-w",
        "${workspaceFolder}/src"
    ],
    "isBackground": true,
    "presentation": {
        "reveal": "always",
        "panel": "new"
    },
    "problemMatcher": []
}
```

### 3. Test Compilation

This task will test if the game compiles without errors.

```json
{
    "label": "Test Compilation",
    "type": "shell",
    "command": "${workspaceFolder}/bin/tweego-2.1.1-${platformSpecific}/tweego",
    "args": [
        "-t",
        "-o",
        "${workspaceFolder}/pub/game.html",
        "--head",
        "${workspaceFolder}/src/head.html",
        "-f",
        "sugarcube-2",
        "${workspaceFolder}/src"
    ],
    "presentation": {
        "reveal": "always",
        "panel": "new"
    },
    "problemMatcher": []
}
```

## Implementation Notes

- The `${platformSpecific}` part needs to be replaced with the appropriate platform-specific path (linux-x64, windows-x64, macos-x64, etc.) based on the user's operating system.
- We'll need to create a script or use VSCode variables to determine the correct platform-specific path.
- The `--head` option is used to include custom HTML in the head section of the compiled game. We'll need to create a `head.html` file in the `./src` directory.
- The `-f sugarcube-2` option specifies that we're using the Sugarcube 2 story format.
- The `-w` option in the "Watch and Compile" task enables watching for file changes.
- The `-t` option in the "Test Compilation" task tests compilation without actually writing the output file.

## Next Steps

1. Create the `.vscode/tasks.json` file with these tasks
2. Create a basic `./src/head.html` file
3. Create a script to determine the platform-specific path for Tweego
4. Test the tasks with a basic game template