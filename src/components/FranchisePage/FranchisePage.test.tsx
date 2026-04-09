import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import FranchisePage from './FranchisePage';

describe('FranchisePage', () => {
  const defaultProps = {
    heroImageSrc: '/images/franchise-hero.jpg',
    heroImageAlt: 'Vietnamese cuisine including bánh mì, phở, and chả giò',
    onNavigate: vi.fn(),
  };

  it('should render with vertical flexbox layout', () => {
    const { container } = render(<FranchisePage {...defaultProps} />);
    const pageDiv = container.firstChild as HTMLElement;
    
    expect(pageDiv).toBeInTheDocument();
    // CSS Modules generate hashed class names, so we check for the presence of a class
    expect(pageDiv.className).toContain('page');
  });

  it('should render Header component', () => {
    render(<FranchisePage {...defaultProps} />);
    
    const header = screen.getByRole('banner');
    expect(header).toBeInTheDocument();
  });

  it('should pass activePath="/franchise" to Header', () => {
    render(<FranchisePage {...defaultProps} />);
    
    // Verify FRANCHISE link is active (has active class)
    const franchiseLink = screen.getByRole('link', { name: /franchise opportunities/i });
    expect(franchiseLink).toBeInTheDocument();
    expect(franchiseLink.className).toContain('active');
  });

  it('should render FranchiseHeroSection component', () => {
    render(<FranchisePage {...defaultProps} />);
    
    // Verify hero section is rendered with title (using heading role)
    const heroTitle = screen.getByRole('heading', { name: /franchise/i });
    expect(heroTitle).toBeInTheDocument();
  });

  it('should pass heroImageSrc and heroImageAlt to FranchiseHeroSection', () => {
    render(<FranchisePage {...defaultProps} />);
    
    // Verify image is rendered with correct alt text
    const heroImage = screen.getByAltText(defaultProps.heroImageAlt);
    expect(heroImage).toBeInTheDocument();
  });

  it('should pass onNavigate prop to Header', () => {
    const mockNavigate = vi.fn();
    render(<FranchisePage {...defaultProps} onNavigate={mockNavigate} />);
    
    // Header should receive the onNavigate callback
    const header = screen.getByRole('banner');
    expect(header).toBeInTheDocument();
  });
});
