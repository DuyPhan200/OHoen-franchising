import React, { memo } from 'react';
import styles from './MobileMenuToggle.module.css';

interface MobileMenuToggleProps {
  isOpen: boolean;
  onClick: () => void;
  ariaLabel?: string;
  tabIndex?: number;
}

/**
 * Mobile hamburger menu toggle button
 * Displays a hamburger icon that animates to an X when menu is open
 * Memoized to prevent unnecessary re-renders (Requirement 9.2)
 * 
 * Requirement 7.2: Collapse menu on viewport < 768px with hamburger menu
 */
const MobileMenuToggle: React.FC<MobileMenuToggleProps> = ({
  isOpen,
  onClick,
  ariaLabel = 'Toggle navigation menu',
  tabIndex = 0,
}) => {
  return (
    <button
      className={`${styles.toggle} ${isOpen ? styles.open : ''}`}
      onClick={onClick}
      aria-label={ariaLabel}
      aria-expanded={isOpen}
      aria-controls="mobile-menu"
      type="button"
      tabIndex={tabIndex}
    >
      <span className={styles.bar}></span>
      <span className={styles.bar}></span>
      <span className={styles.bar}></span>
    </button>
  );
};

export default memo(MobileMenuToggle);
