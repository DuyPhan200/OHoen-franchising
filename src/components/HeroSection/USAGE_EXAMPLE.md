# HeroSection Component Usage

## Overview

The HeroSection component is the main container that integrates all hero section elements including Logo, NavigationMenu, CTAButtons, HeroImage, and BackgroundPattern with proper layering and positioning.

## Basic Usage

```tsx
import HeroSection from './components/HeroSection';

function App() {
  const handleNavigate = (path: string) => {
    // Handle navigation (e.g., using React Router)
    console.log('Navigate to:', path);
  };

  return (
    <HeroSection
      title="Welcome to Bún Mee"
      heroImageSrc="/images/hero.jpg"
      heroImageAlt="Delicious Vietnamese dishes"
      onNavigate={handleNavigate}
    />
  );
}
```

## Props

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `title` | `string` | No | `undefined` | Dynamic title text displayed in the center of the hero section |
| `heroImageSrc` | `string` | Yes | - | Source URL for the hero background image |
| `heroImageAlt` | `string` | Yes | - | Alt text for the hero image (accessibility) |
| `onNavigate` | `(path: string) => void` | No | `undefined` | Callback function for navigation events |

## Features

### Layered Layout Structure

The component implements a 4-layer structure with proper z-index:

1. **Layer 1 (z-index: 1)**: Background Pattern - Subtle "BÚN MEE" text pattern
2. **Layer 2 (z-index: 2)**: Hero Image - Full-width background image
3. **Layer 3 (z-index: 10)**: Header - Logo, Navigation Menu, and CTA Buttons
4. **Layer 4 (z-index: 5)**: Hero Title - Centered title text (if provided)

### Integrated Components

- **Logo**: Positioned at top-left, navigates to homepage when clicked
- **NavigationMenu**: Centered horizontal menu with 5 items (LOCATIONS, MENU, CATERING, FRANCHISE, ABOUT US)
- **CTAButtons**: Positioned at top-right with "ORDER PICKUP" and "ORDER DELIVERY" buttons
- **HeroImage**: Full-width background image with lazy loading and error handling
- **BackgroundPattern**: Decorative repeating text pattern

### Responsive Behavior

- **Desktop (≥1024px)**: Full horizontal layout with all elements visible
- **Tablet (768px-1023px)**: Adjusted spacing and font sizes
- **Mobile (<768px)**: Vertical stacking, hamburger menu, smaller title

### Navigation Handling

The component handles navigation for:
- Logo click → navigates to `/`
- Menu items → navigate to their respective paths
- ORDER PICKUP button → navigates to `/order/pickup`
- ORDER DELIVERY button → navigates to `/order/delivery`

## Examples

### With Title

```tsx
<HeroSection
  title="Authentic Vietnamese Cuisine"
  heroImageSrc="/images/hero.jpg"
  heroImageAlt="Vietnamese dishes"
  onNavigate={(path) => router.push(path)}
/>
```

### Without Title

```tsx
<HeroSection
  heroImageSrc="/images/hero.jpg"
  heroImageAlt="Vietnamese dishes"
  onNavigate={(path) => router.push(path)}
/>
```

### With React Router

```tsx
import { useNavigate } from 'react-router-dom';

function HomePage() {
  const navigate = useNavigate();

  return (
    <HeroSection
      title="Welcome to Bún Mee"
      heroImageSrc="/images/hero.jpg"
      heroImageAlt="Vietnamese dishes"
      onNavigate={(path) => navigate(path)}
    />
  );
}
```

## Accessibility

The component includes:
- Semantic HTML5 elements (`<section>`, `<header>`, `<nav>`)
- ARIA labels for all interactive elements
- Keyboard navigation support (Tab and Enter keys)
- Proper focus indicators
- Alt text for images
- Color contrast ratios meeting WCAG 2.1 AA standards

## Requirements Satisfied

- **1.1**: Logo positioned at top-left corner
- **2.2**: Navigation menu positioned horizontally in center
- **3.2**: CTA buttons positioned at top-right corner
- **4.1**: Hero image displays full-width
- **5.1, 5.2, 5.3, 5.4**: Dynamic title display with center alignment and readability
- **6.2**: Background pattern positioned behind other content

## Notes

- The component uses CSS Modules for scoped styling
- All navigation is handled through the `onNavigate` callback prop
- Default navigation configuration is imported from `src/config/navigation.ts`
- The component is fully responsive and works on viewports from 320px to 1920px
