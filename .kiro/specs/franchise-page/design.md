# Design Document: Franchise Page

## Overview

The Franchise page is a dedicated landing page for franchise opportunities at Bún Mee. It features a sticky header navigation bar and a hero section with a large cover image showcasing Vietnamese cuisine. The page replicates the UI design from https://bunmee.co/franchise while maintaining consistency with the existing codebase architecture.

This design implements:
- Sticky header with brand logo, navigation menu, and CTA buttons
- Full-width hero section with centered page title
- Responsive layout optimized for viewports from 320px to 1920px
- Reuse of existing components (Logo, NavigationMenu, CTAButtons) for consistency
- Accessibility features including keyboard navigation and ARIA labels

The key difference from the homepage hero section is the header positioning: the franchise page uses a sticky header that remains at the top during scrolling, while the homepage uses an absolute positioned header overlaying the hero image.

## Architecture

### Component Structure

```
FranchisePage/
├── Header (sticky)
│   ├── Logo
│   ├── NavigationMenu
│   │   ├── MenuItem (x5)
│   │   └── MobileMenuToggle
│   └── CTAButtons
│       ├── OrderPickupButton
│       └── OrderDeliveryButton
└── HeroSection
    ├── HeroImage
    └── HeroTitle
```

### Technology Stack

- **Framework**: React with TypeScript
- **Styling**: CSS Modules for component-scoped styles
- **Image Optimization**: Lazy loading with responsive images
- **Responsive Design**: CSS Flexbox with media queries
- **Accessibility**: ARIA attributes and semantic HTML5 elements
- **State Management**: React hooks for responsive behavior

### Layout Strategy

The franchise page uses a vertical stacking approach:
1. **Header Layer**: Sticky positioned at top (z-index: 100)
2. **Hero Section**: Full-width below header with centered title overlay

Key differences from homepage:
- Header is sticky (not absolute), creating a separate layout flow
- Hero section starts below the header (not full viewport height)
- No background pattern component needed
- Simpler z-index hierarchy

## Components and Interfaces

### 1. FranchisePage Component

Main page component that orchestrates the header and hero section.

```typescript
interface FranchisePageProps {
  heroImageSrc: string;
  heroImageAlt: string;
  onNavigate?: (path: string) => void;
}

const FranchisePage: React.FC<FranchisePageProps> = ({
  heroImageSrc,
  heroImageAlt,
  onNavigate
}) => {
  // Component implementation
}
```

### 2. Header Component

Sticky header container that holds Logo, NavigationMenu, and CTAButtons.

```typescript
interface HeaderProps {
  onNavigate?: (path: string) => void;
}

const Header: React.FC<HeaderProps> = ({ onNavigate }) => {
  // Renders sticky header with three sections
}
```

### 3. FranchiseHeroSection Component

Hero section specific to the franchise page with centered title.

```typescript
interface FranchiseHeroSectionProps {
  imageSrc: string;
  imageAlt: string;
  title?: string;
}

const FranchiseHeroSection: React.FC<FranchiseHeroSectionProps> = ({
  imageSrc,
  imageAlt,
  title = "FRANCHISE"
}) => {
  // Renders hero image with centered title
}
```

### 4. Reused Components

The following components are reused from the existing codebase:

- **Logo**: `src/components/Logo/Logo.tsx`
- **NavigationMenu**: `src/components/NavigationMenu/NavigationMenu.tsx`
- **CTAButtons**: `src/components/CTAButtons/CTAButtons.tsx`
- **HeroImage**: `src/components/HeroImage/HeroImage.tsx`

These components already implement the required functionality and styling patterns.

## Data Models

### Navigation Configuration

Reuses the existing `defaultNavigationConfig` from `src/config/navigation.ts`:

```typescript
import { defaultNavigationConfig } from '../config/navigation';

// Configuration includes:
// - menuItems: LOCATIONS, MENU, CATERING, FRANCHISE, ABOUT US
// - logoText: "Bún Mee"
// - logoLink: "/"
// - ctaButtons: ORDER PICKUP, ORDER DELIVERY
```

### Active Navigation State

