import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import Notification from './Notification';

describe('Notification', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('should render notification with message', () => {
    render(
      <Notification
        message="Test notification"
        type="error"
      />
    );

    expect(screen.getByText('Test notification')).toBeInTheDocument();
    expect(screen.getByRole('alert')).toBeInTheDocument();
  });

  it('should render error notification with correct styling', () => {
    const { container } = render(
      <Notification
        message="Error message"
        type="error"
      />
    );

    const notification = container.querySelector('.notification');
    expect(notification).toBeInTheDocument();
    expect(notification?.className).toContain('error');
  });

  it('should render warning notification with correct styling', () => {
    const { container } = render(
      <Notification
        message="Warning message"
        type="warning"
      />
    );

    const notification = container.querySelector('.notification');
    expect(notification).toBeInTheDocument();
    expect(notification?.className).toContain('warning');
  });

  it('should render info notification with correct styling', () => {
    const { container } = render(
      <Notification
        message="Info message"
        type="info"
      />
    );

    const notification = container.querySelector('.notification');
    expect(notification).toBeInTheDocument();
    expect(notification?.className).toContain('info');
  });

  it('should auto-close after duration', async () => {
    const onClose = vi.fn();
    const { container } = render(
      <Notification
        message="Test notification"
        type="info"
        duration={1000}
        onClose={onClose}
      />
    );

    expect(screen.getByText('Test notification')).toBeInTheDocument();

    // Fast-forward time
    vi.advanceTimersByTime(1000);

    await waitFor(() => {
      expect(container.querySelector('.notification')).not.toBeInTheDocument();
    });
  });

  it('should not auto-close when duration is 0', async () => {
    const onClose = vi.fn();
    const { container } = render(
      <Notification
        message="Test notification"
        type="info"
        duration={0}
        onClose={onClose}
      />
    );

    expect(screen.getByText('Test notification')).toBeInTheDocument();

    // Fast-forward time
    vi.advanceTimersByTime(10000);

    // Should still be visible
    expect(container.querySelector('.notification')).toBeInTheDocument();
    expect(onClose).not.toHaveBeenCalled();
  });

  it('should close when close button is clicked', async () => {
    const onClose = vi.fn();
    const { container } = render(
      <Notification
        message="Test notification"
        type="info"
        onClose={onClose}
      />
    );

    const closeButton = screen.getByLabelText('Close notification');
    fireEvent.click(closeButton);

    await waitFor(() => {
      expect(container.querySelector('.notification')).not.toBeInTheDocument();
    });
  });

  it('should have accessible close button', () => {
    render(
      <Notification
        message="Test notification"
        type="info"
      />
    );

    const closeButton = screen.getByLabelText('Close notification');
    expect(closeButton).toBeInTheDocument();
    expect(closeButton).toHaveAttribute('aria-label', 'Close notification');
  });

  it('should have aria-live="polite" for screen readers', () => {
    render(
      <Notification
        message="Test notification"
        type="info"
      />
    );

    const alert = screen.getByRole('alert');
    expect(alert).toHaveAttribute('aria-live', 'polite');
  });

  it('should display appropriate icon for each type', () => {
    const { rerender } = render(
      <Notification
        message="Error"
        type="error"
      />
    );
    expect(screen.getByText('⚠️')).toBeInTheDocument();

    rerender(
      <Notification
        message="Warning"
        type="warning"
      />
    );
    expect(screen.getByText('⚠️')).toBeInTheDocument();

    rerender(
      <Notification
        message="Info"
        type="info"
      />
    );
    expect(screen.getByText('ℹ️')).toBeInTheDocument();
  });
});
