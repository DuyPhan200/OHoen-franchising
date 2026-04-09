/**
 * Error handling utilities for Hero Section
 * Requirement 4.5: Error handling for navigation and images
 */

/**
 * Valid navigation paths for the application
 */
const VALID_PATHS = [
  '/',
  '/locations',
  '/menu',
  '/catering',
  '/franchise',
  '/about',
  '/order/pickup',
  '/order/delivery',
];

/**
 * Validates if a navigation path is valid
 * @param path - The path to validate
 * @returns true if path is valid, false otherwise
 */
export const isValidPath = (path: string): boolean => {
  return VALID_PATHS.includes(path);
};

/**
 * Error types for tracking
 */
export enum ErrorType {
  IMAGE_LOAD_FAILED = 'image_load_failed',
  NAVIGATION_FAILED = 'navigation_failed',
  INVALID_PATH = 'invalid_path',
}

/**
 * Error tracking interface
 */
interface ErrorEvent {
  type: ErrorType;
  message: string;
  timestamp: number;
  metadata?: Record<string, unknown>;
}

/**
 * Logs errors to console and tracking service
 * In production, this would send to analytics/monitoring service
 * @param type - Type of error
 * @param message - Error message
 * @param metadata - Additional error context
 */
export const logError = (
  type: ErrorType,
  message: string,
  metadata?: Record<string, unknown>
): void => {
  const errorEvent: ErrorEvent = {
    type,
    message,
    timestamp: Date.now(),
    metadata,
  };

  // Log to console in development
  console.error(`[${type}]`, message, metadata);

  // In production, send to monitoring service (e.g., Sentry, LogRocket)
  // Example: trackError(errorEvent);
  if (typeof window !== 'undefined' && (window as any).Sentry) {
    (window as any).Sentry.captureException(new Error(message), {
      tags: { errorType: type },
      extra: metadata,
    });
  }
  
  // Store in sessionStorage for debugging
  try {
    const errors = JSON.parse(sessionStorage.getItem('hero_errors') || '[]');
    errors.push(errorEvent);
    sessionStorage.setItem('hero_errors', JSON.stringify(errors.slice(-10))); // Keep last 10 errors
  } catch (e) {
    // Silently fail if sessionStorage is not available
  }

  // Track in analytics (e.g., Google Analytics, Mixpanel)
  if (typeof window !== 'undefined' && (window as any).gtag) {
    (window as any).gtag('event', 'exception', {
      description: message,
      fatal: type === ErrorType.NAVIGATION_FAILED,
    });
  }
};

/**
 * Fallback image URL for failed image loads
 */
export const FALLBACK_IMAGE_URL = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="1920" height="1080" viewBox="0 0 1920 1080"%3E%3Crect fill="%23f0f0f0" width="1920" height="1080"/%3E%3Ctext x="50%25" y="50%25" dominant-baseline="middle" text-anchor="middle" font-family="sans-serif" font-size="48" fill="%23999"%3EImage Unavailable%3C/text%3E%3C/svg%3E';

/**
 * User notification types
 */
export enum NotificationType {
  ERROR = 'error',
  WARNING = 'warning',
  INFO = 'info',
}

/**
 * Shows a user notification
 * In a real app, this would integrate with a toast/notification system
 * @param message - Message to display
 * @param type - Type of notification
 */
export const showNotification = (
  message: string,
  type: NotificationType = NotificationType.ERROR
): void => {
  // In production, use a proper notification library (e.g., react-toastify)
  // For now, use console and alert as fallback
  console.warn(`[${type.toUpperCase()}]`, message);
  
  // Could also dispatch a custom event that a notification component listens to
  if (typeof window !== 'undefined') {
    window.dispatchEvent(
      new CustomEvent('hero-notification', {
        detail: { message, type },
      })
    );
  }
};

/**
 * Retrieves error logs from sessionStorage for debugging
 * @returns Array of error events
 */
export const getErrorLogs = (): ErrorEvent[] => {
  try {
    const errors = sessionStorage.getItem('hero_errors');
    return errors ? JSON.parse(errors) : [];
  } catch (e) {
    console.error('Failed to retrieve error logs:', e);
    return [];
  }
};

/**
 * Clears error logs from sessionStorage
 */
export const clearErrorLogs = (): void => {
  try {
    sessionStorage.removeItem('hero_errors');
  } catch (e) {
    console.error('Failed to clear error logs:', e);
  }
};
