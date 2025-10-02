# CLAUDE.md - AI Assistant Guide for Webgard Platform

> This document provides guidelines and context for AI assistants (like Claude, GPT, etc.) working on the Webgard Platform project.

## 📋 Project Overview

**Project Name**: Webgard Platform - Coming Soon Page  
**Type**: Static Website  
**Purpose**: Landing page showcasing upcoming AI-powered platform  
**Tech Stack**: HTML5, CSS3, Vanilla JavaScript  
**Design Style**: Retro pixel art aesthetic with modern functionality

## 🎯 Project Goals & Philosophy

### Core Principles

1. **Simplicity First**: Keep the codebase minimal and maintainable
2. **Performance**: Fast loading times with minimal dependencies
3. **Accessibility**: WCAG 2.1 AA compliant where possible
4. **Responsive Design**: Mobile-first approach
5. **Clean Code**: Well-documented, properly formatted, and easy to understand

### Design Philosophy

- **Retro Aesthetic**: Press Start 2P font, pixelated style
- **Smooth Interactions**: Subtle animations and transitions
- **Theme Flexibility**: Dark/light mode with user preference persistence
- **Minimalist UI**: Focus on essential content without clutter

## 🗂️ Project Structure & Architecture

### File Organization

```
Website/
├── index.html              # Single-page application entry point
├── css/
│   ├── variables.css       # Design system (CSS custom properties)
│   └── style.css          # Main styles (organized by component)
├── js/
│   ├── main.js            # Entry animations & audio control
│   └── theme-toggle.js    # Theme switching logic
├── fonts/                  # Self-hosted fonts
├── assets/                 # Media files (audio, images)
└── docs/                   # Documentation (README, CLAUDE)
```

### Code Organization Patterns

#### CSS Structure

- **Variables First**: All customizable values in `variables.css`
- **Component-Based**: Each major UI element has its own section
- **Mobile-First**: Base styles for mobile, then media queries for desktop
- **Clear Sections**: Delimited with comment headers

#### JavaScript Structure

- **Module Pattern**: Each file handles one concern
- **Event-Driven**: Uses DOM events for interactions
- **Error Handling**: Graceful degradation for browser limitations
- **Comments**: JSDoc-style function documentation

## 🔧 Coding Standards

### HTML Guidelines

```html
<!-- ✅ GOOD: Semantic, accessible, well-commented -->
<nav aria-label="Social media links">
  <a
    href="..."
    target="_blank"
    rel="noopener noreferrer"
    aria-label="Instagram"
  >
    INSTAGRAM
  </a>
</nav>

<!-- ❌ BAD: Non-semantic, no accessibility attributes -->
<div>
  <a href="...">INSTAGRAM</a>
</div>
```

### CSS Guidelines

```css
/* ✅ GOOD: Use CSS variables, clear naming, grouped properties */
.theme-toggle {
  /* Layout */
  display: flex;
  align-items: center;
  gap: 8px;

  /* Positioning */
  position: absolute;
  top: 24px;
  left: 50%;
  transform: translateX(-50%);

  /* Styling */
  color: var(--color-text-main);
  font-family: var(--font-retro);

  /* Animation */
  transition: color 0.3s;
}

/* ❌ BAD: Hardcoded values, random property order */
.theme-toggle {
  color: #222;
  top: 24px;
  display: flex;
  font-family: "Press Start 2P";
  position: absolute;
}
```

### JavaScript Guidelines

```javascript
// ✅ GOOD: Documented, error handling, const/let usage
/**
 * Apply the specified theme to the page
 * @param {string} theme - The theme to apply ('dark' or 'light')
 */
function applyTheme(theme) {
  const root = document.documentElement;

  if (theme === "dark") {
    root.setAttribute("data-theme", "dark");
  } else {
    root.setAttribute("data-theme", "light");
  }
}

// ❌ BAD: No documentation, var usage, no error handling
function applyTheme(theme) {
  var root = document.documentElement;
  root.setAttribute("data-theme", theme);
}
```

## 📝 Commenting Standards

### CSS Comments

```css
/* =============================
   SECTION TITLE (MAJOR SECTIONS)
   ============================= */

/* Component name or description */
.selector {
  /* Inline explanation for complex properties */
}
```

### JavaScript Comments

```javascript
/* =============================
   FILE HEADER
   ============================= */

/**
 * JSDoc-style function documentation
 * @param {type} paramName - Description
 * @returns {type} Description
 */

// Inline comments for complex logic
```

### HTML Comments

```html
<!-- Section Title -->
<div>
  <!-- Brief explanation of component purpose -->
</div>
```

## 🚀 When Making Changes

### Before Editing

1. **Read the entire file** to understand context
2. **Check related files** for dependencies
3. **Review CSS variables** before adding new styles
4. **Test responsiveness** across breakpoints

### During Editing

1. **Maintain consistency** with existing patterns
2. **Use CSS variables** instead of hardcoded values
3. **Add comments** for non-obvious code
4. **Keep spacing uniform** (2 spaces for indentation)
5. **Group related code** with section comments

### After Editing

1. **Test in multiple browsers** (Chrome, Firefox, Safari, Edge)
2. **Check mobile responsiveness**
3. **Validate HTML** (W3C validator)
4. **Check console** for JavaScript errors
5. **Test theme toggle** functionality
6. **Verify accessibility** (contrast, ARIA labels)

## 🎨 Design System Reference

### Colors

