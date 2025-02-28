# Twine Mobile and Desktop Optimizations (2025-02-28)

This document outlines the necessary modifications to the Twine template to ensure optimal performance and user experience when deployed as native applications on mobile and desktop platforms using Apache Cordova.

## HTML Structure Modifications

### 1. Viewport Configuration

Add the following meta tag to ensure proper scaling on mobile devices. This should be added to the `StoryData.tw` file:

```html
<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
```

### 2. Mobile Web App Capabilities

Add the following meta tags to enable web app capabilities:

```html
<meta name="apple-mobile-web-app-capable" content="yes">
<meta name="mobile-web-app-capable" content="yes">
```

## CSS Modifications

The following CSS modifications should be added to `StoryStylesheet.tw`:

### 1. Responsive Design

```css
/* Base responsive design */
body {
  font-size: 16px; /* Base font size */
  line-height: 1.5;
  touch-action: manipulation; /* Improves touch responsiveness */
  -webkit-text-size-adjust: 100%; /* Prevents iOS from adjusting font sizes */
}

/* Media queries for different screen sizes */
@media screen and (max-width: 480px) {
  body {
    font-size: 14px;
  }
  
  #ui-bar {
    font-size: 0.9em;
  }
  
  #passages {
    margin: 0.5em;
  }
  
  .passage {
    padding: 1em;
  }
}

/* Improve touch targets */
button, .link-internal, .link-external {
  min-height: 44px; /* Minimum touch target size */
  min-width: 44px;
  padding: 0.5em 1em;
  margin: 0.25em 0;
  display: inline-block;
}

/* Prevent text selection on interactive elements */
button, .link-internal, .link-external {
  -webkit-touch-callout: none;
  -webkit-user-select: none;
  user-select: none;
}
```

### 2. Orientation Handling

```css
/* Portrait orientation */
@media screen and (orientation: portrait) {
  /* Portrait-specific styles */
  #ui-bar {
    width: 15em; /* Narrower sidebar in portrait */
  }
}

/* Landscape orientation */
@media screen and (orientation: landscape) {
  /* Landscape-specific styles */
  #ui-bar {
    width: 20em; /* Wider sidebar in landscape */
  }
}
```

### 3. Platform-Specific Styling

```css
/* iOS-specific styles */
.ios {
  /* iOS-specific styles */
  font-family: -apple-system, BlinkMacSystemFont, sans-serif;
}

/* Android-specific styles */
.android {
  /* Android-specific styles */
  font-family: Roboto, sans-serif;
}

/* Windows-specific styles */
.windows {
  /* Windows-specific styles */
  font-family: "Segoe UI", sans-serif;
}
```

## JavaScript Modifications

The following JavaScript should be added to `StoryScript.tw`:

### 1. Platform Detection

```javascript
// Platform detection
$(document).ready(function() {
  // Detect platform and add appropriate class to body
  function detectPlatform() {
    const userAgent = navigator.userAgent || navigator.vendor || window.opera;
    
    if (/windows phone/i.test(userAgent) || /windows/i.test(userAgent)) {
      $('body').addClass('windows');
      return 'windows';
    }
    
    if (/android/i.test(userAgent)) {
      $('body').addClass('android');
      return 'android';
    }
    
    if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) {
      $('body').addClass('ios');
      return 'ios';
    }
    
    return 'unknown';
  }
  
  // Store the platform for later use
  window.currentPlatform = detectPlatform();
  
  // Log the detected platform
  console.log('Detected platform:', window.currentPlatform);
});
```

### 2. Mobile Event Handling

```javascript
// Mobile event handling
$(document).ready(function() {
  // Handle back button on Android
  document.addEventListener('backbutton', function(e) {
    e.preventDefault();
    
    // If we can go back in story history, do so
    if (State.length > 1) {
      Engine.backward();
    } else {
      // Otherwise, show a confirmation dialog to exit the app
      if (window.confirm('Are you sure you want to exit the game?')) {
        navigator.app && navigator.app.exitApp();
      }
    }
  }, false);
  
  // Handle device pause/resume
  document.addEventListener('pause', function() {
    // Auto-save game state when app is paused
    if (Save.ok()) {
      Save.slots.save(0, 'Auto-save on pause');
      console.log('Game auto-saved on pause');
    }
  }, false);
  
  document.addEventListener('resume', function() {
    // Refresh UI when app is resumed
    console.log('App resumed');
  }, false);
  
  // Handle orientation changes
  window.addEventListener('orientationchange', function() {
    // Refresh UI when orientation changes
    console.log('Orientation changed');
  }, false);
});
```

