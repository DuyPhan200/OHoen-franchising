import { renderHook, act } from '@testing-library/react';
import { useHeaderScroll } from './useHeaderScroll';

describe('useHeaderScroll', () => {
  beforeEach(() => {
    // Reset scroll position before each test
    window.scrollY = 0;
  });

  it('should return false when at top of page', () => {
    const { result } = renderHook(() => useHeaderScroll());
    expect(result.current).toBe(false);
  });

  it('should return true when scrolled past top', () => {
    const { result } = renderHook(() => useHeaderScroll());

    act(() => {
      // Simulate scroll
      Object.defineProperty(window, 'scrollY', { value: 100, writable: true });
      window.dispatchEvent(new Event('scroll'));
    });

    expect(result.current).toBe(true);
  });

  it('should return false when scrolled back to top', () => {
    const { result } = renderHook(() => useHeaderScroll());

    act(() => {
      // Simulate scroll down
      Object.defineProperty(window, 'scrollY', { value: 100, writable: true });
      window.dispatchEvent(new Event('scroll'));
    });

    expect(result.current).toBe(true);

    act(() => {
      // Simulate scroll back to top
      Object.defineProperty(window, 'scrollY', { value: 0, writable: true });
      window.dispatchEvent(new Event('scroll'));
    });

    expect(result.current).toBe(false);
  });

  it('should clean up event listener on unmount', () => {
    const removeEventListenerSpy = vi.spyOn(window, 'removeEventListener');
    const { unmount } = renderHook(() => useHeaderScroll());

    unmount();

    expect(removeEventListenerSpy).toHaveBeenCalledWith('scroll', expect.any(Function));
  });

  it('should use passive scroll listener for performance', () => {
    const addEventListenerSpy = vi.spyOn(window, 'addEventListener');
    renderHook(() => useHeaderScroll());

    expect(addEventListenerSpy).toHaveBeenCalledWith(
      'scroll',
      expect.any(Function),
      { passive: true }
    );
  });
});
