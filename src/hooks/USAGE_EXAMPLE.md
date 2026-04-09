# useResponsiveLayout Hook Usage Examples

The useResponsiveLayout hook detects viewport size and returns the current layout type ('mobile', 'tablet', or 'desktop'). It handles orientation changes and prevents layout shift during resize.

## Basic Usage

```tsx
import { useResponsiveLayout } from './hooks';

function MyComponent() {
  const layout = useResponsiveLayout();

  return (
    <div>
      <p>Current layout: {layout}</p>
    </div>
  );
}
```

## Conditional Rendering Based on Layout

```tsx
import { useResponsiveLayout } from './hooks';

function NavigationMenu() {
  const layout = useResponsiveLayout();

  return (
    <nav>
      {layout === 'mobile' ? (
        <MobileMenuToggle />
      ) : (
        <HorizontalMenu />
      )}
    </nav>
  );
}
```

## Applying Different Styles

```tsx
import { useResponsiveLayout } from './hooks';

function HeroSection() {
  const layout = useResponsiveLayout();

  const containerStyle = {
    flexDirection: layout === 'mobile' ? 'column' : 'row',
    padding: layout === 'mobile' ? '1rem' : '2rem',
  };

  return (
    <div style={containerStyle}>
      <Logo />
      <NavigationMenu />
      <CTAButtons />
    </div>
  );
}
```

## Using with CSS Classes

```tsx
import { useResponsiveLayout } from './hooks';
import styles from './Component.module.css';

function Component() {
  const layout = useResponsiveLayout();

  return (
    <div className={styles[layout]}>
      {/* Content adapts based on layout class */}
    </div>
  );
}
```

## Combining Multiple Layout Conditions

```tsx
import { useResponsiveLayout } from './hooks';

function CTAButtons() {
  const layout = useResponsiveLayout();

  const isMobile = layout === 'mobile';
  const isTabletOrMobile = layout === 'mobile' || layout === 'tablet';

  return (
    <div>
      <button style={{ 
        fontSize: isMobile ? '14px' : '16px',
        padding: isTabletOrMobile ? '8px 16px' : '12px 24px'
      }}>
        ORDER PICKUP
      </button>
      <button style={{ 
        fontSize: isMobile ? '14px' : '16px',
        padding: isTabletOrMobile ? '8px 16px' : '12px 24px'
      }}>
        ORDER DELIVERY
      </button>
    </div>
  );
}
```

## Using Breakpoints Directly

```tsx
import { breakpoints } from './hooks';

// Access breakpoint values for custom logic
const customMediaQuery = `(min-width: ${breakpoints.tablet}px)`;

// Use in CSS-in-JS
const styles = {
  container: {
    [`@media (min-width: ${breakpoints.tablet}px)`]: {
      display: 'flex',
    },
  },
};
```

## Advanced: Debouncing Resize Events

For performance-critical applications, you might want to debounce resize events:

```tsx
import { useState, useEffect } from 'react';
import { useResponsiveLayout } from './hooks';

function useDebounceLayout(delay = 150) {
  const layout = useResponsiveLayout();
  const [debouncedLayout, setDebouncedLayout] = useState(layout);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedLayout(layout);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [layout, delay]);

  return debouncedLayout;
}

// Usage
function Component() {
  const layout = useDebounceLayout(200);
  // Layout updates are now debounced by 200ms
}
```

## Breakpoint Reference

The hook uses the following breakpoints:

| Layout   | Viewport Width Range |
|----------|---------------------|
| Mobile   | < 768px             |
| Tablet   | 768px - 1023px      |
| Desktop  | ≥ 1024px            |

Additional breakpoint values available:
- `breakpoints.mobile`: 320px (minimum supported width)
- `breakpoints.tablet`: 768px
- `breakpoints.desktop`: 1024px
- `breakpoints.wide`: 1920px

## Performance Benefits

- **Prevents Layout Shift**: Initializes with correct layout on mount
- **Optimized Re-renders**: Only updates when layout actually changes
- **Orientation Support**: Handles device orientation changes
- **Clean Cleanup**: Properly removes event listeners on unmount

## Browser Support

- Works in all modern browsers that support:
  - `window.innerWidth`
  - `resize` event
  - `orientationchange` event

## Requirements Satisfied

- ✅ 7.4: Detects viewport size and maintains usability across 320px to 1920px
- ✅ 9.4: Handles orientation changes and prevents layout shift during resize

## Best Practices

1. **Use at the top level**: Call the hook in parent components to avoid multiple resize listeners
2. **Combine with CSS**: Use the hook for JavaScript logic, but prefer CSS media queries for styling when possible
3. **Avoid overuse**: Don't call the hook in every component; pass the layout value as props instead
4. **Test thoroughly**: Verify behavior at all breakpoints and during orientation changes

## Example: Complete Hero Section Integration

```tsx
import { useResponsiveLayout } from './hooks';
import Logo from './components/Logo';
import NavigationMenu from './components/NavigationMenu';
import CTAButtons from './components/CTAButtons';
import HeroImage from './components/HeroImage';

function HeroSection() {
  const layout = useResponsiveLayout();

  return (
    <section className={`hero-section hero-section--${layout}`}>
      <header className="hero-section__header">
        <Logo />
        <NavigationMenu isMobile={layout === 'mobile'} />
        <CTAButtons compact={layout === 'mobile'} />
      </header>
      <HeroImage
        src="/images/hero.jpg"
        alt="Vietnamese dishes"
        loading="eager"
      />
    </section>
  );
}
```
