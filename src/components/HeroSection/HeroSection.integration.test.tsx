import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import HeroSection from './HeroSection';

/**
 * Integration tests for HeroSection component wiring
 * Tests Requirements: 1.3, 2.3, 3.3, 3.4, 5.2
 */
describe('HeroSection - Integration Wiring', () => {
  it('should wire logo navigation handler correctly (Requirement 1.3)', () => {
    const mockNavigate = vi.fn();

    render(
      <HeroSection
        title="Test Title"
        heroImageSrc="/test.jpg"
        heroImageAlt="Test image"
        onNavigate={mockNavigate}
      />
    );

    const logo = screen.getByLabelText('Bún Mee');
    fireEvent.click(logo);

    expect(mockNavigate).toHaveBeenCalledWith('/');
  });

  it('should wire navigation menu handlers correctly (Requirement 2.3)', () => {
    const mockNavigate = vi.fn();

    render(
      <HeroSection
        title="Test Title"
        heroImageSrc="/test.jpg"
        heroImageAlt="Test image"
        onNavigate={mockNavigate}
      />
    );

    // Test each menu item
    const menuItems = [
      { label: 'LOCATIONS', path: '/locations' },
      { label: 'MENU', path: '/menu' },
      { label: 'CATERING', path: '/catering' },
      { label: 'FRANCHISE', path: '/franchise' },
      { label: 'ABOUT US', path: '/about' },
    ];

    menuItems.forEach(({ label, path }) => {
      const menuItem = screen.getByText(label);
      fireEvent.click(menuItem);
      expect(mockNavigate).toHaveBeenCalledWith(path);
    });
  });

  it('should wire CTA button handlers correctly (Requirements 3.3, 3.4)', () => {
    const mockNavigate = vi.fn();

    render(
      <HeroSection
        title="Test Title"
        heroImageSrc="/test.jpg"
        heroImageAlt="Test image"
        onNavigate={mockNavigate}
      />
    );

    // Test ORDER PICKUP button
    const pickupButton = screen.getByText('ORDER PICKUP');
    fireEvent.click(pickupButton);
    expect(mockNavigate).toHaveBeenCalledWith('/order/pickup');

    // Test ORDER DELIVERY button
    const deliveryButton = screen.getByText('ORDER DELIVERY');
    fireEvent.click(deliveryButton);
    expect(mockNavigate).toHaveBeenCalledWith('/order/delivery');
  });

  it('should display dynamic title from page context (Requirement 5.2)', () => {
    const { rerender } = render(
      <HeroSection
        title="Welcome to Bún Mee"
        heroImageSrc="/test.jpg"
        heroImageAlt="Test image"
        onNavigate={vi.fn()}
      />
    );

    expect(screen.getByText('Welcome to Bún Mee')).toBeInTheDocument();

    // Update title dynamically
    rerender(
      <HeroSection
        title="Our Menu"
        heroImageSrc="/test.jpg"
        heroImageAlt="Test image"
        onNavigate={vi.fn()}
      />
    );

    expect(screen.getByText('Our Menu')).toBeInTheDocument();
  });

  it('should pass all props correctly through component hierarchy', () => {
    const mockNavigate = vi.fn();

    render(
      <HeroSection
        title="Test Title"
        heroImageSrc="/test-hero.jpg"
        heroImageAlt="Test hero image"
        onNavigate={mockNavigate}
      />
    );

    // Verify all child components receive correct props
    expect(screen.getByLabelText('Bún Mee')).toBeInTheDocument(); // Logo
    expect(screen.getByText('LOCATIONS')).toBeInTheDocument(); // NavigationMenu
    expect(screen.getByText('ORDER PICKUP')).toBeInTheDocument(); // CTAButtons
    expect(screen.getByAltText('Test hero image')).toBeInTheDocument(); // HeroImage
    expect(screen.getByText('Test Title')).toBeInTheDocument(); // Title
  });

  it('should use default configuration from navigation config', () => {
    render(
      <HeroSection
        title="Test Title"
        heroImageSrc="/test.jpg"
        heroImageAlt="Test image"
        onNavigate={vi.fn()}
      />
    );

    // Verify default menu items are rendered
    expect(screen.getByText('LOCATIONS')).toBeInTheDocument();
    expect(screen.getByText('MENU')).toBeInTheDocument();
    expect(screen.getByText('CATERING')).toBeInTheDocument();
    expect(screen.getByText('FRANCHISE')).toBeInTheDocument();
    expect(screen.getByText('ABOUT US')).toBeInTheDocument();

    // Verify default CTA buttons are rendered
    expect(screen.getByText('ORDER PICKUP')).toBeInTheDocument();
    expect(screen.getByText('ORDER DELIVERY')).toBeInTheDocument();
  });

  it('should handle navigation without onNavigate prop gracefully', () => {
    // Should not throw error when onNavigate is not provided
    expect(() => {
      render(
        <HeroSection
          title="Test Title"
          heroImageSrc="/test.jpg"
          heroImageAlt="Test image"
        />
      );
    }).not.toThrow();

    const logo = screen.getByLabelText('Bún Mee');
    
    // Should not throw error when clicking without handler
    expect(() => {
      fireEvent.click(logo);
    }).not.toThrow();
  });
});
