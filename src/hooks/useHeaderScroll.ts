import { useState, useEffect } from 'react';

/**
 * Custom hook to detect if the page has been scrolled past the top
 * Uses passive scroll listener for optimal performance
 * 
 * @returns {boolean} isScrolled - true if window.scrollY > 0, false otherwise
 */
export const useHeaderScroll = (): boolean => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    // Initial check
    handleScroll();

    // Add passive scroll listener for better performance
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return isScrolled;
};
