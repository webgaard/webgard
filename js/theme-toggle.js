/* =============================
   THEME TOGGLE SCRIPT
   Author: Webgard Team
   Description: Handles dark/light theme switching with localStorage persistence
   ============================= */


/**
 * Initialize theme toggle functionality on DOM content loaded
 */
document.addEventListener('DOMContentLoaded', function () {

  // Get DOM element references
  const themeToggleButton = document.getElementById('themeToggle');
  const darkLabel = document.querySelector('[data-theme-label="dark"]');
  const lightLabel = document.querySelector('[data-theme-label="light"]');
  const root = document.documentElement;

  // Read initial theme from localStorage, default to 'dark' if not set
  let currentTheme = localStorage.getItem('theme') || 'dark';


  /**
   * Apply the specified theme to the page
   * @param {string} theme - The theme to apply ('dark' or 'light')
   */
  function applyTheme(theme) {

    if (theme === 'dark') {
      // Apply dark theme
      root.setAttribute('data-theme', 'dark');

      // Update active label styles
      if (darkLabel && lightLabel) {
        darkLabel.classList.add('theme-label--active');
        lightLabel.classList.remove('theme-label--active');
      }

      // Update accessible label
      if (themeToggleButton) {
        themeToggleButton.setAttribute('aria-label', 'Switch to light theme');
        themeToggleButton.setAttribute('data-current-theme', 'dark');
      }
    } else {
      // Apply light theme (default)
      root.setAttribute('data-theme', 'light');

      // Update active label styles
      if (darkLabel && lightLabel) {
        lightLabel.classList.add('theme-label--active');
        darkLabel.classList.remove('theme-label--active');
      }

      // Update accessible label
      if (themeToggleButton) {
        themeToggleButton.setAttribute('aria-label', 'Switch to dark theme');
        themeToggleButton.setAttribute('data-current-theme', 'light');
      }
    }
  }


  /**
   * Toggle between dark and light themes
   * Saves the preference to localStorage for persistence
   */
  function toggleTheme() {
    
    // Switch theme
    currentTheme = (currentTheme === 'dark') ? 'light' : 'dark';
    
    // Save to localStorage for persistence across sessions
    localStorage.setItem('theme', currentTheme);
    
    // Apply the new theme
    applyTheme(currentTheme);
    
  }


  /**
   * Theme toggle button click event listener
   */
  themeToggleButton.addEventListener('click', toggleTheme);


  /**
   * Apply initial theme on page load
   * This ensures the saved theme preference is applied immediately
   */
  applyTheme(currentTheme);

});


/* =============================
   END OF THEME TOGGLE SCRIPT
   ============================= */
