import { describe, it, expect, vi } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import HeroImage from './HeroImage';

describe('HeroImage', () => {
  it('renders image with correct src and alt text', () => {
    render(
      <HeroImage
        src="/test-image.jpg"
        alt="Test hero image"
      />
    );

    const image = screen.getByAltText('Test hero image');
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute('src', '/test-image.jpg');
  });

  it('renders with lazy loading by default', () => {
    render(
      <HeroImage
        src="/test-image.jpg"
        alt="Test hero image"
      />
    );

    const image = screen.getByAltText('Test hero image');
    expect(image).toHaveAttribute('loading', 'lazy');
  });

  it('renders with eager loading when specified', () => {
    render(
      <HeroImage
        src="/test-image.jpg"
        alt="Test hero image"
        loading="eager"
      />
    );

    const image = screen.getByAltText('Test hero image');
    expect(image).toHaveAttribute('loading', 'eager');
  });

  it('displays placeholder while loading', () => {
    const { container } = render(
      <HeroImage
        src="/test-image.jpg"
        alt="Test hero image"
        placeholder="/placeholder.jpg"
      />
    );

    const placeholder = container.querySelector('img[aria-hidden="true"]');
    expect(placeholder).toBeInTheDocument();
    expect(placeholder).toHaveAttribute('src', '/placeholder.jpg');
  });

  it('hides placeholder after image loads', async () => {
    const { container } = render(
      <HeroImage
        src="/test-image.jpg"
        alt="Test hero image"
        placeholder="/placeholder.jpg"
      />
    );

    const image = screen.getByAltText('Test hero image');
    
    // Simulate image load
    image.dispatchEvent(new Event('load'));

    await waitFor(() => {
      const placeholder = container.querySelector('.placeholder');
      expect(placeholder).not.toBeInTheDocument();
    });
  });

  it('displays error message when image fails to load', async () => {
    const consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
    
    render(
      <HeroImage
        src="/broken-image.jpg"
        alt="Test hero image"
      />
    );

    const image = screen.getByAltText('Test hero image');
    
    // Simulate first error - should try fallback
    image.dispatchEvent(new Event('error'));

    await waitFor(() => {
      // After first error, it should load the fallback SVG
      const updatedImage = screen.getByAltText('Test hero image');
      expect(updatedImage).toHaveAttribute('src', expect.stringContaining('data:image/svg+xml'));
    });

    // Simulate second error on fallback - should show error message
    const fallbackImage = screen.getByAltText('Test hero image');
    fallbackImage.dispatchEvent(new Event('error'));

    await waitFor(() => {
      expect(screen.getByText(/Unable to load image/i)).toBeInTheDocument();
      expect(screen.getByRole('alert')).toBeInTheDocument();
    });

    expect(consoleErrorSpy).toHaveBeenCalled();
    consoleErrorSpy.mockRestore();
  });

  it('renders picture element with WebP source when webpSrc is provided', () => {
    const { container } = render(
      <HeroImage
        src="/test-image.jpg"
        alt="Test hero image"
        webpSrc="/test-image.webp"
      />
    );

    const picture = container.querySelector('picture');
    expect(picture).toBeInTheDocument();

    const webpSource = container.querySelector('source[type="image/webp"]');
    expect(webpSource).toBeInTheDocument();
    expect(webpSource).toHaveAttribute('srcset', '/test-image.webp');
  });

  it('renders responsive srcset for different viewport sizes', () => {
    const { container } = render(
      <HeroImage
        src="/test-image.jpg"
        alt="Test hero image"
        srcSet="/test-image-320w.jpg 320w, /test-image-768w.jpg 768w, /test-image-1920w.jpg 1920w"
        webpSrc="/test-image.webp"
        webpSrcSet="/test-image-320w.webp 320w, /test-image-768w.webp 768w, /test-image-1920w.webp 1920w"
      />
    );

    const webpSource = container.querySelector('source[type="image/webp"]');
    expect(webpSource).toHaveAttribute('srcset', '/test-image-320w.webp 320w, /test-image-768w.webp 768w, /test-image-1920w.webp 1920w');

    const fallbackSource = container.querySelectorAll('source')[1];
    expect(fallbackSource).toHaveAttribute('srcset', '/test-image-320w.jpg 320w, /test-image-768w.jpg 768w, /test-image-1920w.jpg 1920w');
  });

  it('works without WebP sources (fallback only)', () => {
    render(
      <HeroImage
        src="/test-image.jpg"
        alt="Test hero image"
      />
    );

    const image = screen.getByAltText('Test hero image');
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute('src', '/test-image.jpg');
  });
});
