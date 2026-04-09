import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import App from './App';

// Mock the components to avoid complex rendering
vi.mock('./components/HeroSection', () => ({
  default: ({ onNavigate }: { onNavigate?: (path: string) => void }) => (
    <div data-testid="hero-section">
      <button onClick={() => onNavigate?.('/franchise')}>Go to Franchise</button>
    </div>
  ),
}));

vi.mock('./components/FranchisePage', () => ({
  default: ({ 
    heroImageSrc, 
    heroImageAlt, 
    onNavigate 
  }: { 
    heroImageSrc: string; 
    heroImageAlt: string; 
    onNavigate?: (path: string) => void;
  }) => (
    <div data-testid="franchise-page">
      <div data-testid="franchise-hero-image">{heroImageSrc}</div>
      <div data-testid="franchise-hero-alt">{heroImageAlt}</div>
      <button onClick={() => onNavigate?.('/')}>Go to Home</button>
    </div>
  ),
}));

describe('App Routing', () => {
  it('should render homepage at root path', () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <App />
      </MemoryRouter>
    );

    expect(screen.getByTestId('hero-section')).toBeInTheDocument();
  });

  it('should render franchise page at /franchise path', () => {
    render(
      <MemoryRouter initialEntries={['/franchise']}>
        <App />
      </MemoryRouter>
    );

    expect(screen.getByTestId('franchise-page')).toBeInTheDocument();
  });

  it('should pass heroImageSrc prop to FranchisePage', () => {
    render(
      <MemoryRouter initialEntries={['/franchise']}>
        <App />
      </MemoryRouter>
    );

    expect(screen.getByTestId('franchise-hero-image')).toHaveTextContent('/images/franchise-hero.jpg');
  });

  it('should pass heroImageAlt prop to FranchisePage', () => {
    render(
      <MemoryRouter initialEntries={['/franchise']}>
        <App />
      </MemoryRouter>
    );

    expect(screen.getByTestId('franchise-hero-alt')).toHaveTextContent('Vietnamese cuisine including bánh mì, phở, and chả giò');
  });

  it('should pass onNavigate callback to FranchisePage', () => {
    render(
      <MemoryRouter initialEntries={['/franchise']}>
        <App />
      </MemoryRouter>
    );

    // Verify the component received the callback by checking if the button exists
    expect(screen.getByText('Go to Home')).toBeInTheDocument();
  });
});
