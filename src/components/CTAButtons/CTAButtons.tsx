import React, { memo } from 'react';
import { CTAButtonsProps } from '../../types';
import { logError, ErrorType, showNotification, NotificationType } from '../../utils/errorHandling';
import styles from './CTAButtons.module.css';

/**
 * Call-to-Action buttons component
 * Displays "ORDER PICKUP" and "ORDER DELIVERY" buttons
 * Positioned at top-right corner with distinct visual styling
 * Memoized to prevent unnecessary re-renders (Requirement 9.2)
 * 
 * Requirements: 3.1, 3.2, 3.3, 3.4, 3.5, 3.6, 4.5, 8.3
 */
const CTAButtons: React.FC<CTAButtonsProps> = ({
  onOrderPickup,
  onOrderDelivery,
}) => {
  /**
   * Handle CTA button clicks with error handling
   * Requirement 4.5: Implement user feedback for failed navigation
   */
  const handleOrderClick = (
    handler: () => void,
    orderType: 'pickup' | 'delivery'
  ) => {
    try {
      handler();
    } catch (error) {
      logError(ErrorType.NAVIGATION_FAILED, `Order ${orderType} navigation failed`, {
        orderType,
        error: error instanceof Error ? error.message : 'Unknown error',
      });
      showNotification(
        `Unable to proceed with ${orderType} order. Please try again.`,
        NotificationType.ERROR
      );
    }
  };

  return (
    <div className={styles.ctaContainer}>
      <button
        className={`${styles.ctaButton} ${styles.pickupButton}`}
        onClick={() => handleOrderClick(onOrderPickup, 'pickup')}
        aria-label="Order pickup"
      >
        ORDER PICKUP
      </button>
      <button
        className={`${styles.ctaButton} ${styles.deliveryButton}`}
        onClick={() => handleOrderClick(onOrderDelivery, 'delivery')}
        aria-label="Order delivery"
      >
        ORDER DELIVERY
      </button>
    </div>
  );
};

export default memo(CTAButtons);