### 3. Touch Optimizations

```javascript
// Touch optimizations
$(document).ready(function() {
  // Remove 300ms tap delay
  if ('ontouchstart' in window) {
    // Add touch-device class to body
    $('body').addClass('touch-device');
    
    // Use FastClick if available
    if (typeof FastClick !== 'undefined') {
      FastClick.attach(document.body);
    }
  }
  
  // Improve scrolling performance
  const scrollElements = document.querySelectorAll('#passages');
  scrollElements.forEach(function(el) {
    el.style.webkitOverflowScrolling = 'touch';
  });
});
```

### 4. Offline Support

```javascript
// Offline support
$(document).ready(function() {
  // Check if we're running in Cordova
  const isCordova = !!window.cordova;
  
  if (isCordova) {
    // Add cordova-app class to body
    $('body').addClass('cordova-app');
    
    // Wait for device ready event
    document.addEventListener('deviceready', onDeviceReady, false);
  } else {
    // We're in a browser, initialize anyway
    onDeviceReady();
  }
  
  function onDeviceReady() {
    console.log('Device ready');
    
    // Handle online/offline events
    document.addEventListener('online', function() {
      console.log('Device is online');
      $('body').removeClass('offline').addClass('online');
    }, false);
    
    document.addEventListener('offline', function() {
      console.log('Device is offline');
      $('body').removeClass('online').addClass('offline');
    }, false);
    
    // Check initial connection state
    if (navigator.connection && navigator.connection.type === Connection.NONE) {
      $('body').removeClass('online').addClass('offline');
    } else {
      $('body').removeClass('offline').addClass('online');
    }
  }
});
```

### 5. Save Game Enhancements

```javascript
// Save game enhancements for mobile
$(document).ready(function() {
  // Auto-save on passage navigation
  $(document).on(':passagedisplay', function() {
    // Auto-save in slot 0 after each passage
    if (Save.ok()) {
      Save.slots.save(0, 'Auto-save');
    }
  });
  
  // Export save data function (useful for backing up saves)
  window.exportSaveData = function() {
    if (!Save.ok()) {
      return alert('Save functionality is not available.');
    }
    
    try {
      const saveData = {};
      
      // Get all save slots
      for (let i = 0; i < Save.slots.length; i++) {
        const save = Save.slots.get(i);
        if (save) {
          saveData[`slot${i}`] = save;
        }
      }
      
      // Convert to JSON string
      const saveDataString = JSON.stringify(saveData);
      
      // Create a data URI
      const dataUri = 'data:text/json;charset=utf-8,' + encodeURIComponent(saveDataString);
      
      // Create a download link
      const a = document.createElement('a');
      a.href = dataUri;
      a.download = `twine-game-save-${new Date().toISOString().slice(0, 10)}.json`;
      a.click();
      
      return true;
    } catch (e) {
      console.error('Failed to export save data:', e);
      alert('Failed to export save data: ' + e.message);
      return false;
    }
  };
  
  // Import save data function
  window.importSaveData = function(jsonString) {
    if (!Save.ok()) {
      return alert('Save functionality is not available.');
    }
    
    try {
      const saveData = JSON.parse(jsonString);
      
      // Restore all save slots
      for (const key in saveData) {
        if (key.startsWith('slot')) {
          const slotNum = parseInt(key.replace('slot', ''), 10);
          Save.slots.save(slotNum, saveData[key].title, saveData[key].data);
        }
      }
      
      alert('Save data imported successfully!');
      return true;
    } catch (e) {
      console.error('Failed to import save data:', e);
      alert('Failed to import save data: ' + e.message);
      return false;
    }
  };
});
```

## Special Passages

The following special passages should be added to `SpecialPassages.tw`:

### 1. StoryMobileInit

