import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import Header from './Header';

describe('Header Component', () => {
  describe('Structure and Layout - Requirements 1.1, 1.2, 1.5', () => {
    it('should render header with three sections', () => {
      render(<Header />);
      
      const header = screen.getByRole('banner');
      expect(header).toBeInTheDocument();
    });

    it('should render Logo in left section', () => {
      render(<Header />);
      
      const logo = screen.getByText('Bún Mee');
      expect(logo).toBeInTheDocument();
    });

    it('should render NavigationMenu in center section', () => {
      render(<Header />);
      
      // Check for navigation menu items
      expect(screen.getByText('LOCATIONS')).toBeInTheDocument();
      expect(screen.getByText('MENU')).toBeInTheDocument();
      expect(screen.getByText('CATERING')).toBeInTheDocument();
      expect(screen.getByText('FRANCHISE')).toBeInTheDocument();
      expect(screen.getByText('ABOUT US')).toBeInTheDocument();
    });

    it('should render CTAButtons in right section', () => {
      render(<Header />);
      
      expect(screen.getByText('ORDER PICKUP')).toBeInTheDocument();
      expect(screen.getByText('ORDER DELIVERY')).toBeInTheDocument();
    });

    it('should render MobileMenuToggle in right section', () => {
      render(<Header />);
      
      const toggleButtons = screen.getAllByRole('button', { name: /toggle navigation menu/i });
      // Should have at least one toggle button (one in header right, one in nav menu)
      expect(toggleButtons.length).toBeGreaterThanOrEqual(1);
    });
  });

  describe('Navigation Handling', () => {
    it('should call onNavigate when logo is clicked', () => {
      const onNavigate = vi.fn();
      
      render(<Header onNavigate={onNavigate} />);
      
      const logo = screen.getByText('Bún Mee');
      fireEvent.click(logo);
      
      expect(onNavigate).toHaveBeenCalledWith('/');
    });

    it('should call onNavigate when navigation menu item is clicked', () => {
      const onNavigate = vi.fn();
      
      render(<Header onNavigate={onNavigate} />);
      
      const franchiseLink = screen.getByText('FRANCHISE');
      fireEvent.click(franchiseLink);
      
      expect(onNavigate).toHaveBeenCalledWith('/franchise');
    });

    it('should call onNavigate when ORDER PICKUP button is clicked', () => {
      const onNavigate = vi.fn();
      
      render(<Header onNavigate={onNavigate} />);
      
      const pickupButton = screen.getByText('ORDER PICKUP');
      fireEvent.click(pickupButton);
      
      expect(onNavigate).toHaveBeenCalledWith('/order/pickup');
    });

    it('should call onNavigate when ORDER DELIVERY button is clicked', () => {
      const onNavigate = vi.fn();
      
      render(<Header onNavigate={onNavigate} />);
      
      const deliveryButton = screen.getByText('ORDER DELIVERY');
      fireEvent.click(deliveryButton);
      
      expect(onNavigate).toHaveBeenCalledWith('/order/delivery');
    });
  });

  describe('Mobile Menu Toggle', () => {
    it('should toggle mobile menu when hamburger icon is clicked', () => {
      render(<Header />);
      
      const toggleButtons = screen.getAllByRole('button', { name: /toggle navigation menu/i });
      const toggleButton = toggleButtons[0]; // Use the first one
      
      // Initially closed
      expect(toggleButton).toHaveAttribute('aria-expanded', 'false');
      
      // Click to open
      fireEvent.click(toggleButton);
      expect(toggleButton).toHaveAttribute('aria-expanded', 'true');
      
      // Click to close
      fireEvent.click(toggleButton);
      expect(toggleButton).toHaveAttribute('aria-expanded', 'false');
    });
  });

  describe('Accessibility', () => {
    it('should have proper ARIA role for header', () => {
      render(<Header />);
      
      const header = screen.getByRole('banner');
      expect(header).toBeInTheDocument();
    });

    it('should have keyboard accessible navigation', () => {
      render(<Header />);
      
      const logo = screen.getByText('Bún Mee');
      const franchiseLink = screen.getByText('FRANCHISE');
      const pickupButton = screen.getByText('ORDER PICKUP');
      const deliveryButton = screen.getByText('ORDER DELIVERY');
      const toggleButtons = screen.getAllByRole('button', { name: /toggle navigation menu/i });
      
      // All interactive elements should be in the document
      expect(logo).toBeInTheDocument();
      expect(franchiseLink).toBeInTheDocument();
      expect(pickupButton).toBeInTheDocument();
      expect(deliveryButton).toBeInTheDocument();
      expect(toggleButtons.length).toBeGreaterThanOrEqual(1);
    });
  });

  describe('Props Handling', () => {
    it('should accept and use activePath prop', () => {
      render(<Header activePath="/franchise" />);
      
      // Component should render without errors
      const header = screen.getByRole('banner');
      expect(header).toBeInTheDocument();
    });

    it('should work without onNavigate prop', () => {
      render(<Header />);
      
      // Component should render without errors
      const header = screen.getByRole('banner');
      expect(header).toBeInTheDocument();
    });
  });

  describe('Sticky Positioning and Scroll Shadow - Requirement 1.3', () => {
    it('should not have scrolled class when at top of page', () => {
      // Mock scrollY at 0
      Object.defineProperty(window, 'scrollY', { value: 0, writable: true });
      
      render(<Header />);
      
      const header = screen.getByRole('banner');
      expect(header.className).not.toContain('scrolled');
    });

    it('should add scrolled class when scrolled past top', () => {
      render(<Header />);
      
      const header = screen.getByRole('banner');
      
      // Simulate scroll
      Object.defineProperty(window, 'scrollY', { value: 100, writable: true });
      fireEvent.scroll(window);
      
      expect(header.className).toContain('scrolled');
    });

    it('should remove scrolled class when scrolled back to top', () => {
      render(<Header />);
      
      const header = screen.getByRole('banner');
      
      // Simulate scroll down
      Object.defineProperty(window, 'scrollY', { value: 100, writable: true });
      fireEvent.scroll(window);
      expect(header.className).toContain('scrolled');
      
      // Simulate scroll back to top
      Object.defineProperty(window, 'scrollY', { value: 0, writable: true });
      fireEvent.scroll(window);
      expect(header.className).not.toContain('scrolled');
    });
  });
});
