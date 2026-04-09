import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import HeroImage from './HeroImage';
import { getErrorLogs, clearErrorLogs } from '../../utils/errorHandling';

describe('HeroImage - Error Handling', () => {
  beforeEach(() => {
    clearErrorLogs();
    vi.clearAllMocks();
  });

  it('should try fallback image when primary image fails', async () => {
    render(
      <HeroImage
        src="/broken-image.jpg"
        alt="Test hero image"
        fallbackSrc="/fallback-image.jpg"
      />
    );

    const image = screen.getByAltText('Test hero image');
    expect(image).toHaveAttribute('src', '/broken-image.jpg');

    // Simulate image load error
    image.dispatchEvent(new Event('error'));

    await waitFor(() => {
      const updatedImage = screen.getByAltText('Test hero image');
      expect(updatedImage).toHaveAttribute('src', '/fallback-image.jpg');
    });
  });

  it('should use default fallback SVG when custom fallback also fails', async () => {
    render(
      <HeroImage
        src="/broken-image.jpg"
        alt="Test hero image"
        fallbackSrc="/broken-fallback.jpg"
      />
    );

    const image = screen.getByAltText('Test hero image');

    // First error - tries custom fallback
    image.dispatchEvent(new Event('error'));

    await waitFor(() => {
      const updatedImage = screen.getByAltText('Test hero image');
      expect(updatedImage).toHaveAttribute('src', '/broken-fallback.jpg');
    });

    // Second error - tries default SVG fallback
    const fallbackImage = screen.getByAltText('Test hero image');
    fallbackImage.dispatchEvent(new Event('error'));

    await waitFor(() => {
      const finalImage = screen.getByAltText('Test hero image');
      expect(finalImage).toHaveAttribute('src', expect.stringContaining('data:image/svg+xml'));
    });
  });

  it('should show error message when all fallbacks fail', async () => {
    render(
      <HeroImage
        src="/broken-image.jpg"
        alt="Test hero image"
      />
    );

    const image = screen.getByAltText('Test hero image');

    // First error - tries default SVG fallback
    image.dispatchEvent(new Event('error'));

    await waitFor(() => {
      const updatedImage = screen.getByAltText('Test hero image');
      expect(updatedImage).toHaveAttribute('src', expect.stringContaining('data:image/svg+xml'));
    });

    // Second error - shows error message
    const fallbackImage = screen.getByAltText('Test hero image');
    fallbackImage.dispatchEvent(new Event('error'));

    await waitFor(() => {
      expect(screen.getByText(/Unable to load image/i)).toBeInTheDocument();
      expect(screen.getByRole('alert')).toBeInTheDocument();
    });
  });

  it('should log error when image fails to load', async () => {
    const consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

    render(
      <HeroImage
        src="/broken-image.jpg"
        alt="Test hero image"
      />
    );

    const image = screen.getByAltText('Test hero image');
    image.dispatchEvent(new Event('error'));

    await waitFor(() => {
      const errors = getErrorLogs();
      expect(errors.length).toBeGreaterThan(0);
      expect(errors[0].type).toBe('image_load_failed');
      expect(errors[0].message).toBe('Hero image failed to load');
    });

    consoleErrorSpy.mockRestore();
  });

  it('should include metadata in error logs', async () => {
    const consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

    render(
      <HeroImage
        src="/broken-image.jpg"
        alt="Test hero image"
      />
    );

    const image = screen.getByAltText('Test hero image');
    image.dispatchEvent(new Event('error'));

    await waitFor(() => {
      const errors = getErrorLogs();
      expect(errors[0].metadata).toMatchObject({
        src: '/broken-image.jpg',
        alt: 'Test hero image',
        retryCount: 0,
      });
    });

    consoleErrorSpy.mockRestore();
  });

  it('should track retry count in error logs', async () => {
    const consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

    render(
      <HeroImage
        src="/broken-image.jpg"
        alt="Test hero image"
        fallbackSrc="/fallback.jpg"
      />
    );

    const image = screen.getByAltText('Test hero image');

    // First error
    image.dispatchEvent(new Event('error'));

    await waitFor(() => {
      const errors = getErrorLogs();
      expect(errors[0].metadata?.retryCount).toBe(0);
    });

    // Second error
    const fallbackImage = screen.getByAltText('Test hero image');
    fallbackImage.dispatchEvent(new Event('error'));

    await waitFor(() => {
      const errors = getErrorLogs();
      expect(errors[errors.length - 1].metadata?.retryCount).toBe(1);
    });

    consoleErrorSpy.mockRestore();
  });

  it('should not show error state when image loads successfully', async () => {
    render(
      <HeroImage
        src="/valid-image.jpg"
        alt="Test hero image"
      />
    );

    const image = screen.getByAltText('Test hero image');
    image.dispatchEvent(new Event('load'));

    await waitFor(() => {
      expect(screen.queryByText(/Unable to load image/i)).not.toBeInTheDocument();
      expect(screen.queryByRole('alert')).not.toBeInTheDocument();
    });
  });

  it('should clear loading state on error', async () => {
    const { container } = render(
      <HeroImage
        src="/broken-image.jpg"
        alt="Test hero image"
        placeholder="/placeholder.jpg"
      />
    );

    // Initially loading
    expect(container.querySelector('.placeholder')).toBeInTheDocument();

    const image = screen.getByAltText('Test hero image');
    image.dispatchEvent(new Event('error'));

    await waitFor(() => {
      // Loading state should be cleared
      expect(container.querySelector('.placeholder')).not.toBeInTheDocument();
    });
  });

  it('should provide user-friendly error message', async () => {
    render(
      <HeroImage
        src="/broken-image.jpg"
        alt="Test hero image"
      />
    );

    const image = screen.getByAltText('Test hero image');
    
    // Trigger errors to reach error state
    image.dispatchEvent(new Event('error'));
    
    await waitFor(() => {
      const fallbackImage = screen.getByAltText('Test hero image');
      fallbackImage.dispatchEvent(new Event('error'));
    });

    await waitFor(() => {
      const errorMessage = screen.getByText(/Unable to load image/i);
      expect(errorMessage).toBeInTheDocument();
      expect(errorMessage.textContent).toContain('Please check your connection and try again');
    });
  });
});
