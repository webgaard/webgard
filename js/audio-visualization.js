/* =============================
   AUDIO VISUALIZATION FOR WEBGARD PLATFORM
   Author: Webgard Team
   Description: Creates audio-reactive animated background with neutral colors
   ============================= */


/**
 * Audio Visualization Manager
 * Handles audio analysis and canvas animation synchronized with music
 */
class AudioVisualizer {
  
  constructor() {
    // Canvas setup
    this.canvas = document.getElementById('backgroundCanvas');
    this.ctx = this.canvas.getContext('2d');
    
    // Audio elements
    this.audio = document.getElementById('audio');
    this.audioContext = null;
    this.analyser = null;
    this.dataArray = null;
    this.bufferLength = 0;
    
    // Animation properties
    this.waves = [];
    this.animationId = null;
    
    // Color schemes for light and dark themes
    this.colors = {
      light: [
        'rgba(200, 200, 200, 0.3)',
        'rgba(180, 180, 180, 0.25)',
        'rgba(160, 160, 160, 0.2)',
        'rgba(140, 140, 140, 0.15)',
        'rgba(220, 220, 220, 0.25)'
      ],
      dark: [
        'rgba(100, 100, 100, 0.3)',
        'rgba(80, 80, 80, 0.25)',
        'rgba(60, 60, 60, 0.2)',
        'rgba(120, 120, 120, 0.15)',
        'rgba(90, 90, 90, 0.25)'
      ]
    };
    
    // Initialize
    this.init();
  }


  /**
   * Initialize the visualizer
   */
  init() {
    // Setup canvas size
    this.resizeCanvas();
    window.addEventListener('resize', () => this.resizeCanvas());
    
    // Create waves
    this.createWaves();
    
    // Start animation loop
    this.animate();
    
    // Setup audio analyzer when audio plays
    this.audio.addEventListener('play', () => this.setupAudioAnalyzer());
  }


  /**
   * Resize canvas to match window size
   */
  resizeCanvas() {
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
  }


  /**
   * Setup Web Audio API for audio analysis
   */
  setupAudioAnalyzer() {
    if (this.audioContext) return; // Already initialized
    
    try {
      // Create audio context
      this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
      
      // Create analyser node
      this.analyser = this.audioContext.createAnalyser();
      this.analyser.fftSize = 256;
      this.bufferLength = this.analyser.frequencyBinCount;
      this.dataArray = new Uint8Array(this.bufferLength);
      
      // Connect audio source to analyser
      const source = this.audioContext.createMediaElementSource(this.audio);
      source.connect(this.analyser);
      this.analyser.connect(this.audioContext.destination);
      
    } catch (error) {
      console.log('Web Audio API not supported:', error);
    }
  }


  /**
   * Create wave objects
   */
  createWaves() {
    for (let i = 0; i < 3; i++) {
      this.waves.push({
        y: this.canvas.height * (0.3 + i * 0.2),
        amplitude: 30 + i * 15, // Increased base amplitude for more movement
        frequency: 0.005 + i * 0.003, // Lower frequency for smoother waves
        speed: 0.015 + i * 0.008,
        offset: 0,
        colorIndex: i
      });
    }
  }


  /**
   * Get current theme colors
   */
  getCurrentColors() {
    const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
    return isDark ? this.colors.dark : this.colors.light;
  }


  /**
   * Get audio frequency data
   */
  getAudioData() {
    if (!this.analyser || !this.dataArray) {
      return { average: 0, bass: 0, mid: 0, treble: 0 };
    }
    
    this.analyser.getByteFrequencyData(this.dataArray);
    
    // Calculate different frequency ranges
    const bass = this.dataArray.slice(0, 5).reduce((a, b) => a + b, 0) / 5;
    const mid = this.dataArray.slice(5, 20).reduce((a, b) => a + b, 0) / 15;
    const treble = this.dataArray.slice(20, 50).reduce((a, b) => a + b, 0) / 30;
    const average = this.dataArray.reduce((a, b) => a + b, 0) / this.bufferLength;
    
    return { average, bass, mid, treble };
  }


  /**
   * Draw waves with audio reactivity
   */
  drawWaves(audioData) {
    const colors = this.getCurrentColors();
    
    this.waves.forEach((wave, index) => {
      this.ctx.beginPath();
      this.ctx.moveTo(0, wave.y);
      
      // Create wave based on audio frequency with stronger bass reaction
      let audioMultiplier = 1;
      if (index === 0) {
        // First wave reacts strongly to bass
        audioMultiplier = audioData.bass / 50; // Stronger bass reaction
      } else if (index === 1) {
        audioMultiplier = audioData.mid / 80;
      } else {
        audioMultiplier = audioData.treble / 100;
      }
      
      const amplitude = wave.amplitude * (1 + audioMultiplier * 1.5);
      
      // Draw smoother waves with more points
      for (let x = 0; x < this.canvas.width; x += 2) {
        const y = wave.y + Math.sin(x * wave.frequency + wave.offset) * amplitude;
        this.ctx.lineTo(x, y);
      }
      
      // Update wave offset for animation
      wave.offset += wave.speed;
      
      // Style and draw with smoother lines
      this.ctx.strokeStyle = colors[wave.colorIndex];
      this.ctx.lineWidth = 2.5;
      this.ctx.lineCap = 'round';
      this.ctx.lineJoin = 'round';
      this.ctx.stroke();
    });
  }


  /**
   * Draw gradient background that pulses with bass
   */
  drawPulsingGradient(audioData) {
    const colors = this.getCurrentColors();
    const bassIntensity = audioData.bass / 255;
    
    // Create radial gradient from center
    const centerX = this.canvas.width / 2;
    const centerY = this.canvas.height / 2;
    const radius = Math.max(this.canvas.width, this.canvas.height) * (0.5 + bassIntensity * 0.3);
    
    const gradient = this.ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, radius);
    gradient.addColorStop(0, colors[0]);
    gradient.addColorStop(0.5, colors[1]);
    gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
    
    this.ctx.fillStyle = gradient;
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
  }


  /**
   * Main animation loop
   */
  animate() {
    // Clear canvas
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    
    // Get audio data
    const audioData = this.getAudioData();
    
    // Draw pulsing gradient
    this.drawPulsingGradient(audioData);
    
    // Draw waves
    this.drawWaves(audioData);
    
    // Continue animation
    this.animationId = requestAnimationFrame(() => this.animate());
  }


  /**
   * Stop animation
   */
  stop() {
    if (this.animationId) {
      cancelAnimationFrame(this.animationId);
      this.animationId = null;
    }
  }
}


/**
 * Initialize visualizer when DOM is ready
 */
document.addEventListener('DOMContentLoaded', function() {
  // Wait a bit to ensure audio element is ready
  setTimeout(() => {
    const visualizer = new AudioVisualizer();
  }, 100);
});


/* =============================
   END OF AUDIO VISUALIZATION SCRIPT
   ============================= */

