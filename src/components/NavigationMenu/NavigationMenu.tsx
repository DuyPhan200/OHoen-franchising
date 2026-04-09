import React, { useState, useEffect, memo } from 'react';
import { NavigationMenuProps } from '../../types';
import { isValidPath, logError, ErrorType, showNotification, NotificationType } from '../../utils/errorHandling';
import MobileMenuToggle from './MobileMenuToggle';
import styles from './NavigationMenu.module.css';

/**
 * Navigation menu component with horizontal layout
 * Displays five menu items: LOCATIONS, MENU, CATERING, FRANCHISE, ABOUT US
 * Supports keyboard navigation and responsive mobile hamburger menu
 * Memoized to prevent unnecessary re-renders (Requirement 9.2)
 * 
 * Requirements: 2.1, 2.2, 2.3, 2.4, 2.5, 4.5, 7.2, 8.2
 */
const NavigationMenu: React.FC<NavigationMenuProps> = ({
  items,
  onNavigate,
  activePath,
}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  /**
   * Detect viewport size and set mobile state
   * Requirement 7.2: Collapse menu on viewport < 768px
   */
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);

    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  /**
   * Close menu when viewport changes from mobile to desktop
   */
  useEffect(() => {
    if (!isMobile) {
      setIsMenuOpen(false);
    }
  }, [isMobile]);

  /**
   * Toggle mobile menu open/close
   * Requirement 7.2: Implement menu open/close functionality
   */
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  /**
   * Handle navigation with path validation and error handling
   * Requirement 4.5: Add navigation path validation and user feedback
   */
  const handleNavigate = (path: string) => {
    // Validate path before navigation
    if (!isValidPath(path)) {
      logError(ErrorType.INVALID_PATH, 'Invalid navigation path', { path });
      showNotification(
        'The requested page is not available. Please try another option.',
        NotificationType.ERROR
      );
      return;
    }

    try {
      onNavigate(path);
      if (isMobile) {
        setIsMenuOpen(false);
      }
    } catch (error) {
      // Handle navigation failure
      logError(ErrorType.NAVIGATION_FAILED, 'Navigation failed', {
        path,
        error: error instanceof Error ? error.message : 'Unknown error',
      });
      showNotification(
        'Navigation failed. Please try again.',
        NotificationType.ERROR
      );
    }
  };

  /**
   * Handle keyboard navigation (Enter key)
   * Requirement 8.2: Keyboard navigable using Tab and Enter keys
   */
  const handleKeyDown = (e: React.KeyboardEvent<HTMLAnchorElement>, path: string) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleNavigate(path);
    }
  };

  return (
    <nav className={styles.nav} role="navigation" aria-label="Main navigation">
      <MobileMenuToggle
        isOpen={isMenuOpen}
        onClick={toggleMenu}
        tabIndex={isMobile ? 0 : -1}
      />
      <ul
        id="mobile-menu"
        className={`${styles.menuList} ${isMobile && isMenuOpen ? styles.menuOpen : ''} ${isMobile && !isMenuOpen ? styles.menuClosed : ''}`}
      >
        {items.map((item) => (
          <li key={item.path} className={styles.menuItem}>
            <a
              href={item.path}
              onClick={(e) => {
                e.preventDefault();
                handleNavigate(item.path);
              }}
              onKeyDown={(e) => handleKeyDown(e, item.path)}
              aria-label={item.ariaLabel || item.label}
              className={`${styles.menuLink} ${activePath === item.path ? styles.active : ''}`}
              tabIndex={0}
            >
              {item.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default memo(NavigationMenu);
