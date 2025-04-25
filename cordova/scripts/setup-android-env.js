#!/usr/bin/env node
const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');
const os = require('os');
const https = require('https');

// Check and install JDK if needed
async function ensureJdk17() {
  try {
    // Check current Java version
    try {
      const javaVersion = execSync('java -version 2>&1').toString();
      const versionMatch = javaVersion.match(/version "(\d+)/);
      if (versionMatch) {
        const majorVersion = parseInt(versionMatch[1]);
        if (majorVersion >= 17) {
          console.log('JDK 17 or later is already installed.');
          return;
        }
      }
    } catch (error) {
      // Java not installed
    }

    console.log('Installing JDK 17...');

    if (isWindows) {
      // For Windows, download OpenJDK and set JAVA_HOME
      const jdkUrl = 'https://download.java.net/java/GA/jdk17.0.2/dfd4a8d0985749f896bed50d7138ee7f/8/GPL/openjdk-17.0.2_windows-x64_bin.zip';
      const jdkZip = path.join(os.tmpdir(), 'jdk17.zip');
      const jdkDir = path.join(os.homedir(), 'jdk-17.0.2');

      await downloadFile(jdkUrl, jdkZip);
      execSync(`powershell -command "Expand-Archive -Path '${jdkZip}' -DestinationPath '${os.homedir()}'"`, { stdio: 'inherit' });
      process.env.JAVA_HOME = jdkDir;
      process.env.PATH = `${path.join(jdkDir, 'bin')}${path.delimiter}${process.env.PATH}`;

    } else if (isLinux) {
      // For Linux, use apt
      execSync('sudo apt-get update', { stdio: 'inherit' });
      execSync('sudo apt-get install -y openjdk-17-jdk', { stdio: 'inherit' });

    } else if (isMac) {
      // For macOS, use Homebrew
      try {
        execSync('brew --version', { stdio: 'ignore' });
      } catch {
        execSync('/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"', { stdio: 'inherit' });
      }
      execSync('brew install openjdk@17', { stdio: 'inherit' });
      execSync('sudo ln -sfn $(brew --prefix)/opt/openjdk@17/libexec/openjdk.jdk /Library/Java/JavaVirtualMachines/openjdk-17.jdk', { stdio: 'inherit' });
    }

    // Verify installation
    const newJavaVersion = execSync('java -version 2>&1').toString();
    console.log('Installed Java version:', newJavaVersion.split('\n')[0]);

  } catch (error) {
    if (!process.env.SKIP_JDK_VERSION_CHECK) {
      console.error('Error installing JDK 17:', error.message);
      console.error('Please install JDK 17 manually or set SKIP_JDK_VERSION_CHECK to proceed.');
      process.exit(1);
    } else {
      console.warn('Warning: Proceeding despite JDK installation failure (SKIP_JDK_VERSION_CHECK is set)');
    }
  }
}

// Helper function to download files
async function downloadFile(url, dest) {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(dest);
    https.get(url, (response) => {
      response.pipe(file);
      file.on('finish', () => {
        file.close();
        resolve();
      });
    }).on('error', (err) => {
      fs.unlink(dest, () => reject(err));
    });
  });
}

// Determine OS
const platform = process.platform;
const isWindows = platform === 'win32';
const isMac = platform === 'darwin';
const isLinux = platform === 'linux';

// Paths
const homeDir = os.homedir();
const androidSdkDir = path.join(homeDir, isWindows ? 'Android' : 'android-sdk');
const cmdlineToolsDir = path.join(androidSdkDir, 'cmdline-tools');
const latestDir = path.join(cmdlineToolsDir, 'latest');
const binDir = path.join(latestDir, 'bin');

// Download URLs
const cmdlineToolsUrl = {
  win32: 'https://dl.google.com/android/repository/commandlinetools-win-10406996_latest.zip',
  darwin: 'https://dl.google.com/android/repository/commandlinetools-mac-10406996_latest.zip',
  linux: 'https://dl.google.com/android/repository/commandlinetools-linux-10406996_latest.zip'
};

