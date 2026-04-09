import { useState, useEffect } from 'react';

export type LayoutType = 'mobile' | 'tablet' | 'desktop';

export const breakpoints = {
  mobile: 320,
  tablet: 768,
  desktop: 1024,
  wide: 1920
} as const;

/**
 * Custom hook to detect viewport size and return the current layout type.
 * Handles orientation changes and prevents layout shift during resize.
 * 
 * @returns {LayoutType} Current layout type: 'mobile', 'tablet', or 'desktop'
 */
export const useResponsiveLayout = (): LayoutType => {
  const [layout, setLayout] = useState<LayoutType>(() => {
    // Initialize with correct layout to prevent layout shift
    if (typeof window !== 'undefined') {
      const width = window.innerWidth;
      if (width < breakpoints.tablet) {
        return 'mobile';
      } else if (width < breakpoints.desktop) {
        return 'tablet';
      }
      return 'desktop';
    }
    return 'desktop';
  });

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      let newLayout: LayoutType;

      if (width < breakpoints.tablet) {
        newLayout = 'mobile';
      } else if (width < breakpoints.desktop) {
        newLayout = 'tablet';
      } else {
        newLayout = 'desktop';
      }

      // Only update if layout actually changed to prevent unnecessary re-renders
      setLayout((prevLayout) => {
        if (prevLayout !== newLayout) {
          return newLayout;
        }
        return prevLayout;
      });
    };

    // Handle both resize and orientation change events
    window.addEventListener('resize', handleResize);
    window.addEventListener('orientationchange', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('orientationchange', handleResize);
    };
  }, []);

  return layout;
};
