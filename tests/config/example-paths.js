/**
 * Example test paths for Twine Template
 * This file provides examples of different test path configurations
 * that can be used as templates for creating your own test paths.
 */

module.exports = {
  /**
   * Example test paths demonstrating different testing scenarios
   */
  examplePaths: [
    {
      name: "Linear Story Path",
      description: "Tests a simple linear path through the story",
      steps: [
        {
          description: "Start the game",
          action: "assert",
          text: "Start", 
        },
        {
          description: "Click on first choice",
          action: "click",
          text: "Begin your journey",
          expect: "You have chosen to begin your journey"
        },
        {
          description: "Continue to next passage",
          action: "click",
          text: "Continue",
          expect: "The next part of your adventure"
        }
      ]
    },
    {
      name: "Inventory Management",
      description: "Tests picking up, examining and using items",
      steps: [
        {
          description: "Start the game",
          action: "assert",
          text: "Start",
        },
        {
          description: "Go to the room with items",
          action: "click",
          text: "Enter the library",
        },
        {
          description: "Pick up an item",
          action: "click",
          text: "Take the ancient book",
          expect: "You now have the ancient book"
        },
        {
          description: "Open inventory",
          action: "click",
          selector: "#ui-bar-toggle",
        },
        {
          description: "Examine the item",
          action: "click",
          text: "Ancient book",
          expect: "The book appears to be written in a strange language"
        },
        {
          description: "Use the item",
          action: "click",
          text: "Read the book",
          expect: "As you read the words, you feel a strange power"
        }
      ]
    },
    {
      name: "Variable Testing",
      description: "Tests game variables and state changes",
      steps: [
        {
          description: "Start the game",
          action: "assert",
          text: "Start",
        },
        {
          description: "Choose character type",
          action: "click",
          text: "Play as a wizard",
          expect: "You are now a wizard"
        },
        {
          description: "Check for wizard-specific option",
          action: "assert",
          text: "Cast a spell",
        },
        {
          description: "Cast spell",
          action: "click",
          text: "Cast a spell",
          expect: "The spell illuminates the room"
        },
        {
          description: "Check for increased magic stat",
          action: "assert",
          text: "Magic: 2",
        }
      ]
    },
    {
      name: "Form Input Testing",
      description: "Tests form inputs and custom player choices",
      steps: [
        {
          description: "Start the game",
          action: "assert",
          text: "Start",
        },
        {
          description: "Go to character creation",
          action: "click",
          text: "Create your character",
        },
        {
          description: "Enter character name",
          action: "input",
          selector: "#character-name",
          value: "Tester McTestface",
        },
        {
          description: "Select character class",
          action: "click",
          text: "Rogue",
        },
        {
          description: "Confirm choices",
          action: "click",
          text: "Begin Adventure",
          expect: "Welcome, Tester McTestface the Rogue"
        }
      ]
    },
    {
      name: "Timed Events Testing",
      description: "Tests passages with timed events",
      steps: [
        {
          description: "Start the game",
          action: "assert",
          text: "Start",
        },
        {
          description: "Go to timed event passage",
          action: "click",
          text: "Enter the unstable cave",
        },
        {
          description: "Wait for cave rumbling",
          action: "wait",
          duration: 3000,
        },
        {
          description: "Check for cave rumbling text",
          action: "assert",
          text: "The cave begins to rumble",
        },
        {
          description: "Quickly escape",
          action: "click",
          text: "Run for the exit",
          expect: "You escaped just in time"
        }
      ]
    }
  ],

  /**
   * Helper function to import these example paths into your config
   * @param {number} index - Optional index of specific example to import
   * @returns {Array} Array of example test paths
   */
  getExamplePath: function(index) {
    if (index !== undefined && index >= 0 && index < this.examplePaths.length) {
      return [this.examplePaths[index]];
    }
    return this.examplePaths;
  }
};