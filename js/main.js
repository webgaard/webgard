/* =============================
   MAIN JAVASCRIPT FOR WEBGARD PLATFORM
   Author: Webgard Team
   Description: Handles entry animation and audio playback
   ============================= */


/**
 * Initialize the page on DOM content loaded
 */
document.addEventListener("DOMContentLoaded", function () {

  // Get audio element reference
  const audio = document.getElementById("audio");

  // Get DOM element references
  const entryButton = document.getElementById("entryButton");
  const content = document.getElementById("content");


  /**
   * Show main content and hide entry button
   * This function handles the transition from the landing screen
   * to the main content area with smooth animation
   */
  function showContent() {
    
    // Fade out entry button
    entryButton.style.opacity = 0;
    entryButton.style.pointerEvents = "none";

    // Delay to allow fade-out animation to complete
    setTimeout(function () {
      
      // Hide entry button completely
      entryButton.style.display = "none";
      
      // Display main content
      content.style.display = "flex";

      // Start background music playback
      audio.play().catch(function(error) {
        // Handle autoplay restrictions in some browsers
        console.log("Audio autoplay prevented:", error);
      });

      // Lock body overflow to prevent scrolling
      document.body.style.overflow = "hidden";

    }, 500); // 500ms delay for smooth transition
  }


  /**
   * Entry button click event listener
   * Triggers the content reveal animation
   */
  entryButton.addEventListener("click", showContent);


  /**
   * Add blur class to body on page load
   * Creates the initial blurred background effect
   */
  document.body.classList.add("blur");

});


/* =============================
   END OF MAIN SCRIPT
   ============================= */
