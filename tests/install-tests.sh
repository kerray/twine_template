#!/bin/bash

# Script to install Playwright test dependencies

echo "Installing Playwright test dependencies..."

# Check if npm is installed
if ! command -v npm &> /dev/null; then
    echo "Error: npm is not installed. Please install Node.js and npm first."
    exit 1
fi

# Install npm dependencies
echo "Installing npm dependencies..."
npm install

# Install Playwright browsers with dependencies
echo "Installing Playwright browsers and system dependencies..."
npx playwright install --with-deps

# Explicitly run install-deps to ensure all system dependencies are installed
echo "Installing additional system dependencies..."
npx playwright install-deps

echo "Playwright test dependencies installed successfully!"
echo "You can now run tests using: npm test"