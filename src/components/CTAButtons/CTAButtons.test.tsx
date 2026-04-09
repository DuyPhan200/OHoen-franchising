import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import CTAButtons from './CTAButtons';

describe('CTAButtons', () => {
  it('should render both ORDER PICKUP and ORDER DELIVERY buttons', () => {
    const mockPickup = vi.fn();
    const mockDelivery = vi.fn();

    render(<CTAButtons onOrderPickup={mockPickup} onOrderDelivery={mockDelivery} />);

    expect(screen.getByText('ORDER PICKUP')).toBeInTheDocument();
    expect(screen.getByText('ORDER DELIVERY')).toBeInTheDocument();
  });

  it('should call onOrderPickup when ORDER PICKUP button is clicked', () => {
    const mockPickup = vi.fn();
    const mockDelivery = vi.fn();

    render(<CTAButtons onOrderPickup={mockPickup} onOrderDelivery={mockDelivery} />);

    const pickupButton = screen.getByText('ORDER PICKUP');
    fireEvent.click(pickupButton);

    expect(mockPickup).toHaveBeenCalledTimes(1);
    expect(mockDelivery).not.toHaveBeenCalled();
  });

  it('should call onOrderDelivery when ORDER DELIVERY button is clicked', () => {
    const mockPickup = vi.fn();
    const mockDelivery = vi.fn();

    render(<CTAButtons onOrderPickup={mockPickup} onOrderDelivery={mockDelivery} />);

    const deliveryButton = screen.getByText('ORDER DELIVERY');
    fireEvent.click(deliveryButton);

    expect(mockDelivery).toHaveBeenCalledTimes(1);
    expect(mockPickup).not.toHaveBeenCalled();
  });

  it('should have proper aria-labels for accessibility', () => {
    const mockPickup = vi.fn();
    const mockDelivery = vi.fn();

    render(<CTAButtons onOrderPickup={mockPickup} onOrderDelivery={mockDelivery} />);

    expect(screen.getByLabelText('Order pickup')).toBeInTheDocument();
    expect(screen.getByLabelText('Order delivery')).toBeInTheDocument();
  });

  it('should apply hover styles on mouse enter', () => {
    const mockPickup = vi.fn();
    const mockDelivery = vi.fn();

    render(<CTAButtons onOrderPickup={mockPickup} onOrderDelivery={mockDelivery} />);

    const pickupButton = screen.getByText('ORDER PICKUP');
    const deliveryButton = screen.getByText('ORDER DELIVERY');

    // Verify buttons have CSS classes (CSS Modules hash the names)
    expect(pickupButton.className).toContain('pickupButton');
    expect(deliveryButton.className).toContain('deliveryButton');
  });

  it('should have distinct visual styling for both buttons', () => {
    const mockPickup = vi.fn();
    const mockDelivery = vi.fn();

    render(<CTAButtons onOrderPickup={mockPickup} onOrderDelivery={mockDelivery} />);

    const pickupButton = screen.getByText('ORDER PICKUP');
    const deliveryButton = screen.getByText('ORDER DELIVERY');

    // Both buttons should have the base ctaButton class (CSS Modules hash the names)
    expect(pickupButton.className).toContain('ctaButton');
    expect(deliveryButton.className).toContain('ctaButton');

    // Each button should have its unique class
    expect(pickupButton.className).toContain('pickupButton');
    expect(deliveryButton.className).toContain('deliveryButton');
  });
});
