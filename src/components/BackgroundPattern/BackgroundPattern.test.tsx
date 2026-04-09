import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import BackgroundPattern from './BackgroundPattern';

describe('BackgroundPattern', () => {
  it('should render repeating pattern text', () => {
    const { container } = render(<BackgroundPattern />);
    const patternTexts = container.querySelectorAll('span');
    
    // Should render 20 instances of the pattern text
    expect(patternTexts.length).toBe(20);
    
    // Each should contain "BÚN MEE"
    patternTexts.forEach((span) => {
      expect(span.textContent).toBe('BÚN MEE');
    });
  });

  it('should apply custom text when provided', () => {
    const customText = 'CUSTOM TEXT';
    const { container } = render(<BackgroundPattern text={customText} />);
    const patternTexts = container.querySelectorAll('span');
    
    patternTexts.forEach((span) => {
      expect(span.textContent).toBe(customText);
    });
  });

  it('should apply default opacity of 0.05', () => {
    const { container } = render(<BackgroundPattern />);
    const patternDiv = container.firstChild as HTMLElement;
    
    expect(patternDiv.style.opacity).toBe('0.05');
  });

  it('should apply custom opacity when provided', () => {
    const customOpacity = 0.1;
    const { container } = render(<BackgroundPattern opacity={customOpacity} />);
    const patternDiv = container.firstChild as HTMLElement;
    
    expect(patternDiv.style.opacity).toBe('0.1');
  });

  it('should have aria-hidden attribute for accessibility', () => {
    const { container } = render(<BackgroundPattern />);
    const patternDiv = container.firstChild as HTMLElement;
    
    expect(patternDiv.getAttribute('aria-hidden')).toBe('true');
  });

  it('should have proper CSS class for positioning', () => {
    const { container } = render(<BackgroundPattern />);
    const patternDiv = container.firstChild as HTMLElement;
    
    // Should have the pattern class which includes position: absolute
    expect(patternDiv.className).toContain('pattern');
  });
});
