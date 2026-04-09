import React, { useEffect, useState } from 'react';
import styles from './Notification.module.css';

export interface NotificationProps {
  message: string;
  type: 'error' | 'warning' | 'info';
  duration?: number;
  onClose?: () => void;
}

/**
 * Notification component for displaying user feedback
 * Requirement 4.5: Implement user feedback for failed navigation
 */
const Notification: React.FC<NotificationProps> = ({
  message,
  type,
  duration = 5000,
  onClose,
}) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    if (duration > 0) {
      const timer = setTimeout(() => {
        setIsVisible(false);
        onClose?.();
      }, duration);

      return () => clearTimeout(timer);
    }
  }, [duration, onClose]);

  if (!isVisible) return null;

  return (
    <div
      className={`${styles.notification} ${styles[type]}`}
      role="alert"
      aria-live="polite"
    >
      <div className={styles.content}>
        <span className={styles.icon}>
          {type === 'error' && '⚠️'}
          {type === 'warning' && '⚠️'}
          {type === 'info' && 'ℹ️'}
        </span>
        <span className={styles.message}>{message}</span>
      </div>
      <button
        className={styles.closeButton}
        onClick={() => {
          setIsVisible(false);
          onClose?.();
        }}
        aria-label="Close notification"
      >
        ×
      </button>
    </div>
  );
};

export default Notification;
