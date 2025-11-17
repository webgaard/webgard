/* =============================
   MAIN JAVASCRIPT FOR WEBGARD PLATFORM
   Author: Webgard Team
   Description: Handles entry animation and audio playback control
   ============================= */


/**
 * Initialize the page on DOM content loaded
 * Sets up music control button and main content visibility
 */
document.addEventListener("DOMContentLoaded", function () {

  // Get audio element reference
  const audio = document.getElementById("audio");

  // Get main content reference
  const content = document.getElementById("content");

  // Get music control elements
  const musicToggle = document.getElementById("musicToggle");
  const musicIcon = document.getElementById("musicIcon");
  const musicStatus = document.getElementById("musicStatus");

  // Track music playing state
  let isPlaying = false;

  // Ensure main content is visible
  if (content) {
    content.style.display = "flex";
  }

  /**
   * Toggle music playback
   * Updates button state and icon based on playing status
   */
  function toggleMusic() {
    if (!audio) return;

    if (isPlaying) {
      // Pause music
      audio.pause();
      musicIcon.textContent = "▶";
      musicStatus.textContent = "PLAY MUSIC";
      isPlaying = false;
    } else {
      // Play music
      audio.play().catch((error) => {
        console.log("Audio playback failed:", error);
      });
      musicIcon.textContent = "❚❚";
      musicStatus.textContent = "PAUSE MUSIC";
      isPlaying = true;
    }
  }

  // Attach click event to music toggle button
  if (musicToggle) {
    musicToggle.addEventListener("click", toggleMusic);
  }
});


/* =============================
   END OF MAIN SCRIPT
   ============================= */
