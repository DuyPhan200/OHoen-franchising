import React, { memo } from 'react';
import { LogoProps } from '../../types';
import { logError, ErrorType, showNotification, NotificationType } from '../../utils/errorHandling';
import styles from './Logo.module.css';

/**
 * Logo component displaying "Bún Mee" brand text
 * Positioned at top-left corner with click handler for homepage navigation
 * Memoized to prevent unnecessary re-renders (Requirement 9.2)
 * 
 * Requirements: 1.1, 1.2, 1.3, 4.5, 8.1
 */
const Logo: React.FC<LogoProps> = ({
  onClick,
  ariaLabel = 'O Hoèn Homepage',
}) => {
  /**
   * Handle logo click with error handling
   * Requirement 4.5: Implement user feedback for failed navigation
   */
  const handleClick = () => {
    if (!onClick) return;

    try {
      onClick();
    } catch (error) {
      logError(ErrorType.NAVIGATION_FAILED, 'Logo navigation failed', {
        error: error instanceof Error ? error.message : 'Unknown error',
      });
      showNotification(
        'Unable to navigate to homepage. Please try again.',
        NotificationType.ERROR
      );
    }
  };

  return (
    <button
      className={styles.logo}
      onClick={handleClick}
      aria-label={ariaLabel}
      type="button"
    >
      O Hoèn
    </button>
  );
};

export default memo(Logo);
