# Design Document: Hero Section Homepage

## Overview

The Hero Section is the primary landing component of the Bún Mee website homepage. It serves as the first impression for visitors, combining brand identity, navigation, and call-to-action elements with appetizing imagery of Vietnamese cuisine.

This design implements a responsive, accessible header component that includes:
- Brand logo with homepage navigation
- Horizontal navigation menu with five main sections
- Dual call-to-action buttons for ordering
- Full-width hero image showcasing Vietnamese dishes
- Decorative background pattern with brand text
- Dynamic title display capability

The component prioritizes performance through image optimization, accessibility through semantic HTML and keyboard navigation, and responsive design for viewport sizes from 320px to 1920px.

## Architecture

### Component Structure

```
HeroSection/
├── Header
│   ├── Logo
│   ├── NavigationMenu
│   │   ├── MenuItem (x5)
│   │   └── MobileMenuToggle
│   └── CTAButtons
│       ├── OrderPickupButton
│       └── OrderDeliveryButton
├── HeroContent
│   ├── BackgroundPattern
│   ├── HeroImage
│   └── HeroTitle
└── LoadingState
```

### Technology Stack

- **Framework**: React (recommended) or vanilla JavaScript with Web Components
- **Styling**: CSS Modules or Styled Components for component-scoped styles
- **Image Optimization**: Next.js Image component or similar lazy-loading solution
- **Responsive Design**: CSS Grid and Flexbox with media queries
- **Accessibility**: ARIA attributes and semantic HTML5 elements

### Layout Strategy

The hero section uses a layered approach:
1. **Base Layer**: Background pattern (lowest z-index)
2. **Image Layer**: Hero image with overlay
3. **Content Layer**: Header with logo, navigation, and CTAs (highest z-index)
4. **Title Layer**: Centered title text over the image

## Components and Interfaces

### 1. HeroSection Component

Main container component that orchestrates all child components.

```typescript
interface HeroSectionProps {
  title?: string;
  heroImageSrc: string;
  heroImageAlt: string;
  onNavigate?: (path: string) => void;
}

const HeroSection: React.FC<HeroSectionProps> = ({
  title,
  heroImageSrc,
  heroImageAlt,
  onNavigate
}) => {
  // Component implementation
}
```

### 2. Logo Component

```typescript
interface LogoProps {
  onClick?: () => void;
  ariaLabel?: string;
}

const Logo: React.FC<LogoProps> = ({
  onClick,
  ariaLabel = "Bún Mee Homepage"
}) => {
  // Renders "Bún Mee" text/image with click handler
}
```

### 3. NavigationMenu Component

```typescript
interface MenuItem {
  label: string;
  path: string;
  ariaLabel?: string;
}

interface NavigationMenuProps {
  items: MenuItem[];
  onNavigate: (path: string) => void;
  isMobile?: boolean;
}

const NavigationMenu: React.FC<NavigationMenuProps> = ({
  items,
  onNavigate,
  isMobile = false
}) => {
  // Renders horizontal menu or hamburger menu based on viewport
}
```

Default menu items:
- LOCATIONS → /locations
- MENU → /menu
- CATERING → /catering
- FRANCHISE → /franchise
- ABOUT US → /about

### 4. CTAButtons Component

```typescript
interface CTAButtonsProps {
  onOrderPickup: () => void;
  onOrderDelivery: () => void;
}

const CTAButtons: React.FC<CTAButtonsProps> = ({
  onOrderPickup,
  onOrderDelivery
}) => {
  // Renders two prominent CTA buttons
}
```

### 5. HeroImage Component

```typescript
interface HeroImageProps {
  src: string;
  alt: string;
  loading?: 'lazy' | 'eager';
  placeholder?: string;
}

const HeroImage: React.FC<HeroImageProps> = ({
  src,
  alt,
  loading = 'lazy',
  placeholder
}) => {
  // Renders optimized image with loading state
}
```

### 6. BackgroundPattern Component

```typescript
interface BackgroundPatternProps {
  text?: string;
  opacity?: number;
}

const BackgroundPattern: React.FC<BackgroundPatternProps> = ({
  text = "BÚN MEE",
  opacity = 0.05
}) => {
  // Renders repeating text pattern
}
```

## Data Models

### Navigation Configuration

