import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import HeroSection from './HeroSection';

describe('HeroSection', () => {
  const defaultProps = {
    heroImageSrc: '/test-image.jpg',
    heroImageAlt: 'Test hero image',
  };

  it('should render all child components', () => {
    render(<HeroSection {...defaultProps} />);

    // Check Logo is rendered
    expect(screen.getByText('Bún Mee')).toBeInTheDocument();

    // Check Navigation Menu items are rendered
    expect(screen.getByText('LOCATIONS')).toBeInTheDocument();
    expect(screen.getByText('MENU')).toBeInTheDocument();
    expect(screen.getByText('CATERING')).toBeInTheDocument();
    expect(screen.getByText('FRANCHISE')).toBeInTheDocument();
    expect(screen.getByText('ABOUT US')).toBeInTheDocument();

    // Check CTA Buttons are rendered
    expect(screen.getByText('ORDER PICKUP')).toBeInTheDocument();
    expect(screen.getByText('ORDER DELIVERY')).toBeInTheDocument();
  });

  it('should render title when provided', () => {
    render(
      <HeroSection
        {...defaultProps}
        title="Welcome to Bún Mee"
      />
    );

    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('Welcome to Bún Mee');
  });

  it('should not render title when not provided', () => {
    render(<HeroSection {...defaultProps} />);

    expect(screen.queryByRole('heading', { level: 1 })).not.toBeInTheDocument();
  });

  it('should call onNavigate when logo is clicked', () => {
    const mockNavigate = vi.fn();

    render(
      <HeroSection
        {...defaultProps}
        onNavigate={mockNavigate}
      />
    );

    const logo = screen.getByText('Bún Mee');
    fireEvent.click(logo);

    expect(mockNavigate).toHaveBeenCalledWith('/');
  });

  it('should call onNavigate when menu item is clicked', () => {
    const mockNavigate = vi.fn();

    render(
      <HeroSection
        {...defaultProps}
        onNavigate={mockNavigate}
      />
    );

    const menuItem = screen.getByText('MENU');
    fireEvent.click(menuItem);

    expect(mockNavigate).toHaveBeenCalledWith('/menu');
  });

  it('should call onNavigate when ORDER PICKUP button is clicked', () => {
    const mockNavigate = vi.fn();

    render(
      <HeroSection
        {...defaultProps}
        onNavigate={mockNavigate}
      />
    );

    const pickupButton = screen.getByText('ORDER PICKUP');
    fireEvent.click(pickupButton);

    expect(mockNavigate).toHaveBeenCalledWith('/order/pickup');
  });

  it('should call onNavigate when ORDER DELIVERY button is clicked', () => {
    const mockNavigate = vi.fn();

    render(
      <HeroSection
        {...defaultProps}
        onNavigate={mockNavigate}
      />
    );

    const deliveryButton = screen.getByText('ORDER DELIVERY');
    fireEvent.click(deliveryButton);

    expect(mockNavigate).toHaveBeenCalledWith('/order/delivery');
  });

  it('should have proper semantic HTML structure', () => {
    const { container } = render(<HeroSection {...defaultProps} />);

    // Check for section with banner role
    const section = container.querySelector('section[role="banner"]');
    expect(section).toBeInTheDocument();

    // Check for header element
    const header = container.querySelector('header');
    expect(header).toBeInTheDocument();
  });

  it('should render hero image with correct props', () => {
    render(
      <HeroSection
        heroImageSrc="/hero.jpg"
        heroImageAlt="Vietnamese dishes"
      />
    );

    const image = screen.getByAltText('Vietnamese dishes');
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute('src', '/hero.jpg');
  });

  it('should render background pattern', async () => {
    render(<HeroSection {...defaultProps} />);

    // Wait for the lazy-loaded BackgroundPattern component to render
    // The pattern text should appear after lazy loading completes (multiple instances)
    const patternTexts = await screen.findAllByText('BÚN MEE', {}, { timeout: 2000 });
    expect(patternTexts.length).toBeGreaterThan(0);
  });
});
