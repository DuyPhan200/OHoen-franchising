import React, { Suspense, lazy, useCallback, startTransition } from 'react';
import { HeroSectionProps } from '../../types';
import { defaultNavigationConfig } from '../../config/navigation';
import Logo from '../Logo';
import NavigationMenu from '../NavigationMenu';
import HeroImage from '../HeroImage';
import styles from './HeroSection.module.css';

// Code splitting: Lazy load BackgroundPattern as it's decorative and non-critical
// Requirement 9.2: Minimize JavaScript execution on initial render
// Note: NavigationMenu and HeroImage are NOT lazy-loaded as they are
// critical above-the-fold content needed for initial render
const BackgroundPattern = lazy(() => import('../BackgroundPattern'));

/**
 * Main Hero Section component
 * Orchestrates all child components including Logo, NavigationMenu, HeroImage, and BackgroundPattern
 * Optimized with code splitting, memoization, and CSS containment (Requirement 9.2)
 * 
 * Performance optimizations:
 * - Lazy loading of non-critical components (BackgroundPattern)
 * - startTransition for non-urgent updates
 * - Memoized callbacks to prevent unnecessary re-renders
 * - CSS containment for layout optimization
 * 
 * Requirements: 1.1, 2.2, 4.1, 5.1, 5.2, 5.3, 5.4, 6.2, 9.2
 */
const HeroSection: React.FC<HeroSectionProps> = ({
  title,
  heroImageSrc,
  heroImageAlt,
  onNavigate,
}) => {
  /**
   * Handle logo click - navigate to homepage
   * Requirement 1.3: Navigate to homepage when logo is clicked
   * Memoized to prevent unnecessary re-renders (Requirement 9.2)
   */
  const handleLogoClick = useCallback(() => {
    // Use startTransition for non-urgent navigation updates
    startTransition(() => {
      onNavigate?.(defaultNavigationConfig.logoLink);
    });
  }, [onNavigate]);

  /**
   * Handle navigation menu item clicks
   * Requirement 2.3: Navigate to corresponding page when menu item is clicked
   * Memoized to prevent unnecessary re-renders (Requirement 9.2)
   */
  const handleMenuNavigate = useCallback((path: string) => {
    // Use startTransition for non-urgent navigation updates
    startTransition(() => {
      onNavigate?.(path);
    });
  }, [onNavigate]);

  return (
    <section className={styles.heroSection} role="banner">
      {/* Layer 1: Background Pattern (z-index: 1) - Requirement 6.2 */}
      {/* Lazy loaded with Suspense for code splitting - Requirement 9.2 */}
      <div className={styles.backgroundPattern}>
        <Suspense fallback={null}>
          <BackgroundPattern />
        </Suspense>
      </div>

      {/* Layer 2: Hero Image (z-index: 2) - Requirement 4.1 */}
      {/* Not lazy-loaded as it's critical above-the-fold content */}
      <div className={styles.imageContainer}>
        <HeroImage
          src={heroImageSrc}
          alt={heroImageAlt}
          loading="eager"
          aspectRatio="16/9"
        />
      </div>

      {/* Layer 3: Header with Logo and Navigation (z-index: 10) */}
      {/* Requirements 1.1, 2.2 */}
      {/* Not lazy-loaded as they're critical above-the-fold content */}
      <header className={styles.header}>
        <Logo
          onClick={handleLogoClick}
          ariaLabel={defaultNavigationConfig.logoText}
        />
        <NavigationMenu
          items={defaultNavigationConfig.menuItems}
          onNavigate={handleMenuNavigate}
        />
      </header>

      {/* Layer 4: Hero Title (z-index: 5) - Requirements 5.1, 5.2, 5.3, 5.4 */}
      {title && (
        <div className={styles.title}>
          <h1>{title}</h1>
        </div>
      )}
    </section>
  );
};

export default HeroSection;