```typescript
interface ActiveNavigationState {
  currentPath: string;
  activePage: 'locations' | 'menu' | 'catering' | 'franchise' | 'about';
}

// For franchise page:
const activeState: ActiveNavigationState = {
  currentPath: '/franchise',
  activePage: 'franchise'
};
```

### Responsive Breakpoints

Reuses existing breakpoints from `src/types/index.ts`:

```typescript
export const breakpoints = {
  mobile: 320,
  tablet: 768,
  desktop: 1024,
  wide: 1920,
} as const;
```

### Hero Section Configuration

```typescript
interface HeroConfig {
  title: string;
  imageSrc: string;
  imageAlt: string;
  minHeight: {
    mobile: string;
    desktop: string;
  };
}

const franchiseHeroConfig: HeroConfig = {
  title: "FRANCHISE",
  imageSrc: "/images/franchise-hero.jpg",
  imageAlt: "Vietnamese cuisine including bánh mì, phở, and chả giò",
  minHeight: {
    mobile: "300px",
    desktop: "500px"
  }
};
```

## Error Handling

### Image Loading Failures

```typescript
const handleImageError = (error: Error) => {
  console.error('Franchise hero image failed to load:', error);
  // Set fallback to solid color background
  setImageSrc(FALLBACK_COLOR);
  // Ensure title remains readable
  setTitleContrast('high');
  // Track error in analytics
  trackError('franchise_hero_image_load_failed', { 
    error: error.message,
    imageSrc: heroImageSrc
  });
};
```

### Navigation Failures

Reuses existing error handling from `src/utils/errorHandling.ts`:

```typescript
import { 
  isValidPath, 
  logError, 
  ErrorType, 
  showNotification, 
  NotificationType 
} from '../utils/errorHandling';

const handleNavigation = (path: string) => {
  if (!isValidPath(path)) {
    logError(ErrorType.INVALID_PATH, 'Invalid navigation path', { path });
    showNotification(
      'The requested page is not available.',
      NotificationType.ERROR
    );
    return;
  }
  
  try {
    onNavigate?.(path);
  } catch (error) {
    logError(ErrorType.NAVIGATION_FAILED, 'Navigation failed', {
      path,
      error: error instanceof Error ? error.message : 'Unknown error'
    });
    showNotification(
      'Navigation failed. Please try again.',
      NotificationType.ERROR
    );
  }
};
```

### Responsive Layout Issues

