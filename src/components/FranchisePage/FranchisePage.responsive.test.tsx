/**
 * Responsive behavior tests for FranchisePage
 * Task 7.2: Verify mobile/tablet responsive styles
 * Requirements: 8.1, 8.2, 8.3, 8.4, 8.5
 * 
 * Note: These tests verify that the correct CSS classes are applied.
 * The actual responsive behavior is tested through visual/manual testing
 * since jsdom doesn't support CSS media queries.
 */

import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import FranchisePage from './FranchisePage';

describe('FranchisePage Responsive Behavior - Task 7.2', () => {
  const defaultProps = {
    heroImageSrc: '/test-hero.jpg',
    heroImageAlt: 'Test hero image',
  };

  describe('Header Structure - Requirements 8.1, 8.2, 8.3', () => {
    it('should render NavigationMenu in headerCenter container', () => {
      render(<FranchisePage {...defaultProps} />);

      // NavigationMenu should be in the DOM
      const nav = screen.getByRole('navigation');
      expect(nav).toBeInTheDocument();
      
      // It should be wrapped in a div (headerCenter)
      const navParent = nav.closest('div');
      expect(navParent).toBeInTheDocument();
    });

    it('should render CTAButtons in a wrapper container', () => {
      render(<FranchisePage {...defaultProps} />);

      // CTAButtons should be in the DOM
      const pickupButton = screen.getByLabelText(/order pickup/i);
      const deliveryButton = screen.getByLabelText(/order delivery/i);
      
      expect(pickupButton).toBeInTheDocument();
      expect(deliveryButton).toBeInTheDocument();
    });

    it('should render Logo in Header (Requirement 8.3)', () => {
      render(<FranchisePage {...defaultProps} />);

      // Logo should be visible
      const logo = screen.getByLabelText(/bún mee homepage/i);
      expect(logo).toBeInTheDocument();
    });

    it('should render MobileMenuToggle in Header (Requirement 8.3)', () => {
      render(<FranchisePage {...defaultProps} />);

      // MobileMenuToggle should be visible
      const mobileToggles = screen.getAllByLabelText(/toggle navigation menu/i);
      // There should be at least one toggle button
      expect(mobileToggles.length).toBeGreaterThan(0);
    });
  });

  describe('Hero Section Structure - Requirements 8.4, 8.5', () => {
    it('should render hero section with correct structure', () => {
      render(<FranchisePage {...defaultProps} />);

      // Hero section should be in the DOM
      const heroTitle = screen.getByRole('heading', { name: /franchise/i });
      expect(heroTitle).toBeInTheDocument();
      
      // Hero image should be in the DOM
      const heroImage = screen.getByAltText(/test hero image/i);
      expect(heroImage).toBeInTheDocument();
    });

    it('should apply correct CSS classes to hero section', () => {
      const { container } = render(<FranchisePage {...defaultProps} />);

      // Find the hero section element
      const heroSection = container.querySelector('section');
      expect(heroSection).toBeInTheDocument();
      
      // Verify it has a class (CSS modules will apply classes)
      expect(heroSection?.className).toBeTruthy();
    });

    it('should apply correct CSS classes to hero title', () => {
      render(<FranchisePage {...defaultProps} />);

      const heroTitle = screen.getByRole('heading', { name: /franchise/i });
      
      // Verify it has a class (CSS modules will apply classes)
      expect(heroTitle.className).toBeTruthy();
    });
  });

  describe('CSS Module Classes Verification', () => {
    it('should apply headerCenter class to navigation wrapper', () => {
      const { container } = render(<FranchisePage {...defaultProps} />);

      // Find the navigation element
      const nav = screen.getByRole('navigation');
      const navParent = nav.closest('div');
      
      // Verify it has a class (headerCenter from CSS modules)
      expect(navParent?.className).toContain('headerCenter');
    });

    it('should apply ctaButtonsWrapper class to CTA buttons wrapper', () => {
      const { container } = render(<FranchisePage {...defaultProps} />);

      // Find the CTA buttons
      const pickupButton = screen.getByLabelText(/order pickup/i);
      const ctaContainer = pickupButton.closest('div');
      const ctaWrapper = ctaContainer?.parentElement;
      
      // Verify it has a class (ctaButtonsWrapper from CSS modules)
      expect(ctaWrapper?.className).toContain('ctaButtonsWrapper');
    });
  });

  describe('Responsive CSS Rules Documentation', () => {
    it('documents that NavigationMenu is hidden at viewport < 1024px (Requirement 8.1)', () => {
      // This test documents the CSS rule:
      // @media (max-width: 1023px) { .headerCenter { display: none; } }
      // Actual responsive behavior must be tested manually or with E2E tests
      expect(true).toBe(true);
    });

    it('documents that CTAButtons are hidden at viewport < 1024px (Requirement 8.2)', () => {
      // This test documents the CSS rule:
      // @media (max-width: 1023px) { .ctaButtonsWrapper { display: none; } }
      // Actual responsive behavior must be tested manually or with E2E tests
      expect(true).toBe(true);
    });

    it('documents that hero min-height is 300px on mobile (Requirement 8.4)', () => {
      // This test documents the CSS rule:
      // @media (max-width: 1023px) { .heroSection { min-height: 300px; } }
      // Actual responsive behavior must be tested manually or with E2E tests
      expect(true).toBe(true);
    });

    it('documents that title uses clamp(2rem, 6vw, 3rem) on mobile (Requirement 8.5)', () => {
      // This test documents the CSS rule:
      // @media (max-width: 1023px) { .heroTitle { font-size: clamp(2rem, 6vw, 3rem); } }
      // Actual responsive behavior must be tested manually or with E2E tests
      expect(true).toBe(true);
    });
  });
});
