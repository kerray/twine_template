# Twine Template (TwT) justfile
# This justfile provides standardized commands for building and deploying Twine games made with (TwT)
# It's used by both VSCode tasks and GitHub Actions

# Load .env file if it exists
set dotenv-load

# Default variables - can be overridden by .env
OUTPUT_DIR := "dist"
SRC_DIR := "src"
TWEEGO_VERSION := env_var_or_default("TWEEGO_VERSION", "2.1.1")
SUGARCUBE_VERSION := env_var_or_default("SUGARCUBE_VERSION", "2.37.3")
STORY_FORMAT := "sugarcube-2-" + replace(SUGARCUBE_VERSION, ".", "-")

# Detect OS for proper Tweego binary selection
TWEEGO_PATH := if os() == "windows" {
  "bin/tweego-" + TWEEGO_VERSION + "-windows-x64"
} else if os() == "macos" {
  "bin/tweego-" + TWEEGO_VERSION + "-macos-x64"
} else {
  "bin/tweego-" + TWEEGO_VERSION + "-linux-x64"
}

TWEEGO_BIN := if os() == "windows" {
  TWEEGO_PATH + "/tweego.exe"
} else {
  TWEEGO_PATH + "/tweego"
}

# Default recipe - shows help
default:
  @echo "Available recipes:"
  @echo "Run './just <recipe>' to execute a recipe"
  @./just --list

# Ensure output directory exists
_ensure-output-dir:
  mkdir -p {{OUTPUT_DIR}}

# Download Just command runner
download-just:
  @echo "Downloading Just..."
  chmod +x ./scripts/download-just.sh
  ./scripts/download-just.sh
  @echo "Just downloaded!"

# Download Tweego compiler
download-tweego:
  @echo "Downloading Tweego..."
  chmod +x ./scripts/download-tweego.sh
  ./scripts/download-tweego.sh
  @echo "Tweego downloaded!"

# Download Sugarcube storyformat
download-sugarcube:
  @echo "Downloading Sugarcube..."
  chmod +x ./scripts/download-sugarcube.sh
  ./scripts/download-sugarcube.sh
  @echo "Sugarcube downloaded!"

# Install all dependencies
install-deps: download-just download-tweego download-sugarcube
  @echo "Installing dependencies..."
  chmod +x ./scripts/install-dependencies.sh
  ./scripts/install-dependencies.sh
  @echo "Dependencies installed!"

# Install all dependencies including test dependencies
install-all: install-deps
  @echo "Installing test dependencies..."
  just install-tests
  @echo "All dependencies installed!"

# Compile the game
compile: _ensure-output-dir
  @echo "Compiling game..."
  {{TWEEGO_BIN}} -o {{OUTPUT_DIR}}/index.html -f {{STORY_FORMAT}} {{SRC_DIR}}
  @echo "Game compiled successfully: {{OUTPUT_DIR}}/index.html"

# Watch for changes and recompile
watch: _ensure-output-dir
  @echo "Watching for changes in {{SRC_DIR}}..."
  @echo "Press Ctrl+C to stop watching"
  {{TWEEGO_BIN}} -o {{OUTPUT_DIR}}/index.html -f {{STORY_FORMAT}} -w {{SRC_DIR}}

# Clean output directory
clean:
  @echo "Cleaning output directory: {{OUTPUT_DIR}}"
  rm -rf {{OUTPUT_DIR}}/*
  @echo "Done!"

# Cordova targets
# Initialize Cordova project
cordova-init: compile
  @echo "Initializing Cordova project..."
  mkdir -p cordova/www
  cp {{OUTPUT_DIR}}/index.html cordova/www/index.html
  node cordova/scripts/init-cordova.js
  @echo "Cordova project initialized!"

# Generate Cordova resources
cordova-resources:
  @echo "Generating Cordova resources..."
  node cordova/scripts/create-resources.js
  node cordova/scripts/generate-resources.js
  @echo "Cordova resources generated!"

# Add and build Android platform
cordova-android: cordova-init cordova-resources
  @echo "Building Android app..."
  node cordova/scripts/setup-android-env.js
  node cordova/scripts/add-platforms.js android
  node cordova/scripts/build-android.js
  @echo "Android app built!"

# Add and build iOS platform
cordova-ios: cordova-init cordova-resources
  @echo "Building iOS app..."
  node cordova/scripts/add-platforms.js ios
  node cordova/scripts/build-ios.js
  @echo "iOS app built!"

# Add and build Windows platform
cordova-windows: cordova-init cordova-resources
  @echo "Building Windows app..."
  node cordova/scripts/add-platforms.js windows
  node cordova/scripts/build-windows.js
  @echo "Windows app built!"

# Add and build Browser platform
cordova-browser: cordova-init
  @echo "Building Browser app..."
  node cordova/scripts/add-platforms.js browser
  node cordova/scripts/build-browser.js
  @echo "Browser app built!"

# Setup Android development environment
setup-android:
  @echo "Setting up Android development environment..."
  node cordova/scripts/setup-android-env.js
  @echo "Android development environment set up!"

# Test targets
# Install test dependencies
install-tests:
  @echo "Installing test dependencies..."
  cd tests && chmod +x ./install-tests.sh && ./install-tests.sh
  @echo "Test dependencies installed!"

# Run tests
test: compile
  @echo "Running tests..."
  cd tests && npm test
  @echo "Tests completed!"

# Run tests with UI
test-ui: compile
  @echo "Running tests with UI..."
  cd tests && npm run test:ui
  @echo "Tests completed!"

# Run tests in debug mode
test-debug: compile
  @echo "Running tests in debug mode..."
  cd tests && npm run test:debug
  @echo "Tests completed!"

# Generate test report
test-report:
  @echo "Generating test report..."
  cd tests && npm run report
  @echo "Test report generated in tests/test-report.md"