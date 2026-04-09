# Bún Mee Website - Hero Section

A responsive, accessible hero section component for the Bún Mee Vietnamese restaurant website.

## Project Structure

```
src/
├── components/
│   ├── HeroSection/       # Main hero section container
│   ├── Logo/              # Brand logo component
│   ├── NavigationMenu/    # Navigation menu with 5 items
│   ├── CTAButtons/        # Order pickup/delivery buttons
│   ├── HeroImage/         # Optimized hero image component
│   └── BackgroundPattern/ # Decorative background pattern
├── config/
│   └── navigation.ts      # Navigation configuration
├── types/
│   └── index.ts          # TypeScript type definitions
├── test/
│   └── setup.ts          # Test configuration
├── App.tsx               # Main application component
└── main.tsx              # Application entry point
```

## Features

- **Responsive Design**: Adapts to viewport sizes from 320px to 1920px
- **Accessibility**: WCAG 2.1 AA compliant with keyboard navigation
- **Performance**: Optimized image loading with lazy loading support
- **TypeScript**: Full type safety with comprehensive interfaces
- **CSS Modules**: Component-scoped styling

## Getting Started

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

### Build

```bash
npm run build
```

### Testing

```bash
npm test
```

## Components

### HeroSection
Main container component that orchestrates all child components.

### Logo
Displays "Bún Mee" brand text with click handler for homepage navigation.

### NavigationMenu
Horizontal navigation menu with five items:
- LOCATIONS
- MENU
- CATERING
- FRANCHISE
- ABOUT US

### CTAButtons
Two prominent call-to-action buttons:
- ORDER PICKUP
- ORDER DELIVERY

### HeroImage
Optimized image component with lazy loading and error handling.

### BackgroundPattern
Decorative repeating "BÚN MEE" text pattern with reduced opacity.

## Configuration

Navigation items and CTA buttons can be configured in `src/config/navigation.ts`.

## Technology Stack

- React 18
- TypeScript 5
- Vite 5
- CSS Modules
- Vitest for testing