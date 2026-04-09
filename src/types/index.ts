/**
 * Core type definitions for Hero Section components
 */

// Navigation types
export interface MenuItem {
  label: string;
  path: string;
  ariaLabel?: string;
}

export interface NavigationConfig {
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
}

// Image types
export interface ImageAsset {
  src: string;
  srcSet?: string;
  webp?: string;
  fallback: string;
  alt: string;
  width: number;
  height: number;
}

// Responsive breakpoints
export const breakpoints = {
  mobile: 320,
  tablet: 768,
  desktop: 1024,
  wide: 1920,
} as const;

export type LayoutType = 'mobile' | 'tablet' | 'desktop';

// Component props interfaces
export interface LogoProps {
  onClick?: () => void;
  ariaLabel?: string;
}

export interface NavigationMenuProps {
  items: MenuItem[];
  onNavigate: (path: string) => void;
  isMobile?: boolean;
  activePath?: string;
}

export interface CTAButtonsProps {
  onOrderPickup: () => void;
  onOrderDelivery: () => void;
}

export interface HeroImageProps {
  src: string;
  alt: string;
  loading?: 'lazy' | 'eager';
  placeholder?: string;
  webpSrc?: string;
  srcSet?: string;
  webpSrcSet?: string;
  aspectRatio?: string; // CSS aspect-ratio value (e.g., '16/9', '4/3') to prevent layout shift
  fallbackSrc?: string; // Optional fallback image URL if primary image fails to load
}

export interface BackgroundPatternProps {
  text?: string;
  opacity?: number;
}

export interface HeroSectionProps {
  title?: string;
  heroImageSrc: string;
  heroImageAlt: string;
  onNavigate?: (path: string) => void;
}

// Franchise Page types
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
