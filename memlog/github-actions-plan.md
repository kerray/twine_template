# GitHub Actions Workflow Plan

This document outlines the planned GitHub Actions workflow for compiling, testing, and deploying Twine games created with this template.

## Workflow Overview

The workflow will:
1. Compile the Twine game using Tweego
2. Run tests to ensure the game compiles without errors
3. Deploy the compiled game to GitHub Pages

## Workflow File

The workflow file will be located at `.github/workflows/build-and-deploy.yml`.

```yaml
name: Build and Deploy

on:
  push:
    branches: [ main ]
  pull_request:
    branches: [ main ]
  workflow_dispatch:

jobs:
  build:
    runs-on: ubuntu-latest
    
    steps:
    - uses: actions/checkout@v3
    
    - name: Set up Tweego
      run: |
        mkdir -p $HOME/tweego
        cp -r bin/tweego-2.1.1-linux-x64/* $HOME/tweego/
        chmod +x $HOME/tweego/tweego
        echo "$HOME/tweego" >> $GITHUB_PATH
    
    - name: Compile Game
      run: |
        tweego -o pub/game.html --head src/head.html -f sugarcube-2 src
    
    - name: Test Compilation
      run: |
        tweego -t -o pub/game.html --head src/head.html -f sugarcube-2 src
    
    - name: Upload Artifact
      uses: actions/upload-artifact@v3
      with:
        name: game
        path: pub/game.html
    
    - name: Deploy to GitHub Pages
      if: github.event_name != 'pull_request'
      uses: JamesIves/github-pages-deploy-action@v4
      with:
        folder: pub
        branch: gh-pages
```

## Implementation Notes

- The workflow runs on pushes to the main branch, pull requests targeting the main branch, and can also be triggered manually.
- It sets up Tweego by copying the Linux version from the repository's bin directory.
- It compiles the game and runs a test compilation to ensure there are no errors.
- It uploads the compiled game as an artifact, which can be downloaded from the GitHub Actions page.
- It deploys the compiled game to GitHub Pages, but only on pushes to the main branch (not on pull requests).

## Additional Considerations

### Multiple Story Formats

If we want to support multiple story formats (not just Sugarcube), we could modify the workflow to compile the game with different formats:

```yaml
- name: Compile Game (Sugarcube)
  run: |
    tweego -o pub/sugarcube/game.html --head src/head.html -f sugarcube-2 src

- name: Compile Game (Harlowe)
  run: |
    tweego -o pub/harlowe/game.html --head src/head.html -f harlowe-3 src
```

### Testing

For more advanced testing, we could add steps to run automated tests on the compiled game:

```yaml
- name: Set up Node.js
  uses: actions/setup-node@v3
  with:
    node-version: '16'

- name: Install Dependencies
  run: |
    npm install

- name: Run Tests
  run: |
    npm test
```

This would require setting up a testing framework and writing tests for the game.

### Custom Domain

If the user wants to deploy the game to a custom domain, they can add a CNAME file to the pub directory:

```yaml
- name: Add CNAME
  if: github.event_name != 'pull_request'
  run: |
    echo "game.example.com" > pub/CNAME
```

## Next Steps

1. Create the `.github/workflows` directory
2. Create the `build-and-deploy.yml` file with the specified content
3. Test the workflow by pushing to the repository
4. Verify that the game is compiled and deployed correctly