```
:: StoryMobileInit [script]
// This passage runs when the story is first loaded on mobile devices
$(document).ready(function() {
  // Check if we're running in a Cordova app
  if (window.cordova) {
    console.log('Running in Cordova app');
    
    // Add any mobile-specific initialization here
    
    // Example: Hide splash screen after a delay
    if (navigator.splashscreen) {
      setTimeout(function() {
        navigator.splashscreen.hide();
      }, 1000);
    }
    
    // Example: Set status bar style
    if (window.StatusBar) {
      StatusBar.styleDefault();
      StatusBar.overlaysWebView(false);
    }
  }
});
```

### 2. MobileSettings

```
:: MobileSettings [nobr]
<h1>Mobile Settings</h1>

<div class="mobile-settings">
  <h2>Display</h2>
  
  <label>
    Font Size:
    <select id="font-size-setting">
      <option value="small">Small</option>
      <option value="medium" selected>Medium</option>
      <option value="large">Large</option>
      <option value="x-large">Extra Large</option>
    </select>
  </label>
  
  <label>
    Theme:
    <select id="theme-setting">
      <option value="light" selected>Light</option>
      <option value="dark">Dark</option>
      <option value="sepia">Sepia</option>
    </select>
  </label>
  
  <h2>Saves</h2>
  
  <button id="export-saves-btn">Export Save Data</button>
  <button id="import-saves-btn">Import Save Data</button>
  
  <div id="import-save-container" style="display: none;">
    <textarea id="import-save-data" rows="5" placeholder="Paste save data JSON here"></textarea>
    <button id="confirm-import-btn">Confirm Import</button>
    <button id="cancel-import-btn">Cancel</button>
  </div>
</div>

<script>
  // Font size setting
  $('#font-size-setting').on('change', function() {
    const fontSize = $(this).val();
    $('body').removeClass('font-small font-medium font-large font-x-large')
             .addClass('font-' + fontSize);
    
    // Save setting
    if (window.localStorage) {
      localStorage.setItem('twine-font-size', fontSize);
    }
  });
  
  // Theme setting
  $('#theme-setting').on('change', function() {
    const theme = $(this).val();
    $('body').removeClass('theme-light theme-dark theme-sepia')
             .addClass('theme-' + theme);
    
    // Save setting
    if (window.localStorage) {
      localStorage.setItem('twine-theme', theme);
    }
  });
  
  // Export saves
  $('#export-saves-btn').on('click', function() {
    window.exportSaveData();
  });
  
  // Import saves
  $('#import-saves-btn').on('click', function() {
    $('#import-save-container').show();
  });
  
  $('#confirm-import-btn').on('click', function() {
    const jsonData = $('#import-save-data').val();
    window.importSaveData(jsonData);
    $('#import-save-container').hide();
  });
  
  $('#cancel-import-btn').on('click', function() {
    $('#import-save-container').hide();
  });
  
  // Load saved settings
  $(document).ready(function() {
    if (window.localStorage) {
      // Load font size
      const savedFontSize = localStorage.getItem('twine-font-size');
      if (savedFontSize) {
        $('#font-size-setting').val(savedFontSize);
        $('body').addClass('font-' + savedFontSize);
      } else {
        $('body').addClass('font-medium');
      }
      
      // Load theme
      const savedTheme = localStorage.getItem('twine-theme');
      if (savedTheme) {
        $('#theme-setting').val(savedTheme);
        $('body').addClass('theme-' + savedTheme);
      } else {
        $('body').addClass('theme-light');
      }
    }
  });
</script>
```

## Additional CSS for Themes and Font Sizes

Add the following CSS to `StoryStylesheet.tw`:

