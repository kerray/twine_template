# Basic Game Template Plan

This document outlines the structure and content of the basic game template that will be created in the `./src` directory.

## Required Files

### StoryTitle.tw

This file defines the title of the game.

```
:: StoryTitle
My Twine Game
```

### StoryData.tw

This file contains metadata about the game.

```
:: StoryData
{
    "ifid": "XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX",
    "format": "SugarCube",
    "format-version": "2.36.1",
    "start": "Start",
    "zoom": 1
}
```

Note: The IFID should be a unique identifier. It can be generated using a UUID generator.

### Start.tw

This is the starting passage of the game.

```
:: Start
# Welcome to My Twine Game

This is the starting point of your adventure.

[[Begin your journey->FirstChoice]]
```

### FirstChoice.tw

A simple example of a choice passage.

```
:: FirstChoice
You find yourself at a crossroads.

[[Go left->LeftPath]]
[[Go right->RightPath]]
[[Go back->Start]]
```

### LeftPath.tw and RightPath.tw

Example destination passages.

```
:: LeftPath
You chose to go left.

[[Return to the crossroads->FirstChoice]]
```

```
:: RightPath
You chose to go right.

[[Return to the crossroads->FirstChoice]]
```

### head.html

This file contains custom HTML to be included in the head section of the compiled game.

```html
<!-- Custom styles -->
<style>
    body {
        font-family: 'Arial', sans-serif;
        background-color: #f0f0f0;
    }
    
    #passages {
        max-width: 800px;
        margin: 0 auto;
    }
    
    .passage {
        background-color: white;
        padding: 2em;
        border-radius: 5px;
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    }
    
    h1 {
        color: #333;
    }
    
    .link-internal {
        color: #0066cc;
    }
    
    .link-internal:hover {
        color: #004499;
        text-decoration: underline;
    }
</style>

<!-- Any additional scripts or meta tags -->
<meta name="description" content="A game created with Twine Template (TwT)">
```

### script.js.tw

This file contains JavaScript code for the game.

```
:: Script [script]
// Game variables
State.variables.visitedStart = true;

// Game functions
window.gameUtils = {
    randomNumber: function(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    },
    
    checkInventory: function(item) {
        return State.variables.inventory && State.variables.inventory.includes(item);
    },
    
    addToInventory: function(item) {
        if (!State.variables.inventory) {
            State.variables.inventory = [];
        }
        if (!State.variables.inventory.includes(item)) {
            State.variables.inventory.push(item);
        }
    },
    
    removeFromInventory: function(item) {
        if (State.variables.inventory) {
            const index = State.variables.inventory.indexOf(item);
            if (index !== -1) {
                State.variables.inventory.splice(index, 1);
            }
        }
    }
};
```

### stylesheet.css.tw

This file contains CSS styles for the game.

```
:: Stylesheet [stylesheet]
/* Additional game-specific styles */
.inventory {
    background-color: #f8f8f8;
    border: 1px solid #ddd;
    padding: 1em;
    margin-bottom: 1em;
    border-radius: 5px;
}

.inventory-title {
    font-weight: bold;
    margin-bottom: 0.5em;
}

.inventory-items {
    list-style-type: none;
    padding-left: 0;
}

.inventory-item {
    margin-bottom: 0.25em;
}

.character-name {
    font-weight: bold;
    color: #0066cc;
}

.location-name {
    font-style: italic;
    color: #666;
}
```

## Directory Structure

```
src/
├── StoryTitle.tw
├── StoryData.tw
├── Start.tw
├── FirstChoice.tw
├── LeftPath.tw
├── RightPath.tw
├── script.js.tw
├── stylesheet.css.tw
├── head.html
└── media/
    └── (empty for now)
```

## Implementation Notes

- Each `.tw` file contains a single passage, making it easier to organize and edit the game.
- The `StoryData.tw` file needs a unique IFID, which should be generated when creating the template.
- The `head.html` file contains custom HTML that will be included in the head section of the compiled game.
- The `script.js.tw` and `stylesheet.css.tw` files use special tags (`[script]` and `[stylesheet]`) to indicate their purpose.
- The basic template includes a simple navigation structure with a few passages to demonstrate how links work.
- The template includes some utility functions for common game mechanics like inventory management.

## Next Steps

1. Create the directory structure
2. Create each of the files with the specified content
3. Generate a unique IFID for the StoryData.tw file
4. Test compilation with the VSCode tasks
5. Verify that the game runs correctly in a browser