```typescript
const useResponsiveLayout = () => {
  const [layout, setLayout] = useState<LayoutType>('desktop');
  
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

### Sticky Header Edge Cases

```typescript
// Handle scroll position for header shadow
const useHeaderScroll = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  return isScrolled;
};
```

## Testing Strategy

### Unit Tests

Unit tests will verify component behavior, props handling, and user interactions using Jest and React Testing Library.

**Test Coverage:**

1. **Header Component**
   - Renders with sticky positioning
   - Contains Logo, NavigationMenu, and CTAButtons
   - Maintains white background
   - Applies shadow when scrolled
   - Maintains consistent spacing between sections

2. **FranchiseHeroSection Component**
   - Renders hero image with correct src and alt text
   - Displays "FRANCHISE" title centered
   - Applies correct minimum height based on viewport
   - Title has sufficient contrast with background
   - Title uses correct font size for viewport

3. **Logo Component Integration**
   - Renders with height between 60px-80px
   - Navigates to homepage when clicked
   - Has appropriate aria-label

4. **NavigationMenu Integration**
   - Renders all five menu items
   - FRANCHISE link displays in red (active state)
   - Other links display in gray-black
   - Hover changes link color to red
   - Calls onNavigate with correct path
   - Hidden on mobile viewports (< 1024px)

5. **CTAButtons Integration**
   - Renders both buttons with pill-shaped styling
   - ORDER PICKUP has white bg, red border, red text
   - ORDER DELIVERY has red bg, white text
   - Hover states work correctly
   - Calls correct handlers when clicked
   - Hidden on mobile viewports (< 1024px)

6. **Hamburger Icon (MobileMenuToggle)**
   - Displays two horizontal red lines
   - Positioned on right side of header
   - Triggers menu toggle when clicked
   - Has appropriate ARIA labels
   - Visible on mobile viewports (< 1024px)

7. **Responsive Behavior**
   - Desktop (≥1024px): Shows all header elements, hero min-height 500px
   - Mobile (<1024px): Shows only Logo and Hamburger, hero min-height 300px
   - Title font size adjusts correctly (text-7xl/8xl desktop, text-4xl/5xl mobile)

8. **Accessibility**
   - All interactive elements are keyboard navigable
   - Focus indicators are visible
   - ARIA labels are present and descriptive
   - Semantic HTML structure is correct

### Integration Tests

Integration tests will verify the franchise page works correctly within the full application context.

**Test Scenarios:**

1. **Full Page Navigation Flow**
   - Click logo navigates to homepage
   - Click FRANCHISE link stays on current page
   - Click other menu items navigates to correct pages
   - Click CTA buttons navigates to order pages
   - Browser back/forward buttons work correctly

2. **Sticky Header Behavior**
   - Header remains at top when scrolling down
   - Header remains at top when scrolling up
   - Header shadow appears after scrolling
   - Header maintains z-index above content
   - No layout shift when header becomes sticky

3. **Responsive Layout Transitions**
   - Layout adapts correctly at breakpoints (320px, 768px, 1024px, 1920px)
   - No horizontal scrolling at any viewport size
   - Mobile menu toggle works correctly
   - Hero section height adjusts appropriately
   - Title font size scales correctly

4. **Active Navigation State**
   - FRANCHISE link displays in red on franchise page
   - Other navigation links display in gray-black
   - Active state persists during page interactions
   - Active state updates when navigating to other pages

### Visual Regression Tests

Use tools like Percy, Chromatic, or Playwright to capture and compare screenshots.

**Test Cases:**

1. Desktop layout (1920px, 1024px)
   - Header with all elements visible
   - Hero section with full-size title
   - Active FRANCHISE link in red

2. Tablet layout (768px)
   - Header with Logo and Hamburger only
   - Hero section with medium-size title

3. Mobile layout (375px, 320px)
   - Header with Logo and Hamburger only
   - Hero section with small-size title
   - Mobile menu open state
   - Mobile menu closed state

4. Interactive states
   - Navigation link hover states
   - CTA button hover states
   - Hamburger icon hover state
   - Focus states for keyboard navigation

5. Scroll states
   - Header without shadow (top of page)
   - Header with shadow (scrolled)

### Accessibility Tests

Use axe-core or similar tools to verify WCAG 2.1 AA compliance.

**Test Coverage:**

1. Semantic HTML structure (header, nav, button, a, section, h1)
2. Keyboard navigation (Tab order, Enter/Space activation)
3. Screen reader compatibility (aria-labels, alt text)
4. Color contrast ratios:
   - Navigation text on white: ≥4.5:1
   - CTA button text: ≥4.5:1
   - Hero title with shadow: clearly visible
   - Hamburger icon on white: ≥3:1
5. Focus indicators visible and clear
6. No keyboard traps in mobile menu

### Performance Tests

Use Lighthouse, WebPageTest, or similar tools.

**Metrics to Track:**

1. First Contentful Paint (FCP) < 1.5s
2. Largest Contentful Paint (LCP) < 2.5s (hero image)
3. Cumulative Layout Shift (CLS) < 0.1
4. Time to Interactive (TTI) < 3.5s
5. Hero image optimization (WebP with fallbacks, < 200KB)
6. Sticky header performance (no jank during scroll)

### Test Implementation Notes

- Mock navigation functions in unit tests
- Use test IDs for reliable element selection
- Test with real images in integration tests
- Verify sticky positioning across browsers (Chrome, Firefox, Safari, Edge)
- Test scroll performance on low-end devices
- Verify mobile menu animations are smooth

**Example Unit Test:**

```typescript
describe('FranchisePage Header', () => {
  it('should render sticky header with all components', () => {
    render(<FranchisePage heroImageSrc="/test.jpg" heroImageAlt="Test" />);
    
    const header = screen.getByRole('banner');
    expect(header).toHaveClass('sticky');
    
    expect(screen.getByText('Bún Mee')).toBeInTheDocument();
    expect(screen.getByText('FRANCHISE')).toBeInTheDocument();
    expect(screen.getByText('ORDER PICKUP')).toBeInTheDocument();
  });
  
  it('should highlight FRANCHISE link as active', () => {
    render(<FranchisePage heroImageSrc="/test.jpg" heroImageAlt="Test" />);
    
    const franchiseLink = screen.getByText('FRANCHISE');
    expect(franchiseLink).toHaveClass('active');
    expect(franchiseLink).toHaveStyle({ color: '#DC2626' });
  });
  
  it('should hide navigation menu on mobile viewport', () => {
    global.innerWidth = 375;
    global.dispatchEvent(new Event('resize'));
    
    render(<FranchisePage heroImageSrc="/test.jpg" heroImageAlt="Test" />);
    
    const nav = screen.getByRole('navigation');
    expect(nav).toHaveClass('hidden-mobile');
  });
});
```

## Implementation Notes

### CSS Architecture

Use CSS Modules with BEM-inspired naming:

```css
/* FranchisePage.module.css */
.page {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.header {
  position: sticky;
  top: 0;
  z-index: 100;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2rem;
  background-color: #ffffff;
  transition: box-shadow 0.3s ease;
}

.header.scrolled {
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.headerLeft {
  flex: 0 0 auto;
}

.headerCenter {
  flex: 1 1 auto;
  display: flex;
  justify-content: center;
}

.headerRight {
  flex: 0 0 auto;
  display: flex;
  align-items: center;
  gap: 1rem;
}

.heroSection {
  position: relative;
  width: 100%;
  min-height: 500px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.heroImage {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  z-index: 1;
}

.heroTitle {
  position: relative;
  z-index: 2;
  color: #ffffff;
  font-size: clamp(3rem, 8vw, 6rem);
  font-weight: 800;
  text-align: center;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
  letter-spacing: 0.1em;
}

@media (max-width: 1023px) {
  .header {
    padding: 0.75rem 1rem;
  }
  
  .headerCenter {
    display: none;
  }
  
  .headerRight .ctaButtons {
    display: none;
  }
  
  .heroSection {
    min-height: 300px;
  }
  
  .heroTitle {
    font-size: clamp(2rem, 6vw, 3rem);
  }
}
```

### Active Navigation State Implementation

```typescript
// NavigationMenu.tsx enhancement
interface NavigationMenuProps {
  items: MenuItem[];
  onNavigate: (path: string) => void;
  activePath?: string; // Add active path prop
}

const NavigationMenu: React.FC<NavigationMenuProps> = ({
  items,
  onNavigate,
  activePath
}) => {
  return (
    <nav>
      <ul>
        {items.map((item) => (
          <li key={item.path}>
            <a
              href={item.path}
              className={activePath === item.path ? styles.active : ''}
              onClick={(e) => {
                e.preventDefault();
                onNavigate(item.path);
              }}
            >
              {item.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
};
```

```css
/* NavigationMenu.module.css enhancement */
.menuLink {
  color: #1F2937;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  transition: color 0.2s ease;
}

.menuLink:hover {
  color: #DC2626;
}

.menuLink.active {
  color: #DC2626;
}
```

### Image Optimization Strategy

1. Use WebP format with JPEG fallback
2. Implement responsive images with srcset
3. Lazy load hero image (below the fold after header)
4. Compress images to < 200KB
5. Use CDN for image delivery

```html
<picture>
  <source srcset="franchise-hero.webp" type="image/webp">
  <source srcset="franchise-hero.jpg" type="image/jpeg">
  <img 
    src="franchise-hero.jpg" 
    alt="Vietnamese cuisine including bánh mì, phở, and chả giò" 
    loading="lazy"
  >
</picture>
```

### Accessibility Implementation

1. Use semantic HTML5 elements (`<header>`, `<nav>`, `<button>`, `<section>`, `<h1>`)
2. Add ARIA labels to interactive elements
3. Ensure focus indicators are visible (2px solid outline)
4. Test with screen readers (NVDA, JAWS, VoiceOver)
5. Implement skip-to-content link for keyboard users

```html
<header role="banner">
  <a href="#main-content" class="skip-link">Skip to main content</a>
  <nav role="navigation" aria-label="Main navigation">
    <!-- Navigation items -->
  </nav>
</header>

<section id="main-content" role="main">
  <!-- Hero section content -->
</section>
```

### Performance Optimization

1. Reuse existing components to minimize bundle size
2. Use CSS containment for layout optimization
3. Implement passive scroll listeners for header shadow
4. Minimize JavaScript execution on initial render
5. Preload critical fonts

```html
<link rel="preload" as="font" href="fonts/main-font.woff2" crossorigin>
```

```typescript
// Passive scroll listener for better performance
useEffect(() => {
  const handleScroll = () => {
    setIsScrolled(window.scrollY > 0);
  };
  
  window.addEventListener('scroll', handleScroll, { passive: true });
  return () => window.removeEventListener('scroll', handleScroll);
}, []);
```

### Sticky Header Implementation

```css
.header {
  position: sticky;
  top: 0;
  z-index: 100;
  /* Ensure header stays above all content */
  will-change: box-shadow;
  /* Optimize for shadow animation */
}

/* Prevent layout shift */
.page {
  /* No padding-top needed since header is in document flow */
}
```

### Mobile Menu Integration

Reuse existing `MobileMenuToggle` component from `src/components/NavigationMenu/MobileMenuToggle.tsx`:

```typescript
import MobileMenuToggle from '../NavigationMenu/MobileMenuToggle';

// In Header component
<MobileMenuToggle
  isOpen={isMenuOpen}
  onClick={toggleMenu}
/>
```

The existing component already implements:
- Two horizontal red lines
- Click handler for menu toggle
- ARIA labels for accessibility
- Responsive visibility (hidden on desktop)

## Component Reuse Strategy

### Existing Components to Reuse

1. **Logo** (`src/components/Logo/Logo.tsx`)
   - Already implements 60-80px height
   - Has click handler for homepage navigation
   - Includes accessibility features

2. **NavigationMenu** (`src/components/NavigationMenu/NavigationMenu.tsx`)
   - Already implements five menu items
   - Has uppercase, bold, wide letter spacing
   - Includes hover states and keyboard navigation
   - Has mobile hamburger menu
   - **Enhancement needed**: Add active state styling

3. **CTAButtons** (`src/components/CTAButtons/CTAButtons.tsx`)
   - Already implements pill-shaped buttons
   - Has correct colors and hover states
   - Includes click handlers

4. **HeroImage** (`src/components/HeroImage/HeroImage.tsx`)
   - Already implements lazy loading
   - Has error handling
   - Supports WebP with fallbacks

5. **MobileMenuToggle** (`src/components/NavigationMenu/MobileMenuToggle.tsx`)
   - Already implements two horizontal lines
   - Has red color styling
   - Includes ARIA labels

### New Components to Create

1. **FranchisePage** - Main page component
2. **Header** - Sticky header container (different from HeroSection's header)
3. **FranchiseHeroSection** - Hero section specific to franchise page

### Configuration Updates

Update `src/config/navigation.ts` to support active state:

```typescript
export const getActiveMenuItem = (currentPath: string): string | null => {
  const item = defaultNavigationConfig.menuItems.find(
    item => item.path === currentPath
  );
  return item ? item.path : null;
};
```

## Responsive Design Strategy

### Breakpoint Strategy

- **Mobile** (320px - 767px): Logo + Hamburger only, min-height 300px
- **Tablet** (768px - 1023px): Logo + Hamburger only, min-height 400px
- **Desktop** (1024px+): Full header layout, min-height 500px

### Layout Adjustments

```typescript
const getHeroMinHeight = (layout: LayoutType): string => {
  switch (layout) {
    case 'mobile':
      return '300px';
    case 'tablet':
      return '400px';
    case 'desktop':
    default:
      return 'max(500px, 60vh)';
  }
};

const getTitleFontSize = (layout: LayoutType): string => {
  switch (layout) {
    case 'mobile':
      return 'clamp(2rem, 6vw, 3rem)'; // text-4xl to text-5xl
    case 'tablet':
      return 'clamp(3rem, 7vw, 4rem)'; // text-5xl to text-6xl
    case 'desktop':
    default:
      return 'clamp(4rem, 8vw, 6rem)'; // text-7xl to text-8xl
  }
};
```

### Touch Target Sizes

Ensure all interactive elements meet minimum touch target size (44x44px):

```css
.menuLink,
.ctaButton,
.mobileMenuToggle {
  min-height: 44px;
  min-width: 44px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
}
```

## Color Palette

```typescript
const colors = {
  // Primary colors
  red: '#DC2626',        // CTA buttons, active links, hamburger icon
  darkRed: '#B91C1C',    // Hover state for red buttons
  
  // Neutral colors
  white: '#FFFFFF',      // Header background, button text
  grayBlack: '#1F2937',  // Navigation text
  
  // Shadow colors
  shadowLight: 'rgba(0, 0, 0, 0.1)',  // Header shadow
  shadowDark: 'rgba(0, 0, 0, 0.5)',   // Title text shadow
};
```

### Color Contrast Verification

All color combinations meet WCAG AA standards (4.5:1 for text, 3:1 for UI components):

- Gray-black (#1F2937) on white (#FFFFFF): 11.6:1 ✓
- Red (#DC2626) on white (#FFFFFF): 4.5:1 ✓
- White (#FFFFFF) on red (#DC2626): 4.5:1 ✓
- Red (#DC2626) on white (#FFFFFF) for hamburger: 4.5:1 ✓

## Integration with Existing Codebase

### File Structure

```
src/
├── components/
│   ├── FranchisePage/
│   │   ├── FranchisePage.tsx
│   │   ├── FranchisePage.module.css
│   │   ├── FranchisePage.test.tsx
│   │   └── index.ts
│   ├── Header/
│   │   ├── Header.tsx
│   │   ├── Header.module.css
│   │   ├── Header.test.tsx
│   │   └── index.ts
│   ├── FranchiseHeroSection/
│   │   ├── FranchiseHeroSection.tsx
│   │   ├── FranchiseHeroSection.module.css
│   │   ├── FranchiseHeroSection.test.tsx
│   │   └── index.ts
│   └── [existing components...]
├── config/
│   └── navigation.ts (update with active state support)
└── types/
    └── index.ts (add new interfaces)
```

### Type Definitions

Add to `src/types/index.ts`:

```typescript
export interface HeaderProps {
  onNavigate?: (path: string) => void;
  activePath?: string;
}

export interface FranchisePageProps {
  heroImageSrc: string;
  heroImageAlt: string;
  onNavigate?: (path: string) => void;
}

export interface FranchiseHeroSectionProps {
  imageSrc: string;
  imageAlt: string;
  title?: string;
}
```

### Routing Integration

```typescript
// App.tsx or routing configuration
import FranchisePage from './components/FranchisePage';

const routes = [
  {
    path: '/franchise',
    element: (
      <FranchisePage
        heroImageSrc="/images/franchise-hero.jpg"
        heroImageAlt="Vietnamese cuisine including bánh mì, phở, and chả giò"
        onNavigate={handleNavigate}
      />
    )
  },
  // ... other routes
];
```

## Summary

This design document provides a comprehensive blueprint for implementing the Franchise page. The implementation will:

1. Reuse existing components (Logo, NavigationMenu, CTAButtons, HeroImage, MobileMenuToggle) for consistency
2. Create new components (FranchisePage, Header, FranchiseHeroSection) for page-specific layout
3. Implement sticky header positioning (different from homepage's absolute positioning)
4. Support active navigation state to highlight the FRANCHISE link
5. Maintain responsive design across all viewport sizes (320px - 1920px)
6. Follow accessibility best practices (WCAG 2.1 AA compliance)
7. Optimize performance through image optimization and efficient rendering
8. Integrate seamlessly with the existing codebase architecture

The design maintains consistency with the hero-section-homepage implementation while adapting the layout to match the franchise page requirements.
