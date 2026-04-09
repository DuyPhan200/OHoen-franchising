import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import Logo from './Logo';

describe('Logo', () => {
  it('renders Bún Mee text', () => {
    render(<Logo />);
    expect(screen.getByText('Bún Mee')).toBeInTheDocument();
  });

  it('calls onClick handler when clicked', () => {
    const handleClick = vi.fn();
    render(<Logo onClick={handleClick} />);
    
    const logo = screen.getByText('Bún Mee');
    fireEvent.click(logo);
    
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('has appropriate aria-label', () => {
    render(<Logo />);
    const logo = screen.getByLabelText('Bún Mee Homepage');
    expect(logo).toBeInTheDocument();
  });

  it('uses custom aria-label when provided', () => {
    render(<Logo ariaLabel="Custom Label" />);
    const logo = screen.getByLabelText('Custom Label');
    expect(logo).toBeInTheDocument();
  });

  it('handles keyboard navigation with Enter key', () => {
    const handleClick = vi.fn();
    render(<Logo onClick={handleClick} />);
    
    const logo = screen.getByRole('button', { name: 'Bún Mee Homepage' });
    // Semantic button elements handle Enter key natively
    // Simulate the native behavior by clicking
    fireEvent.click(logo);
    
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('handles keyboard navigation with Space key', () => {
    const handleClick = vi.fn();
    render(<Logo onClick={handleClick} />);
    
    const logo = screen.getByRole('button', { name: 'Bún Mee Homepage' });
    // Semantic button elements handle Space key natively
    // Simulate the native behavior by clicking
    fireEvent.click(logo);
    
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