```css
/* Font size classes */
body.font-small {
  font-size: 14px;
}

body.font-medium {
  font-size: 16px;
}

body.font-large {
  font-size: 18px;
}

body.font-x-large {
  font-size: 20px;
}

/* Theme classes */
body.theme-light {
  background-color: #ffffff;
  color: #333333;
}

body.theme-dark {
  background-color: #222222;
  color: #e0e0e0;
}

body.theme-dark a {
  color: #8cb4ff;
}

body.theme-dark #ui-bar {
  background-color: #333333;
  border-color: #444444;
}

body.theme-sepia {
  background-color: #f8f0e0;
  color: #5b4636;
}

body.theme-sepia a {
  color: #8b6b4a;
}

body.theme-sepia #ui-bar {
  background-color: #efe6d5;
  border-color: #d8cbb8;
}

/* Mobile settings styling */
.mobile-settings {
  max-width: 600px;
  margin: 0 auto;
}

.mobile-settings label {
  display: block;
  margin: 1em 0;
}

.mobile-settings select, 
.mobile-settings button {
  display: block;
  width: 100%;
  padding: 0.5em;
  margin: 0.5em 0;
  font-size: 1em;
}

.mobile-settings h2 {
  margin-top: 1.5em;
  border-bottom: 1px solid #ccc;
  padding-bottom: 0.3em;
}

#import-save-data {
  width: 100%;
  margin: 1em 0;
}
```

## Performance Optimizations

### 1. Image Optimization

Add the following to `StoryScript.tw`:

```javascript
// Lazy load images
$(document).ready(function() {
  // Function to lazy load images
  function lazyLoadImages() {
    // Find all images with data-src attribute
    $('img[data-src]').each(function() {
      const img = $(this);
      
      // Check if the image is in viewport
      if (isElementInViewport(this)) {
        // Replace src with data-src
        img.attr('src', img.attr('data-src'));
        // Remove data-src attribute
        img.removeAttr('data-src');
      }
    });
  }
  
  // Helper function to check if element is in viewport
  function isElementInViewport(el) {
    const rect = el.getBoundingClientRect();
    return (
      rect.top >= 0 &&
      rect.left >= 0 &&
      rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
      rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
  }
  
  // Run on passage display
  $(document).on(':passagedisplay', lazyLoadImages);
  
  // Run on scroll (debounced)
  let scrollTimeout;
  $(window).on('scroll', function() {
    clearTimeout(scrollTimeout);
    scrollTimeout = setTimeout(lazyLoadImages, 200);
  });
});
```

### 2. Animation Optimization

Add the following to `StoryStylesheet.tw`:

```css
/* Optimize animations for mobile */
@media screen and (max-width: 768px) {
  /* Use transform instead of left/top for animations */
  .transition-in {
    transform: translateX(0) !important;
    opacity: 1 !important;
  }
  
  .transition-out {
    transform: translateX(-20px) !important;
    opacity: 0 !important;
  }
  
  /* Hardware acceleration for smoother animations */
  .passage {
    transform: translateZ(0);
    backface-visibility: hidden;
    perspective: 1000px;
  }
}
```

## Testing Recommendations

To ensure the Twine game works well on mobile and desktop platforms, test the following:

1. **Responsive Design**
   - Test on various screen sizes and orientations
   - Verify text is readable and UI elements are properly sized

2. **Touch Interaction**
   - Verify all interactive elements are easy to tap
   - Test swipe gestures if implemented
   - Ensure no double-tap zoom issues

3. **Performance**
   - Check for smooth scrolling and animations
   - Monitor memory usage for larger games
   - Test on lower-end devices

4. **Platform-Specific Features**
   - Test back button behavior on Android
   - Verify status bar appearance on iOS
   - Check Windows-specific UI elements

5. **Offline Functionality**
   - Test the game with no internet connection
   - Verify save/load functionality works offline

6. **App Lifecycle**
   - Test app behavior when paused/resumed
   - Verify state is preserved when app is backgrounded

## Implementation Checklist

- [ ] Add viewport meta tags to StoryData.tw
- [ ] Add responsive CSS to StoryStylesheet.tw
- [ ] Add platform detection JavaScript to StoryScript.tw
- [ ] Add mobile event handling to StoryScript.tw
- [ ] Add touch optimizations to StoryScript.tw
- [ ] Add offline support to StoryScript.tw
- [ ] Add save game enhancements to StoryScript.tw
- [ ] Add StoryMobileInit special passage
- [ ] Add MobileSettings special passage
- [ ] Add theme and font size CSS
- [ ] Add performance optimizations
- [ ] Test on various devices and platforms

By implementing these modifications, the Twine template will be well-optimized for deployment as native applications on mobile and desktop platforms using Apache Cordova.