// Create necessary directories
function createDirectories() {
  console.log('Creating directories...');
  fs.mkdirSync(androidSdkDir, { recursive: true });
  fs.mkdirSync(cmdlineToolsDir, { recursive: true });
}

// Download and extract Android command-line tools
async function downloadAndExtractTools() {
  console.log('Downloading Android command-line tools...');
  const url = cmdlineToolsUrl[platform];
  const zipPath = path.join(androidSdkDir, 'cmdline-tools.zip');
  
  // Download
  await new Promise((resolve, reject) => {
    https.get(url, (response) => {
      const file = fs.createWriteStream(zipPath);
      response.pipe(file);
      file.on('finish', () => {
        file.close();
        resolve();
      });
    }).on('error', reject);
  });

  console.log('Extracting Android command-line tools...');
  if (isWindows) {
    execSync(`powershell -command "Expand-Archive -Path '${zipPath}' -DestinationPath '${cmdlineToolsDir}'"`, { stdio: 'inherit' });
  } else {
    execSync(`unzip -q "${zipPath}" -d "${cmdlineToolsDir}"`, { stdio: 'inherit' });
  }

  // Rename cmdline-tools directory to 'latest'
  const extractedDir = path.join(cmdlineToolsDir, 'cmdline-tools');
  if (fs.existsSync(extractedDir)) {
    fs.renameSync(extractedDir, latestDir);
  }

  // Clean up
  fs.unlinkSync(zipPath);
}

// Accept Android SDK licenses
function acceptLicenses() {
  console.log('Accepting Android SDK licenses...');
  const sdkmanager = path.join(binDir, isWindows ? 'sdkmanager.bat' : 'sdkmanager');
  execSync(`echo y | "${sdkmanager}" --licenses`, { stdio: 'inherit' });
}

// Install required Android SDK packages
function installSdkPackages() {
  console.log('Installing Android SDK packages...');
  const sdkmanager = path.join(binDir, isWindows ? 'sdkmanager.bat' : 'sdkmanager');
  const packages = [
    'platform-tools',
    'platforms;android-34',
    'build-tools;34.0.0'
  ];
  
  for (const pkg of packages) {
    console.log(`Installing ${pkg}...`);
    execSync(`"${sdkmanager}" "${pkg}"`, { stdio: 'inherit' });
  }
}

// Set environment variables
function setEnvironmentVariables() {
  console.log('Setting environment variables...');
  
  const envFile = path.join(process.cwd(), '.env');
  const envVars = {
    ANDROID_HOME: androidSdkDir,
    ANDROID_SDK_ROOT: androidSdkDir,
    PATH: `${binDir}${path.delimiter}${path.join(androidSdkDir, 'platform-tools')}${path.delimiter}${process.env.PATH}`
  };

  let envContent = '';
  for (const [key, value] of Object.entries(envVars)) {
    envContent += `${key}=${value}\n`;
  }
  
  fs.writeFileSync(envFile, envContent);
  
  console.log('\nEnvironment variables have been set in .env file.');
  console.log('Please add the following to your shell configuration file:');
  console.log('\nFor bash/zsh (~/.bashrc or ~/.zshrc):');
  console.log('export ANDROID_HOME=' + androidSdkDir);
  console.log('export ANDROID_SDK_ROOT=' + androidSdkDir);
  console.log(`export PATH="${binDir}:${path.join(androidSdkDir, 'platform-tools')}:$PATH"`);
  
  if (isWindows) {
    console.log('\nFor Windows, set these environment variables in System Properties > Advanced > Environment Variables');
  }
}

// Main setup function
async function setup() {
  try {
    await ensureJdk17();
    createDirectories();
    await downloadAndExtractTools();
    acceptLicenses();
    installSdkPackages();
    setEnvironmentVariables();
    console.log('\nAndroid development environment setup completed successfully!');
  } catch (error) {
    console.error('Error setting up Android development environment:', error);
    process.exit(1);
  }
}

// Run setup
setup();