```typescript
type NavigationConfig = {
  menuItems: MenuItem[];
  logoText: string;
  logoLink: string;
  ctaButtons: {
    pickup: {
      label: string;
      link: string;
    };
    delivery: {
      label: string;
      link: string;
    };
  };
};

const defaultConfig: NavigationConfig = {
  menuItems: [
    { label: "LOCATIONS", path: "/locations" },
    { label: "MENU", path: "/menu" },
    { label: "CATERING", path: "/catering" },
    { label: "FRANCHISE", path: "/franchise" },
    { label: "ABOUT US", path: "/about" }
  ],
  logoText: "Bún Mee",
  logoLink: "/",
  ctaButtons: {
    pickup: { label: "ORDER PICKUP", link: "/order/pickup" },
    delivery: { label: "ORDER DELIVERY", link: "/order/delivery" }
  }
};
```

### Responsive Breakpoints

```typescript
const breakpoints = {
  mobile: 320,
  tablet: 768,
  desktop: 1024,
  wide: 1920
};
```

### Image Assets

```typescript
interface ImageAsset {
  src: string;
  srcSet?: string;
  webp?: string;
  fallback: string;
  alt: string;
  width: number;
  height: number;
}
```

## Error Handling

### Image Loading Failures

- Display placeholder image or solid color background
- Log error to monitoring service
- Ensure text content remains readable
- Provide retry mechanism for failed loads

```typescript
const handleImageError = (error: Error) => {
  console.error('Hero image failed to load:', error);
  // Set fallback state
  setImageSrc(FALLBACK_IMAGE);
  // Track error in analytics
  trackError('hero_image_load_failed', { error: error.message });
};
```

### Navigation Failures

- Validate navigation paths before routing
- Handle 404 scenarios gracefully
- Provide user feedback for failed navigation
- Log navigation errors for debugging

```typescript
const handleNavigation = async (path: string) => {
  try {
    // Validate path exists
    if (!isValidPath(path)) {
      throw new Error(`Invalid navigation path: ${path}`);
    }
    await router.push(path);
  } catch (error) {
    console.error('Navigation failed:', error);
    showNotification('Navigation failed. Please try again.');
  }
};
```

### Responsive Layout Issues

- Implement fallback layouts for unsupported viewports
- Test edge cases (very small/large screens)
- Handle orientation changes gracefully
- Prevent layout shift and overflow

```typescript
const useResponsiveLayout = () => {
  const [layout, setLayout] = useState<'mobile' | 'tablet' | 'desktop'>('desktop');
  
  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width < breakpoints.tablet) {
        setLayout('mobile');
      } else if (width < breakpoints.desktop) {
        setLayout('tablet');
      } else {
        setLayout('desktop');
      }
    };
    
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  return layout;
};
```

## Testing Strategy

### Unit Tests

Unit tests will verify component behavior, props handling, and user interactions using Jest and React Testing Library.

**Test Coverage:**

1. **Logo Component**
   - Renders "Bún Mee" text correctly
   - Calls onClick handler when clicked
   - Has appropriate aria-label

2. **NavigationMenu Component**
   - Renders all five menu items
   - Calls onNavigate with correct path when item clicked
   - Shows hover state on menu items
   - Collapses to hamburger menu on mobile viewport
   - Supports keyboard navigation (Tab, Enter)

3. **CTAButtons Component**
   - Renders both "ORDER PICKUP" and "ORDER DELIVERY" buttons
   - Calls correct handlers when clicked
   - Has sufficient color contrast (4.5:1 minimum)
   - Shows hover state

4. **HeroImage Component**
   - Renders image with correct src and alt text
   - Shows loading placeholder while loading
   - Handles image load errors gracefully
   - Supports lazy loading

5. **BackgroundPattern Component**
   - Renders repeating "BÚN MEE" text
   - Applies correct opacity
   - Positioned behind other content

6. **HeroSection Integration**
   - All child components render correctly
   - Navigation handlers propagate properly
   - Responsive layout changes at correct breakpoints
   - Maintains accessibility features

### Integration Tests

Integration tests will verify the hero section works correctly within the full page context.

**Test Scenarios:**

1. **Full Page Navigation Flow**
   - Click logo navigates to homepage
   - Click menu items navigates to correct pages
   - Click CTA buttons navigates to order pages
   - Browser back/forward buttons work correctly

2. **Responsive Behavior**
   - Layout adapts correctly at 320px, 768px, 1024px, 1920px
   - No horizontal scrolling at any viewport size
   - Touch interactions work on mobile devices
   - Hamburger menu opens/closes correctly

3. **Performance**
   - Hero section renders within 2 seconds on 3G
   - Images load with appropriate priority
   - No layout shift during image loading
   - Critical content visible before images load

### Visual Regression Tests

