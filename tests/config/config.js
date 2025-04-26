/**
 * Configuration for Twine Template automated tests
 * This file defines test paths that will be used by the Playwright tests
 */

module.exports = {
  /**
   * Test paths define sequences of actions to test game functionality
   * Each test path has a name and a series of steps
   */
  testPaths: [
    {
      name: "Basic Navigation Example",
      description: "Tests basic navigation through the starting passages",
      steps: [
        {
          description: "Start the game",
          action: "assert",
          text: "The Neural Nest", // Verify we're on the start page
        },
        {
          description: "Click on Whisper Loop link",
          action: "click",
          text: "Enter the Whisper Loop", // Text of the link to click
          expect: "The Whisper Loop" // Text expected after clicking
        },
        {
          description: "Navigate back to Start",
          action: "click",
          text: "Start",
          expect: "The Neural Nest"
        }
      ]
    }
    // Second test path removed as it references content that doesn't exist in the game
  ],

  /**
   * Global test settings
   */
  settings: {
    // Wait time between actions in milliseconds
    defaultWaitTime: 500,
    // Screenshot settings
    screenshots: {
      takeAfterEachStep: false,
      directory: "screenshots"
    }
  }
};