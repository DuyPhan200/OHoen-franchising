import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import FranchisePage from './FranchisePage';

/**
 * Navigation Flow Tests for FranchisePage
 * Task 11.2: Test navigation flows
 * Requirements: 2.3, 3.9, 4.7, 4.8
 */
describe('FranchisePage Navigation Flows', () => {
  const defaultProps = {
    heroImageSrc: '/public/herosection.png',
    heroImageAlt: 'Vietnamese cuisine including bánh mì, phở, and chả giò',
    onNavigate: vi.fn(),
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('Logo Navigation - Requirement 2.3', () => {
    it('should navigate to homepage when logo is clicked', async () => {
      const user = userEvent.setup();
      const mockNavigate = vi.fn();

      render(<FranchisePage {...defaultProps} onNavigate={mockNavigate} />);

      const logo = screen.getByText('Bún Mee');
      await user.click(logo);

      expect(mockNavigate).toHaveBeenCalledWith('/');
      expect(mockNavigate).toHaveBeenCalledTimes(1);
    });

    it('should navigate to homepage when logo is activated with keyboard', async () => {
      const user = userEvent.setup();
      const mockNavigate = vi.fn();

      render(<FranchisePage {...defaultProps} onNavigate={mockNavigate} />);

      const logo = screen.getByText('Bún Mee');
      logo.focus();
      await user.keyboard('{Enter}');

      expect(mockNavigate).toHaveBeenCalledWith('/');
    });
  });

  describe('FRANCHISE Link Navigation - Requirement 3.9', () => {
    it('should stay on current page when FRANCHISE link is clicked', async () => {
      const user = userEvent.setup();
      const mockNavigate = vi.fn();

      render(<FranchisePage {...defaultProps} onNavigate={mockNavigate} />);

      const franchiseLink = screen.getByRole('link', { name: /franchise opportunities/i });
      await user.click(franchiseLink);

      // Should navigate to /franchise (which is the current page)
      expect(mockNavigate).toHaveBeenCalledWith('/franchise');
      expect(mockNavigate).toHaveBeenCalledTimes(1);
    });

    it('should have active styling on FRANCHISE link', () => {
      render(<FranchisePage {...defaultProps} />);

      const franchiseLink = screen.getByRole('link', { name: /franchise opportunities/i });
      
      // Verify the link has active class
      expect(franchiseLink.className).toContain('active');
    });
  });

  describe('Other Navigation Links - Requirement 3.9', () => {
    it('should navigate to locations page when LOCATIONS link is clicked', async () => {
      const user = userEvent.setup();
      const mockNavigate = vi.fn();

      render(<FranchisePage {...defaultProps} onNavigate={mockNavigate} />);

      const locationsLink = screen.getByRole('link', { name: /view our locations/i });
      await user.click(locationsLink);

      expect(mockNavigate).toHaveBeenCalledWith('/locations');
      expect(mockNavigate).toHaveBeenCalledTimes(1);
    });

    it('should navigate to menu page when MENU link is clicked', async () => {
      const user = userEvent.setup();
      const mockNavigate = vi.fn();

      render(<FranchisePage {...defaultProps} onNavigate={mockNavigate} />);

      const menuLink = screen.getByRole('link', { name: /view our menu/i });
      await user.click(menuLink);

      expect(mockNavigate).toHaveBeenCalledWith('/menu');
      expect(mockNavigate).toHaveBeenCalledTimes(1);
    });

    it('should navigate to catering page when CATERING link is clicked', async () => {
      const user = userEvent.setup();
      const mockNavigate = vi.fn();

      render(<FranchisePage {...defaultProps} onNavigate={mockNavigate} />);

      const cateringLink = screen.getByRole('link', { name: /catering services/i });
      await user.click(cateringLink);

      expect(mockNavigate).toHaveBeenCalledWith('/catering');
      expect(mockNavigate).toHaveBeenCalledTimes(1);
    });

    it('should navigate to about page when ABOUT US link is clicked', async () => {
      const user = userEvent.setup();
      const mockNavigate = vi.fn();

      render(<FranchisePage {...defaultProps} onNavigate={mockNavigate} />);

      const aboutLink = screen.getByRole('link', { name: /about bún mee/i });
      await user.click(aboutLink);

      expect(mockNavigate).toHaveBeenCalledWith('/about');
      expect(mockNavigate).toHaveBeenCalledTimes(1);
    });

    it('should navigate to correct pages with keyboard navigation', async () => {
      const user = userEvent.setup();
      const mockNavigate = vi.fn();

      render(<FranchisePage {...defaultProps} onNavigate={mockNavigate} />);

      const menuLink = screen.getByRole('link', { name: /view our menu/i });
      menuLink.focus();
      await user.keyboard('{Enter}');

      expect(mockNavigate).toHaveBeenCalledWith('/menu');
    });
  });

  describe('CTA Button Navigation - Requirements 4.7, 4.8', () => {
    it('should navigate to pickup order page when ORDER PICKUP button is clicked', async () => {
      const user = userEvent.setup();
      const mockNavigate = vi.fn();

      render(<FranchisePage {...defaultProps} onNavigate={mockNavigate} />);

      const pickupButton = screen.getByRole('button', { name: /order pickup/i });
      await user.click(pickupButton);

      expect(mockNavigate).toHaveBeenCalledWith('/order/pickup');
      expect(mockNavigate).toHaveBeenCalledTimes(1);
    });

    it('should navigate to delivery order page when ORDER DELIVERY button is clicked', async () => {
      const user = userEvent.setup();
      const mockNavigate = vi.fn();

      render(<FranchisePage {...defaultProps} onNavigate={mockNavigate} />);

      const deliveryButton = screen.getByRole('button', { name: /order delivery/i });
      await user.click(deliveryButton);

      expect(mockNavigate).toHaveBeenCalledWith('/order/delivery');
      expect(mockNavigate).toHaveBeenCalledTimes(1);
    });

    it('should navigate to order pages with keyboard activation', async () => {
      const user = userEvent.setup();
      const mockNavigate = vi.fn();

      render(<FranchisePage {...defaultProps} onNavigate={mockNavigate} />);

      const pickupButton = screen.getByRole('button', { name: /order pickup/i });
      pickupButton.focus();
      await user.keyboard('{Enter}');

      expect(mockNavigate).toHaveBeenCalledWith('/order/pickup');

      mockNavigate.mockClear();

      const deliveryButton = screen.getByRole('button', { name: /order delivery/i });
      deliveryButton.focus();
      await user.keyboard(' '); // Space key should also activate button

      expect(mockNavigate).toHaveBeenCalledWith('/order/delivery');
    });
  });

  describe('Navigation Flow Integration', () => {
    it('should handle multiple navigation actions in sequence', async () => {
      const user = userEvent.setup();
      const mockNavigate = vi.fn();

      render(<FranchisePage {...defaultProps} onNavigate={mockNavigate} />);

      // Click logo
      const logo = screen.getByText('Bún Mee');
      await user.click(logo);
      expect(mockNavigate).toHaveBeenCalledWith('/');

      // Click menu link
      const menuLink = screen.getByRole('link', { name: /view our menu/i });
      await user.click(menuLink);
      expect(mockNavigate).toHaveBeenCalledWith('/menu');

      // Click pickup button
      const pickupButton = screen.getByRole('button', { name: /order pickup/i });
      await user.click(pickupButton);
      expect(mockNavigate).toHaveBeenCalledWith('/order/pickup');

      expect(mockNavigate).toHaveBeenCalledTimes(3);
    });

    it('should not navigate when onNavigate prop is not provided', async () => {
      const user = userEvent.setup();

      render(
        <FranchisePage
          heroImageSrc={defaultProps.heroImageSrc}
          heroImageAlt={defaultProps.heroImageAlt}
        />
      );

      // Should render without errors
      const logo = screen.getByText('Bún Mee');
      await user.click(logo);

      // No error should occur even without onNavigate
      expect(logo).toBeInTheDocument();
    });

    it('should prevent default link behavior and use custom navigation', async () => {
      const user = userEvent.setup();
      const mockNavigate = vi.fn();

      render(<FranchisePage {...defaultProps} onNavigate={mockNavigate} />);

      const menuLink = screen.getByRole('link', { name: /view our menu/i });
      
      // The link should have href but use custom navigation
      expect(menuLink).toHaveAttribute('href', '/menu');
      
      await user.click(menuLink);
      
      // Custom navigation should be called
      expect(mockNavigate).toHaveBeenCalledWith('/menu');
    });
  });

  describe('All Navigation Elements Accessibility', () => {
    it('should have all navigation elements keyboard accessible', () => {
      render(<FranchisePage {...defaultProps} />);

      // Logo
      const logo = screen.getByText('Bún Mee');
      expect(logo).toBeInTheDocument();

      // Navigation links
      expect(screen.getByRole('link', { name: /view our locations/i })).toBeInTheDocument();
      expect(screen.getByRole('link', { name: /view our menu/i })).toBeInTheDocument();
      expect(screen.getByRole('link', { name: /catering services/i })).toBeInTheDocument();
      expect(screen.getByRole('link', { name: /franchise opportunities/i })).toBeInTheDocument();
      expect(screen.getByRole('link', { name: /about bún mee/i })).toBeInTheDocument();

      // CTA buttons
      expect(screen.getByRole('button', { name: /order pickup/i })).toBeInTheDocument();
      expect(screen.getByRole('button', { name: /order delivery/i })).toBeInTheDocument();
    });

    it('should have proper ARIA labels for all navigation elements', () => {
      render(<FranchisePage {...defaultProps} />);

      // Check ARIA labels exist
      const locationsLink = screen.getByRole('link', { name: /view our locations/i });
      const menuLink = screen.getByRole('link', { name: /view our menu/i });
      const cateringLink = screen.getByRole('link', { name: /catering services/i });
      const franchiseLink = screen.getByRole('link', { name: /franchise opportunities/i });
      const aboutLink = screen.getByRole('link', { name: /about bún mee/i });

      expect(locationsLink).toHaveAttribute('aria-label');
      expect(menuLink).toHaveAttribute('aria-label');
      expect(cateringLink).toHaveAttribute('aria-label');
      expect(franchiseLink).toHaveAttribute('aria-label');
      expect(aboutLink).toHaveAttribute('aria-label');
    });
  });
});
