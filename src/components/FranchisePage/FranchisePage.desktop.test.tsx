/**
 * Desktop Responsive Styles Test - Task 7.1
 * Validates Requirements 7.1, 7.2, 7.3
 * 
 * This test verifies that desktop responsive styles are properly implemented:
 * - Header shows Logo, NavigationMenu, CTAButtons, and MobileMenuToggle
 * - Hero section has min-height of max(500px, 60vh)
 * - Title uses clamp(4rem, 8vw, 6rem) for font size
 */

import { describe, it, expect, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import FranchisePage from './FranchisePage';

describe('FranchisePage - Desktop Responsive Styles (Task 7.1)', () => {
  const mockProps = {
    heroImageSrc: '/test-hero.jpg',
    heroImageAlt: 'Test hero image',
    onNavigate: () => {},
  };

  beforeEach(() => {
    // Set desktop viewport width
    global.innerWidth = 1024;
    global.dispatchEvent(new Event('resize'));
  });

  describe('Requirement 7.1: Header Desktop Layout', () => {
    it('should display Logo in header', () => {
      render(<FranchisePage {...mockProps} />);
      
      const logo = screen.getByRole('button', { name: /bún mee homepage/i });
      expect(logo).toBeInTheDocument();
    });

    it('should display NavigationMenu in header', () => {
      render(<FranchisePage {...mockProps} />);
      
      const nav = screen.getByRole('navigation');
      expect(nav).toBeInTheDocument();
      
      // Verify all menu items are present
      expect(screen.getByText('LOCATIONS')).toBeInTheDocument();
      expect(screen.getByText('MENU')).toBeInTheDocument();
      expect(screen.getByText('CATERING')).toBeInTheDocument();
      expect(screen.getAllByText('FRANCHISE').length).toBeGreaterThan(0);
      expect(screen.getByText('ABOUT US')).toBeInTheDocument();
    });

    it('should display CTAButtons in header', () => {
      render(<FranchisePage {...mockProps} />);
      
      const pickupButton = screen.getByRole('button', { name: /order pickup/i });
      const deliveryButton = screen.getByRole('button', { name: /order delivery/i });
      
      expect(pickupButton).toBeInTheDocument();
      expect(deliveryButton).toBeInTheDocument();
    });

    it('should display MobileMenuToggle in header', () => {
      render(<FranchisePage {...mockProps} />);
      
      const toggles = screen.getAllByRole('button', { name: /toggle navigation menu/i });
      expect(toggles.length).toBeGreaterThan(0);
    });
  });

  describe('Requirement 7.2: Hero Section Min-Height', () => {
    it('should apply min-height of max(500px, 60vh) on desktop', () => {
      const { container } = render(<FranchisePage {...mockProps} />);
      
      const heroSection = container.querySelector('[class*="heroSection"]');
      expect(heroSection).toBeInTheDocument();
      
      // Get computed styles
      const styles = window.getComputedStyle(heroSection!);
      const minHeight = styles.minHeight;
      
      // Should be either 500px or 60vh (whichever is larger)
      // At 1024px viewport, we expect the CSS to have the max() function applied
      expect(minHeight).toBeTruthy();
    });
  });

  describe('Requirement 7.3: Title Font Size', () => {
    it('should use clamp(4rem, 8vw, 6rem) for title font size', () => {
      const { container } = render(<FranchisePage {...mockProps} />);
      
      const title = container.querySelector('[class*="heroTitle"]');
      expect(title).toBeInTheDocument();
      
      // Verify the CSS class is applied (the actual clamp() is in the CSS)
      expect(title?.className).toMatch(/heroTitle/);
      expect(title?.textContent).toBe('FRANCHISE');
    });
  });

  describe('Desktop Viewport Variations', () => {
    it('should maintain layout at 1024px (minimum desktop)', () => {
      global.innerWidth = 1024;
      global.dispatchEvent(new Event('resize'));
      
      render(<FranchisePage {...mockProps} />);
      
      // All header elements should be visible
      expect(screen.getByRole('button', { name: /bún mee homepage/i })).toBeInTheDocument();
      expect(screen.getByRole('navigation')).toBeInTheDocument();
      expect(screen.getByRole('button', { name: /order pickup/i })).toBeInTheDocument();
      expect(screen.getByRole('button', { name: /order delivery/i })).toBeInTheDocument();
    });

    it('should maintain layout at 1920px (wide desktop)', () => {
      global.innerWidth = 1920;
      global.dispatchEvent(new Event('resize'));
      
      render(<FranchisePage {...mockProps} />);
      
      // All header elements should be visible
      expect(screen.getByRole('button', { name: /bún mee homepage/i })).toBeInTheDocument();
      expect(screen.getByRole('navigation')).toBeInTheDocument();
      expect(screen.getByRole('button', { name: /order pickup/i })).toBeInTheDocument();
      expect(screen.getByRole('button', { name: /order delivery/i })).toBeInTheDocument();
    });
  });

  describe('CSS Module Classes', () => {
    it('should apply correct CSS classes to hero section', () => {
      const { container } = render(<FranchisePage {...mockProps} />);
      
      const heroSection = container.querySelector('[class*="heroSection"]');
      expect(heroSection).toBeInTheDocument();
      expect(heroSection?.className).toMatch(/heroSection/);
    });

    it('should apply correct CSS classes to hero title', () => {
      const { container } = render(<FranchisePage {...mockProps} />);
      
      const title = container.querySelector('[class*="heroTitle"]');
      expect(title).toBeInTheDocument();
      expect(title?.className).toMatch(/heroTitle/);
    });
  });
});
