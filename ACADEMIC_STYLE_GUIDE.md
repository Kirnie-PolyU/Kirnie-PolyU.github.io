# Academic Style Guide

## Overview
This document describes the academic styling enhancements applied to the personal homepage.

## Design Philosophy

The academic style transformation follows these key principles:

### 1. **Typography**
- **Serif Fonts for Body**: Uses `Merriweather` and `Georgia` for enhanced readability and formal appearance
- **Distinguished Headings**: Employs `Crimson Text` for a classic, scholarly feel
- **Sans-Serif for UI**: Uses `Inter` for navigation and buttons for clarity
- **Improved Readability**: Line height of 1.75 for comfortable reading

### 2. **Color Palette**
```css
--academic-primary: #1a365d    /* Navy Blue - Authority and Trust */
--academic-secondary: #2c5282   /* Medium Blue - Professional */
--academic-accent: #2b6cb0      /* Bright Blue - Highlights */
--academic-text: #2d3748        /* Dark Gray - Readable */
--academic-border: #cbd5e0      /* Light Gray - Subtle separation */
```

### 3. **Layout Components**

#### Navigation Bar
- Gradient background from navy to medium blue
- 5px accent border at bottom
- Uppercase text with letter spacing
- Subtle hover effects with background highlighting

#### Content Cards
- White background with subtle shadows
- 2px borders for clear separation
- Hover effects with color transitions
- Rounded corners (6px) for modern touch

#### Headings Hierarchy
- **H1**: 3rem, bottom border, prominent
- **H2**: 2.25rem, bottom border, section separator
- **H3**: 1.75rem, left accent border
- All use serif fonts for academic feel

#### Publications/Research Items
- Left accent border (5px)
- Light background color
- Hover effect with translation
- Clear visual separation

### 4. **Interactive Elements**

#### Buttons
- Conservative rectangular design
- Uppercase text with letter spacing
- Solid colors with hover transformations
- Subtle shadow effects

#### Links
- Blue color matching brand
- Underline on hover
- Smooth transitions

#### Images
- Profile photos: 4px navy border
- All images: Rounded corners with shadow
- Subtle scaling on hover

### 5. **Special Features**

#### Tables
- Gradient header background
- Zebra striping for rows
- Hover highlighting
- Clean borders and spacing

#### Code Blocks
- Light gray background
- Monospace font
- Proper padding and borders
- Syntax-friendly styling

#### Blockquotes
- Left accent border
- Large decorative quotation mark
- Italic text
- Light background

### 6. **Responsive Design**

#### Desktop (>992px)
- Full width content (max 1100px)
- Large typography
- Full shadows and effects

#### Tablet (768-992px)
- Reduced padding
- Adjusted font sizes
- Maintained hierarchy

#### Mobile (<768px)
- Single column layout
- Simplified navigation
- Left-aligned text (not justified)
- Optimized touch targets

### 7. **Print Styles**
- Black and white optimization
- Removed navigation and interactive elements
- Page break controls
- Underlined links
- Full width content

### 8. **Accessibility Features**
- High contrast ratios
- Clear focus states
- Semantic HTML support
- Keyboard navigation friendly
- Screen reader compatible

## File Structure

```
/webapp
├── index.html                    # Main HTML file with academic fonts
├── academic-override.css         # Comprehensive academic styling
└── assets/
    └── index-C6Id4bHB.css       # Base styles with academic enhancements
```

## Implementation Notes

### CSS Loading Order
1. Google Fonts (Crimson Text, Merriweather, Inter)
2. Base Tailwind CSS (index-C6Id4bHB.css)
3. Academic Override (academic-override.css)

### Using !important
The override CSS uses `!important` declarations to ensure academic styles take precedence over base Tailwind classes. This is intentional for this use case.

### Browser Compatibility
- Modern browsers (Chrome, Firefox, Safari, Edge)
- IE11+ with graceful degradation
- Mobile browsers fully supported

## Customization

### Changing Colors
Modify the CSS variables in `:root` selector:
```css
:root {
  --academic-primary: #your-color;
  --academic-secondary: #your-color;
  --academic-accent: #your-color;
}
```

### Adjusting Typography
Change font families in the respective selectors:
```css
body {
  font-family: 'Your-Font', serif !important;
}
```

### Modifying Spacing
Adjust padding and margins in component selectors.

## Best Practices

1. **Content Structure**: Use semantic HTML (article, section, aside)
2. **Image Alt Text**: Always provide descriptive alt text
3. **Heading Hierarchy**: Follow logical H1 → H2 → H3 progression
4. **Link Context**: Ensure links are descriptive
5. **Color Contrast**: Maintain WCAG AA standards minimum

## Testing Checklist

- [ ] Desktop view (1920px, 1440px, 1366px)
- [ ] Tablet view (768px, 1024px)
- [ ] Mobile view (375px, 414px)
- [ ] Print preview
- [ ] Keyboard navigation
- [ ] Screen reader compatibility
- [ ] Color contrast ratios
- [ ] Cross-browser testing

## Future Enhancements

Consider adding:
- Dark mode toggle
- Font size adjustment controls
- Citation formatting helpers
- Bibliography styling
- LaTeX equation support
- Academic timeline components
- Research metrics visualization

## Credits

Design inspired by:
- Traditional academic journals
- University faculty pages
- Research portfolio best practices
- Modern web accessibility standards

---

**Last Updated**: December 19, 2024
**Version**: 1.0.0
