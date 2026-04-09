# HeroSection Integration Guide

This guide explains how to wire the HeroSection component with your application's routing system and page context.

## Requirements Addressed

- **1.3**: Logo navigation to homepage
- **2.3**: Navigation menu item routing
- **3.3**: ORDER PICKUP button navigation
- **3.4**: ORDER DELIVERY button navigation
- **5.2**: Dynamic title integration with page context

## Basic Integration

The HeroSection component is fully wired and ready to use. All navigation handlers are connected through the `onNavigate` prop, and the title is dynamically controlled via the `title` prop.

```tsx
import HeroSection from './components/HeroSection';

function App() {
  const handleNavigate = (path: string) => {
    // Your routing logic here
  };

  return (
    <HeroSection
      title="Welcome to Bún Mee"
      heroImageSrc="/hero-image.jpg"
      heroImageAlt="Delicious Vietnamese dishes"
      onNavigate={handleNavigate}
    />
  );
}
```

## Integration with React Router

```tsx
import { useNavigate } from 'react-router-dom';
import HeroSection from './components/HeroSection';

function HomePage() {
  const navigate = useNavigate();

  const handleNavigate = (path: string) => {
    navigate(path);
  };

  return (
    <HeroSection
      title="Welcome to Bún Mee"
      heroImageSrc="/hero-image.jpg"
      heroImageAlt="Delicious Vietnamese dishes"
      onNavigate={handleNavigate}
    />
  );
}
```

## Integration with Next.js

```tsx
import { useRouter } from 'next/router';
import HeroSection from './components/HeroSection';

export default function HomePage() {
  const router = useRouter();

  const handleNavigate = (path: string) => {
    router.push(path);
  };

  return (
    <HeroSection
      title="Welcome to Bún Mee"
      heroImageSrc="/hero-image.jpg"
      heroImageAlt="Delicious Vietnamese dishes"
      onNavigate={handleNavigate}
    />
  );
}
```

## Dynamic Title Integration

The title can be controlled dynamically based on your page context:

```tsx
import { useState, useEffect } from 'react';
import HeroSection from './components/HeroSection';

function App() {
  const [pageTitle, setPageTitle] = useState('Welcome to Bún Mee');

  // Update title based on route or context
  useEffect(() => {
    // Example: Update based on current route
    const path = window.location.pathname;
    if (path === '/menu') {
      setPageTitle('Our Menu');
    } else if (path === '/locations') {
      setPageTitle('Find Us');
    }
  }, []);

  return (
    <HeroSection
      title={pageTitle}
      heroImageSrc="/hero-image.jpg"
      heroImageAlt="Delicious Vietnamese dishes"
      onNavigate={(path) => window.location.href = path}
    />
  );
}
```

## Navigation Flow

The HeroSection component wires all navigation handlers internally:

1. **Logo Click** → Navigates to `/` (homepage)
2. **Menu Items** → Navigate to their respective paths:
   - LOCATIONS → `/locations`
   - MENU → `/menu`
   - CATERING → `/catering`
   - FRANCHISE → `/franchise`
   - ABOUT US → `/about`
3. **CTA Buttons** → Navigate to order pages:
   - ORDER PICKUP → `/order/pickup`
   - ORDER DELIVERY → `/order/delivery`

All navigation is handled through the single `onNavigate` callback, making it easy to integrate with any routing system.

## Default Configuration

The component uses default configuration from `src/config/navigation.ts`:

```typescript
export const defaultNavigationConfig: NavigationConfig = {
  menuItems: [
    { label: 'LOCATIONS', path: '/locations', ariaLabel: 'View our locations' },
    { label: 'MENU', path: '/menu', ariaLabel: 'View our menu' },
    { label: 'CATERING', path: '/catering', ariaLabel: 'Catering services' },
    { label: 'FRANCHISE', path: '/franchise', ariaLabel: 'Franchise opportunities' },
    { label: 'ABOUT US', path: '/about', ariaLabel: 'About Bún Mee' },
  ],
  logoText: 'Bún Mee',
  logoLink: '/',
  ctaButtons: {
    pickup: { label: 'ORDER PICKUP', link: '/order/pickup' },
    delivery: { label: 'ORDER DELIVERY', link: '/order/delivery' },
  },
};
```

You can customize this configuration by modifying the file or creating your own configuration object.

## Error Handling

The component includes built-in error handling for navigation failures. Make sure to wrap your app with the `NotificationProvider`:

```tsx
import { NotificationProvider } from './components/Notification/NotificationProvider';
import App from './App';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <NotificationProvider>
      <App />
    </NotificationProvider>
  </React.StrictMode>
);
```

This enables automatic error notifications when navigation fails or invalid paths are accessed.

## Props Reference

### HeroSectionProps

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `title` | `string` | No | Dynamic title displayed in the center of the hero section |
| `heroImageSrc` | `string` | Yes | Source URL for the hero background image |
| `heroImageAlt` | `string` | Yes | Alt text for the hero image (accessibility) |
| `onNavigate` | `(path: string) => void` | No | Callback function for all navigation events |

## Complete Example

```tsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, useNavigate, useLocation } from 'react-router-dom';
import { NotificationProvider } from './components/Notification/NotificationProvider';
import HeroSection from './components/HeroSection';

function HomePage() {
  const navigate = useNavigate();
  const location = useLocation();

  // Dynamic title based on route
  const getTitle = () => {
    switch (location.pathname) {
      case '/': return 'Welcome to Bún Mee';
      case '/menu': return 'Our Menu';
      case '/locations': return 'Find Us';
      default: return 'Bún Mee';
    }
  };

  return (
    <HeroSection
      title={getTitle()}
      heroImageSrc="/hero-image.jpg"
      heroImageAlt="Delicious Vietnamese dishes including phở, bánh mì, and chả giò"
      onNavigate={(path) => navigate(path)}
    />
  );
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <NotificationProvider>
      <BrowserRouter>
        <HomePage />
      </BrowserRouter>
    </NotificationProvider>
  </React.StrictMode>
);
```

## Testing Integration

When testing components that use HeroSection, provide a mock navigation handler:

```tsx
import { render, screen, fireEvent } from '@testing-library/react';
import HeroSection from './HeroSection';

test('navigation handlers are called correctly', () => {
  const mockNavigate = jest.fn();

  render(
    <HeroSection
      title="Test Title"
      heroImageSrc="/test.jpg"
      heroImageAlt="Test image"
      onNavigate={mockNavigate}
    />
  );

  // Test logo navigation
  const logo = screen.getByLabelText('Bún Mee');
  fireEvent.click(logo);
  expect(mockNavigate).toHaveBeenCalledWith('/');

  // Test menu navigation
  const menuItem = screen.getByText('MENU');
  fireEvent.click(menuItem);
  expect(mockNavigate).toHaveBeenCalledWith('/menu');

  // Test CTA navigation
  const pickupButton = screen.getByText('ORDER PICKUP');
  fireEvent.click(pickupButton);
  expect(mockNavigate).toHaveBeenCalledWith('/order/pickup');
});
```