Use tools like Percy, Chromatic, or Playwright to capture and compare screenshots.

**Test Cases:**

1. Desktop layout (1920px, 1024px)
2. Tablet layout (768px)
3. Mobile layout (375px, 320px)
4. Hover states on navigation and buttons
5. Focus states for keyboard navigation
6. Loading states
7. Error states (missing image)

### Accessibility Tests

Use axe-core or similar tools to verify WCAG 2.1 AA compliance.

**Test Coverage:**

1. Semantic HTML structure
2. Keyboard navigation (Tab order, Enter/Space activation)
3. Screen reader compatibility (aria-labels, alt text)
4. Color contrast ratios (minimum 4.5:1)
5. Focus indicators visible and clear
6. No keyboard traps

### Performance Tests

Use Lighthouse, WebPageTest, or similar tools.

**Metrics to Track:**

1. First Contentful Paint (FCP) < 1.5s
2. Largest Contentful Paint (LCP) < 2.5s
3. Cumulative Layout Shift (CLS) < 0.1
4. Time to Interactive (TTI) < 3.5s
5. Image optimization (WebP with fallbacks)
6. Bundle size impact

### Test Implementation Notes

- Mock navigation functions in unit tests
- Use test IDs for reliable element selection
- Test with real images in integration tests
- Include tests for edge cases (very long menu labels, missing images)
- Verify behavior across browsers (Chrome, Firefox, Safari, Edge)

**Example Unit Test:**

```typescript
describe('NavigationMenu', () => {
  it('should call onNavigate with correct path when menu item clicked', () => {
    const mockNavigate = jest.fn();
    const items = [
      { label: 'MENU', path: '/menu' },
      { label: 'LOCATIONS', path: '/locations' }
    ];
    
    render(<NavigationMenu items={items} onNavigate={mockNavigate} />);
    
    const menuItem = screen.getByText('MENU');
    fireEvent.click(menuItem);
    
    expect(mockNavigate).toHaveBeenCalledWith('/menu');
  });
  
  it('should be keyboard navigable', () => {
    const mockNavigate = jest.fn();
    const items = [{ label: 'MENU', path: '/menu' }];
    
    render(<NavigationMenu items={items} onNavigate={mockNavigate} />);
    
    const menuItem = screen.getByText('MENU');
    menuItem.focus();
    
    expect(menuItem).toHaveFocus();
    
    fireEvent.keyDown(menuItem, { key: 'Enter' });
    expect(mockNavigate).toHaveBeenCalledWith('/menu');
  });
});
```

## Implementation Notes

### CSS Architecture

Use BEM naming convention or CSS Modules for scoped styling:

```css
.hero-section {
  position: relative;
  width: 100%;
  min-height: 600px;
  overflow: hidden;
}

.hero-section__header {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  z-index: 10;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2rem;
}

.hero-section__background-pattern {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 1;
  opacity: 0.05;
}

.hero-section__image {
  position: relative;
  z-index: 2;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.hero-section__title {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 5;
  text-align: center;
}

@media (max-width: 768px) {
  .hero-section__header {
    flex-direction: column;
    gap: 1rem;
  }
}
```

### Image Optimization Strategy

1. Use WebP format with JPEG/PNG fallback
2. Implement responsive images with srcset
3. Lazy load below-the-fold images
4. Compress images to < 200KB
5. Use CDN for image delivery
6. Implement blur-up loading technique

```html
<picture>
  <source srcset="hero-image.webp" type="image/webp">
  <source srcset="hero-image.jpg" type="image/jpeg">
  <img src="hero-image.jpg" alt="Vietnamese dishes" loading="lazy">
</picture>
```

### Accessibility Implementation

1. Use semantic HTML5 elements (`<header>`, `<nav>`, `<button>`)
2. Add ARIA labels where needed
3. Ensure focus indicators are visible (outline or custom styling)
4. Test with screen readers (NVDA, JAWS, VoiceOver)
5. Implement skip-to-content link for keyboard users

```html
<header role="banner">
  <a href="#main-content" class="skip-link">Skip to main content</a>
  <nav role="navigation" aria-label="Main navigation">
    <!-- Navigation items -->
  </nav>
</header>
```

### Performance Optimization

1. Code-split hero section if part of larger bundle
2. Preload critical fonts and images
3. Use CSS containment for layout optimization
4. Minimize JavaScript execution on initial render
5. Implement intersection observer for lazy loading

```html
<link rel="preload" as="image" href="hero-image.webp">
<link rel="preload" as="font" href="fonts/main-font.woff2" crossorigin>
```

