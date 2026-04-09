import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import FranchisePage from './FranchisePage';

/**
 * Accessibility tests for FranchisePage
 * Verifies Task 8.1 requirements: semantic HTML and ARIA attributes
 * Requirements: 9.1, 9.2, 9.5, 9.6
 */
describe('FranchisePage Accessibility (Task 8.1)', () => {
  const defaultProps = {
    heroImageSrc: '/test-hero.jpg',
    heroImageAlt: 'Test hero image',
    onNavigate: vi.fn(),
  };

  describe('Requirement 9.1: Semantic HTML elements', () => {
    it('should use <header role="banner"> for Header component', () => {
      render(<FranchisePage {...defaultProps} />);
      
      const header = screen.getByRole('banner');
      expect(header).toBeInTheDocument();
      expect(header.tagName).toBe('HEADER');
    });

    it('should use <nav role="navigation"> in NavigationMenu', () => {
      render(<FranchisePage {...defaultProps} />);
      
      const nav = screen.getByRole('navigation');
      expect(nav).toBeInTheDocument();
      expect(nav.tagName).toBe('NAV');
    });

    it('should use <section role="main"> for hero section', () => {
      render(<FranchisePage {...defaultProps} />);
      
      const main = screen.getByRole('main');
      expect(main).toBeInTheDocument();
      expect(main.tagName).toBe('SECTION');
    });
  });

  describe('Requirement 9.2: Logo descriptive alt text', () => {
    it('should ensure Logo has descriptive aria-label', () => {
      render(<FranchisePage {...defaultProps} />);
      
      const logo = screen.getByRole('button', { name: /Bún Mee Homepage/i });
      expect(logo).toBeInTheDocument();
      expect(logo).toHaveAttribute('aria-label');
    });
  });

  describe('Requirement 9.5: MobileMenuToggle ARIA attributes', () => {
    it('should add aria-label to MobileMenuToggle', () => {
      render(<FranchisePage {...defaultProps} />);
      
      const toggleButtons = screen.getAllByRole('button', { name: /toggle navigation menu/i });
      expect(toggleButtons.length).toBeGreaterThan(0);
      
      toggleButtons.forEach(button => {
        expect(button).toHaveAttribute('aria-label');
      });
    });

    it('should add aria-expanded to MobileMenuToggle', () => {
      render(<FranchisePage {...defaultProps} />);
      
      const toggleButtons = screen.getAllByRole('button', { name: /toggle navigation menu/i });
      
      toggleButtons.forEach(button => {
        expect(button).toHaveAttribute('aria-expanded');
      });
    });

    it('should add aria-controls to MobileMenuToggle', () => {
      render(<FranchisePage {...defaultProps} />);
      
      const toggleButtons = screen.getAllByRole('button', { name: /toggle navigation menu/i });
      
      toggleButtons.forEach(button => {
        expect(button).toHaveAttribute('aria-controls', 'mobile-menu');
      });
    });
  });

  describe('Requirement 9.6: Navigation menu ARIA labels', () => {
    it('should have aria-label on navigation element', () => {
      render(<FranchisePage {...defaultProps} />);
      
      const nav = screen.getByRole('navigation', { name: /main navigation/i });
      expect(nav).toBeInTheDocument();
      expect(nav).toHaveAttribute('aria-label', 'Main navigation');
    });
  });

  describe('Overall semantic structure', () => {
    it('should have proper heading hierarchy with h1 in hero section', () => {
      render(<FranchisePage {...defaultProps} />);
      
      const heading = screen.getByRole('heading', { level: 1 });
      expect(heading).toBeInTheDocument();
      expect(heading).toHaveTextContent('FRANCHISE');
    });

    it('should have all interactive elements as proper buttons or links', () => {
      render(<FranchisePage {...defaultProps} />);
      
      // Logo should be a button
      const logo = screen.getByRole('button', { name: /Bún Mee Homepage/i });
      expect(logo).toBeInTheDocument();
      
      // Navigation links should be links
      const links = screen.getAllByRole('link');
      expect(links.length).toBeGreaterThan(0);
      
      // CTA buttons should be buttons
      const buttons = screen.getAllByRole('button');
      expect(buttons.length).toBeGreaterThan(0);
    });
  });
});