- **Light Theme**: White background, dark text
- **Dark Theme**: Black background, light text
- **Transitions**: 0.3s for colors, 0.5s for complex animations

### Typography

- **Font Family**: Press Start 2P (retro gaming font)
- **Desktop Sizes**: 23px (entry), 12px (coming soon), 10px (social)
- **Mobile Sizes**: 16px (entry), 9px (coming soon), 9px (social)

### Spacing Scale

- **Small**: 8-10px
- **Medium**: 24px
- **Large**: 48-60px
- **Extra Large**: 80-85px

### Breakpoints

- **Mobile**: ≤600px
- **Tablet**: ≤900px
- **Desktop**: >900px

## 🔍 Common Tasks & Solutions

### Adding a New Social Link

1. Add HTML in `index.html` within `#social-links`
2. Follow existing pattern: `<a>` with proper attributes
3. Use `target="_blank"` and `rel="noopener noreferrer"`
4. Add `aria-label` for accessibility

### Changing Theme Colors

1. Edit CSS variables in `css/variables.css`
2. Update both `:root` (light) and `[data-theme='dark']` (dark)
3. Maintain color contrast ratios (AA level)

### Adding Animation

1. Define animation in `css/style.css`
2. Use CSS transitions for simple effects
3. Keep animation duration ≤500ms for responsiveness
4. Add `transition` property to relevant elements

### Modifying JavaScript Logic

1. Follow existing function structure
2. Add JSDoc comments for new functions
3. Use `const` and `let` (not `var`)
4. Handle errors gracefully with try/catch or checks

## ⚠️ Important Constraints

### DO NOT:

- ❌ Remove existing comments without replacing them
- ❌ Use inline styles (except for `display: none` on audio)
- ❌ Add heavy external dependencies
- ❌ Break responsive design
- ❌ Hardcode values that should be CSS variables
- ❌ Use `var` keyword in JavaScript
- ❌ Remove accessibility attributes
- ❌ Change the retro aesthetic without approval

### DO:

- ✅ Use CSS custom properties for all design tokens
- ✅ Maintain mobile-first responsive approach
- ✅ Add comprehensive comments in English
- ✅ Follow existing naming conventions
- ✅ Test changes in multiple browsers
- ✅ Keep code clean and well-formatted
- ✅ Preserve the retro gaming aesthetic
- ✅ Ensure accessibility compliance

## 🧪 Testing Checklist

- [ ] Page loads without errors
- [ ] Theme toggle works correctly
- [ ] Theme persists after page reload
- [ ] Entry button reveals content smoothly
- [ ] Audio plays (if browser allows)
- [ ] Social links open in new tabs
- [ ] Mobile layout is correct (<600px)
- [ ] Desktop layout is correct (>600px)
- [ ] Console is error-free
- [ ] All text is readable (contrast)
- [ ] Hover effects work properly

## 📚 Key Dependencies

### External Resources

- **Font**: Google Fonts (Press Start 2P) - with local fallback
- **Browser APIs**: localStorage, Audio API

### No Framework Dependencies

This project intentionally uses **vanilla JavaScript** to:

- Minimize load times
- Reduce complexity
- Improve maintainability
- Demonstrate core web fundamentals

## 🎓 Learning Resources

For AI assistants unfamiliar with specific technologies:

- **CSS Custom Properties**: [MDN Guide](https://developer.mozilla.org/en-US/docs/Web/CSS/Using_CSS_custom_properties)
- **localStorage API**: [MDN Guide](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage)
- **Audio API**: [MDN Guide](https://developer.mozilla.org/en-US/docs/Web/API/HTMLAudioElement)
- **Responsive Design**: [MDN Guide](https://developer.mozilla.org/en-US/docs/Learn/CSS/CSS_layout/Responsive_Design)

## 🤖 AI Assistant Best Practices

### When Responding to User Requests

1. **Understand Context**: Read related files before making changes
2. **Explain Changes**: Describe what you're changing and why
3. **Maintain Consistency**: Follow existing patterns and conventions
4. **Consider Impact**: Think about responsive design and accessibility
5. **Test Suggestions**: Mentally validate changes before proposing
6. **Ask Questions**: If requirements are unclear, ask for clarification
7. **Document Changes**: Add appropriate comments for new code

### Code Review Mindset

When reviewing or modifying code, check for:

- Semantic HTML usage
- Proper CSS variable usage
- Responsive design considerations
- Accessibility attributes
- Comment quality and clarity
- Code consistency with existing patterns
- Performance implications

## 📖 Version History

- **v1.0** (2025): Initial coming soon page with theme toggle
- **Current**: Optimized, documented, and refactored codebase

## 🔮 Future Considerations

Potential areas for expansion:

- Email subscription form
- Countdown timer
- Particle effects
- More theme options
- Newsletter integration
- Blog preview section

## 💡 Pro Tips for AI Assistants

1. **Always check CSS variables first** before adding new properties
2. **Maintain the retro aesthetic** - it's a core design principle
3. **Mobile-first approach** - start with mobile, then scale up
4. **Comments are mandatory** - especially for complex logic
5. **Performance matters** - keep bundle size minimal
6. **Accessibility is non-negotiable** - add ARIA labels, maintain contrast
7. **Test theme toggle** - many changes affect both themes

---

**Last Updated**: 2025-10-02  
**Maintained By**: Webgard Team  
**For**: AI Assistants (Claude, GPT, Copilot, etc.)

---

_This document helps AI models understand the project context, coding standards, and best practices. Keep it updated as the project evolves._
