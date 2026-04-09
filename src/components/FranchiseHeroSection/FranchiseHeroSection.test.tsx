import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import FranchiseHeroSection from './FranchiseHeroSection';
import styles from './FranchiseHeroSection.module.css';

describe('FranchiseHeroSection', () => {
  const defaultProps = {
    imageSrc: '/test-image.jpg',
    imageAlt: 'Test hero image',
  };

  it('should render hero section with image and title', () => {
    const { container } = render(<FranchiseHeroSection {...defaultProps} />);
    
    const section = container.querySelector('section');
    expect(section).toBeInTheDocument();
    
    const title = screen.getByRole('heading', { level: 1 });
    expect(title).toBeInTheDocument();
    expect(title).toHaveTextContent('FRANCHISE');
  });

  it('should render with default title "FRANCHISE"', () => {
    render(<FranchiseHeroSection {...defaultProps} />);
    
    const title = screen.getByRole('heading', { level: 1 });
    expect(title).toHaveTextContent('FRANCHISE');
  });

  it('should render with custom title when provided', () => {
    render(<FranchiseHeroSection {...defaultProps} title="CUSTOM TITLE" />);
    
    const title = screen.getByRole('heading', { level: 1 });
    expect(title).toHaveTextContent('CUSTOM TITLE');
  });

  it('should pass imageSrc to HeroImage component', () => {
    render(<FranchiseHeroSection {...defaultProps} />);
    
    const image = screen.getByAltText('Test hero image');
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute('src', '/test-image.jpg');
  });

  it('should pass imageAlt to HeroImage component', () => {
    render(<FranchiseHeroSection {...defaultProps} />);
    
    const image = screen.getByAltText('Test hero image');
    expect(image).toBeInTheDocument();
  });

  it('should use eager loading for hero image', () => {
    render(<FranchiseHeroSection {...defaultProps} />);
    
    const image = screen.getByAltText('Test hero image');
    expect(image).toHaveAttribute('loading', 'eager');
  });

  it('should apply heroSection CSS class to container', () => {
    const { container } = render(<FranchiseHeroSection {...defaultProps} />);
    
    const section = container.querySelector('section');
    expect(section).toHaveClass(styles.heroSection);
  });

  it('should apply imageWrapper CSS class to image container', () => {
    const { container } = render(<FranchiseHeroSection {...defaultProps} />);
    
    const imageWrapper = container.querySelector(`.${styles.imageWrapper}`);
    expect(imageWrapper).toBeInTheDocument();
  });

  it('should apply heroTitle CSS class to title', () => {
    render(<FranchiseHeroSection {...defaultProps} />);
    
    const title = screen.getByRole('heading', { level: 1 });
    expect(title).toHaveClass(styles.heroTitle);
  });

  it('should render title as h1 element', () => {
    render(<FranchiseHeroSection {...defaultProps} />);
    
    const title = screen.getByRole('heading', { level: 1 });
    expect(title.tagName).toBe('H1');
  });

  it('should have role="main" for accessibility (Requirement 9.6)', () => {
    render(<FranchiseHeroSection {...defaultProps} />);
    
    const mainSection = screen.getByRole('main');
    expect(mainSection).toBeInTheDocument();
    expect(mainSection.tagName).toBe('SECTION');
  });
});
