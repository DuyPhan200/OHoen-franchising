import { renderHook, act } from '@testing-library/react';
import { useResponsiveLayout, breakpoints } from './useResponsiveLayout';
import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';

describe('useResponsiveLayout', () => {
  let originalInnerWidth: number;

  beforeEach(() => {
    originalInnerWidth = window.innerWidth;
  });

  afterEach(() => {
    // Restore original window width
    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      configurable: true,
      value: originalInnerWidth,
    });
  });

  const setWindowWidth = (width: number) => {
    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      configurable: true,
      value: width,
    });
  };

  it('should return "mobile" for viewport width less than tablet breakpoint', () => {
    setWindowWidth(320);
    const { result } = renderHook(() => useResponsiveLayout());
    expect(result.current).toBe('mobile');
  });

  it('should return "mobile" for viewport width just below tablet breakpoint', () => {
    setWindowWidth(breakpoints.tablet - 1);
    const { result } = renderHook(() => useResponsiveLayout());
    expect(result.current).toBe('mobile');
  });

  it('should return "tablet" for viewport width at tablet breakpoint', () => {
    setWindowWidth(breakpoints.tablet);
    const { result } = renderHook(() => useResponsiveLayout());
    expect(result.current).toBe('tablet');
  });

  it('should return "tablet" for viewport width between tablet and desktop breakpoints', () => {
    setWindowWidth(900);
    const { result } = renderHook(() => useResponsiveLayout());
    expect(result.current).toBe('tablet');
  });

  it('should return "desktop" for viewport width at desktop breakpoint', () => {
    setWindowWidth(breakpoints.desktop);
    const { result } = renderHook(() => useResponsiveLayout());
    expect(result.current).toBe('desktop');
  });

  it('should return "desktop" for viewport width greater than desktop breakpoint', () => {
    setWindowWidth(1920);
    const { result } = renderHook(() => useResponsiveLayout());
    expect(result.current).toBe('desktop');
  });

  it('should update layout when window is resized', () => {
    setWindowWidth(1920);
    const { result } = renderHook(() => useResponsiveLayout());
    expect(result.current).toBe('desktop');

    act(() => {
      setWindowWidth(600);
      window.dispatchEvent(new Event('resize'));
    });

    expect(result.current).toBe('mobile');
  });

  it('should handle orientation changes', () => {
    setWindowWidth(1024);
    const { result } = renderHook(() => useResponsiveLayout());
    expect(result.current).toBe('desktop');

    act(() => {
      setWindowWidth(768);
      window.dispatchEvent(new Event('orientationchange'));
    });

    expect(result.current).toBe('tablet');
  });

  it('should clean up event listeners on unmount', () => {
    const removeEventListenerSpy = vi.spyOn(window, 'removeEventListener');
    setWindowWidth(1024);
    const { unmount } = renderHook(() => useResponsiveLayout());

    unmount();

    expect(removeEventListenerSpy).toHaveBeenCalledWith('resize', expect.any(Function));
    expect(removeEventListenerSpy).toHaveBeenCalledWith('orientationchange', expect.any(Function));
  });

  it('should not cause unnecessary re-renders when layout does not change', () => {
    setWindowWidth(1024);
    const { result } = renderHook(() => useResponsiveLayout());
    const initialLayout = result.current;

    act(() => {
      setWindowWidth(1200); // Still desktop
      window.dispatchEvent(new Event('resize'));
    });

    expect(result.current).toBe(initialLayout);
    expect(result.current).toBe('desktop');
  });

  it('should handle multiple rapid resize events correctly', () => {
    setWindowWidth(1920);
    const { result } = renderHook(() => useResponsiveLayout());
    expect(result.current).toBe('desktop');

    act(() => {
      setWindowWidth(600);
      window.dispatchEvent(new Event('resize'));
      setWindowWidth(900);
      window.dispatchEvent(new Event('resize'));
      setWindowWidth(1200);
      window.dispatchEvent(new Event('resize'));
    });

    expect(result.current).toBe('desktop');
  });
});
