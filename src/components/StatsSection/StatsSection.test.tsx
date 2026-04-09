import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import StatsSection from './StatsSection';

describe('StatsSection', () => {
  it('should render stats section', () => {
    render(<StatsSection />);
    
    const section = screen.getByRole('region');
    expect(section).toBeInTheDocument();
  });

  it('should render default stats with 5 cards', () => {
    const { container } = render(<StatsSection />);
    
    const statCards = container.querySelectorAll('[class*="statCard"]');
    expect(statCards).toHaveLength(5);
  });

  it('should render first stat card with correct content', () => {
    render(<StatsSection />);
    
    expect(screen.getByText('$1.76M')).toBeInTheDocument();
    expect(screen.getByText('Average Gross Sales 2024')).toBeInTheDocument();
  });

  it('should render second stat card with correct content', () => {
    render(<StatsSection />);
    
    expect(screen.getByText('$4.68M AUV')).toBeInTheDocument();
    expect(screen.getByText('(Non-traditional Location)')).toBeInTheDocument();
  });

  it('should render custom stats when provided', () => {
    const customStats = [
      {
        value: '$100K',
        title: 'Custom Title 1',
        subtitle: 'Custom Subtitle 1'
      },
      {
        value: '$200K',
        title: 'Custom Title 2',
        subtitle: 'Custom Subtitle 2'
      },
      {
        value: '$300K',
        title: 'Custom Title 3',
        subtitle: 'Custom Subtitle 3'
      },
      {
        value: '$400K',
        title: 'Custom Title 4',
        subtitle: 'Custom Subtitle 4'
      },
      {
        value: '$500K',
        title: 'Custom Title 5',
        subtitle: 'Custom Subtitle 5'
      }
    ];

    render(<StatsSection stats={customStats} />);
    
    expect(screen.getByText('$100K')).toBeInTheDocument();
    expect(screen.getByText('Custom Title 1')).toBeInTheDocument();
    expect(screen.getByText('$500K')).toBeInTheDocument();
  });

  it('should have correct layout structure', () => {
    const { container } = render(<StatsSection />);
    
    const topRow = container.querySelector('[class*="topRow"]');
    const bottomRow = container.querySelector('[class*="bottomRow"]');
    
    expect(topRow).toBeInTheDocument();
    expect(bottomRow).toBeInTheDocument();
  });

  it('should render 3 cards in top row', () => {
    const { container } = render(<StatsSection />);
    
    const topRow = container.querySelector('[class*="topRow"]');
    const topRowCards = topRow?.querySelectorAll('[class*="statCard"]');
    
    expect(topRowCards).toHaveLength(3);
  });

  it('should render 2 cards in bottom row', () => {
    const { container } = render(<StatsSection />);
    
    const bottomRow = container.querySelector('[class*="bottomRow"]');
    const bottomRowCards = bottomRow?.querySelectorAll('[class*="statCard"]');
    
    expect(bottomRowCards).toHaveLength(2);
  });
});
