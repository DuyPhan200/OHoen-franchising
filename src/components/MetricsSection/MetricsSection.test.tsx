import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import MetricsSection from './MetricsSection';

describe('MetricsSection', () => {
  it('should render metrics section', () => {
    const { container } = render(<MetricsSection />);
    
    const section = container.querySelector('section');
    expect(section).toBeInTheDocument();
  });

  it('should render 3 metric cards by default', () => {
    const { container } = render(<MetricsSection />);
    
    const cards = container.querySelectorAll('[class*="card"]');
    expect(cards).toHaveLength(3);
  });

  it('should render first metric with correct value', () => {
    render(<MetricsSection />);
    
    expect(screen.getByText('100.000')).toBeInTheDocument();
    expect(screen.getByText('Tô cháo được phục vụ')).toBeInTheDocument();
  });

  it('should render second metric with correct value', () => {
    render(<MetricsSection />);
    
    expect(screen.getByText('1.000')).toBeInTheDocument();
    expect(screen.getByText('Nước mắm Nam Ô sử dụng')).toBeInTheDocument();
  });

  it('should render third metric with correct value', () => {
    render(<MetricsSection />);
    
    expect(screen.getByText('Đánh giá tích cực')).toBeInTheDocument();
  });

  it('should render prefix symbols', () => {
    const { container } = render(<MetricsSection />);
    
    const prefixes = container.querySelectorAll('[class*="prefix"]');
    expect(prefixes.length).toBeGreaterThan(0);
  });

  it('should render suffix symbols', () => {
    const { container } = render(<MetricsSection />);
    
    const suffixes = container.querySelectorAll('[class*="suffix"]');
    expect(suffixes.length).toBeGreaterThan(0);
  });

  it('should render icons', () => {
    const { container } = render(<MetricsSection />);
    
    const icons = container.querySelectorAll('svg');
    expect(icons).toHaveLength(3);
  });

  it('should render custom metrics when provided', () => {
    const customMetrics = [
      {
        icon: 'star' as const,
        value: '500',
        prefix: '>',
        label: 'Custom Metric'
      }
    ];

    render(<MetricsSection metrics={customMetrics} />);
    
    expect(screen.getByText('500')).toBeInTheDocument();
    expect(screen.getByText('Custom Metric')).toBeInTheDocument();
  });
});
