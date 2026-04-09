import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import NavigationMenu from './NavigationMenu';
import { getErrorLogs, clearErrorLogs } from '../../utils/errorHandling';

describe('NavigationMenu - Error Handling', () => {
  const mockNavigate = vi.fn();
  const menuItems = [
    { label: 'LOCATIONS', path: '/locations' },
    { label: 'MENU', path: '/menu' },
    { label: 'INVALID', path: '/invalid-path' },
  ];

  beforeEach(() => {
    clearErrorLogs();
    mockNavigate.mockClear();
    vi.clearAllMocks();
  });

  it('should validate navigation path before calling onNavigate', async () => {
    const consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

    render(
      <NavigationMenu
        items={menuItems}
        onNavigate={mockNavigate}
      />
    );

    // Click valid path
    const locationsLink = screen.getByText('LOCATIONS');
    fireEvent.click(locationsLink);

    expect(mockNavigate).toHaveBeenCalledWith('/locations');

    // Click invalid path
    const invalidLink = screen.getByText('INVALID');
    fireEvent.click(invalidLink);

    // Should not call navigate for invalid path
    expect(mockNavigate).toHaveBeenCalledTimes(1);

    consoleErrorSpy.mockRestore();
  });

  it('should log error for invalid navigation path', async () => {
    const consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

    render(
      <NavigationMenu
        items={menuItems}
        onNavigate={mockNavigate}
      />
    );

    const invalidLink = screen.getByText('INVALID');
    fireEvent.click(invalidLink);

    await waitFor(() => {
      const errors = getErrorLogs();
      expect(errors.length).toBeGreaterThan(0);
      expect(errors[0].type).toBe('invalid_path');
      expect(errors[0].message).toBe('Invalid navigation path');
      expect(errors[0].metadata).toMatchObject({ path: '/invalid-path' });
    });

    consoleErrorSpy.mockRestore();
  });

  it('should show notification for invalid path', async () => {
    const consoleWarnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});
    const eventListener = vi.fn();
    window.addEventListener('hero-notification', eventListener);

    render(
      <NavigationMenu
        items={menuItems}
        onNavigate={mockNavigate}
      />
    );

    const invalidLink = screen.getByText('INVALID');
    fireEvent.click(invalidLink);

    await waitFor(() => {
      expect(eventListener).toHaveBeenCalled();
      const event = eventListener.mock.calls[0][0] as CustomEvent;
      expect(event.detail.message).toContain('not available');
      expect(event.detail.type).toBe('error');
    });

    window.removeEventListener('hero-notification', eventListener);
    consoleWarnSpy.mockRestore();
  });

  it('should handle navigation failure gracefully', async () => {
    const consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
    const consoleWarnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});
    
    // Mock navigate to throw error
    mockNavigate.mockImplementation(() => {
      throw new Error('Navigation failed');
    });

    render(
      <NavigationMenu
        items={[{ label: 'MENU', path: '/menu' }]}
        onNavigate={mockNavigate}
      />
    );

    const menuLink = screen.getByText('MENU');
    fireEvent.click(menuLink);

    await waitFor(() => {
      const errors = getErrorLogs();
      expect(errors.length).toBeGreaterThan(0);
      expect(errors[0].type).toBe('navigation_failed');
      expect(errors[0].message).toBe('Navigation failed');
    });

    consoleErrorSpy.mockRestore();
    consoleWarnSpy.mockRestore();
  });

  it('should log navigation failure with error details', async () => {
    const consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
    const consoleWarnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});
    
    mockNavigate.mockImplementation(() => {
      throw new Error('Network error');
    });

    render(
      <NavigationMenu
        items={[{ label: 'MENU', path: '/menu' }]}
        onNavigate={mockNavigate}
      />
    );

    const menuLink = screen.getByText('MENU');
    fireEvent.click(menuLink);

    await waitFor(() => {
      const errors = getErrorLogs();
      expect(errors[0].metadata).toMatchObject({
        path: '/menu',
        error: 'Network error',
      });
    });

    consoleErrorSpy.mockRestore();
    consoleWarnSpy.mockRestore();
  });

  it('should show user notification on navigation failure', async () => {
    const consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
    const consoleWarnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});
    const eventListener = vi.fn();
    window.addEventListener('hero-notification', eventListener);

    mockNavigate.mockImplementation(() => {
      throw new Error('Navigation failed');
    });

    render(
      <NavigationMenu
        items={[{ label: 'MENU', path: '/menu' }]}
        onNavigate={mockNavigate}
      />
    );

    const menuLink = screen.getByText('MENU');
    fireEvent.click(menuLink);

    await waitFor(() => {
      expect(eventListener).toHaveBeenCalled();
      const event = eventListener.mock.calls[0][0] as CustomEvent;
      expect(event.detail.message).toContain('Navigation failed');
      expect(event.detail.type).toBe('error');
    });

    window.removeEventListener('hero-notification', eventListener);
    consoleErrorSpy.mockRestore();
    consoleWarnSpy.mockRestore();
  });

  it('should close mobile menu after successful navigation', async () => {
    // Mock window.innerWidth to simulate mobile
    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      configurable: true,
      value: 500,
    });

    const { container } = render(
      <NavigationMenu
        items={[{ label: 'MENU', path: '/menu' }]}
        onNavigate={mockNavigate}
      />
    );

    // Trigger resize event to detect mobile
    window.dispatchEvent(new Event('resize'));

    await waitFor(() => {
      const menuList = container.querySelector('.menuList');
      expect(menuList).toBeInTheDocument();
    });

    // Open mobile menu
    const toggleButton = screen.getByRole('button', { name: /menu/i });
    fireEvent.click(toggleButton);

    // Click menu item
    const menuLink = screen.getByText('MENU');
    fireEvent.click(menuLink);

    // Menu should close after navigation
    await waitFor(() => {
      const menuList = container.querySelector('.menuOpen');
      expect(menuList).not.toBeInTheDocument();
    });
  });

  it('should support keyboard navigation with error handling', async () => {
    const consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

    render(
      <NavigationMenu
        items={menuItems}
        onNavigate={mockNavigate}
      />
    );

    const invalidLink = screen.getByText('INVALID');
    invalidLink.focus();
    
    // Press Enter on invalid path
    fireEvent.keyDown(invalidLink, { key: 'Enter' });

    // Should not navigate
    expect(mockNavigate).not.toHaveBeenCalled();

    // Should log error
    await waitFor(() => {
      const errors = getErrorLogs();
      expect(errors.length).toBeGreaterThan(0);
      expect(errors[0].type).toBe('invalid_path');
    });

    consoleErrorSpy.mockRestore();
  });
});
