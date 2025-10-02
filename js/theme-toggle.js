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
  const themeDot = document.getElementById('themeDot');
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
      themeDot.style.color = '#fff'; // White dot for dark mode indicator
    } else {
      // Apply light theme (default)
      root.setAttribute('data-theme', 'light');
      themeDot.style.color = '#222'; // Dark dot for light mode indicator
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
