import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';
import Notification from './Notification';

interface NotificationData {
  id: string;
  message: string;
  type: 'error' | 'warning' | 'info';
  duration?: number;
}

interface NotificationContextType {
  showNotification: (message: string, type: 'error' | 'warning' | 'info', duration?: number) => void;
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

export const useNotification = () => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error('useNotification must be used within NotificationProvider');
  }
  return context;
};

/**
 * NotificationProvider component for managing global notifications
 * Requirement 4.5: Implement user feedback for failed navigation
 */
export const NotificationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [notifications, setNotifications] = useState<NotificationData[]>([]);

  const showNotification = useCallback((message: string, type: 'error' | 'warning' | 'info', duration = 5000) => {
    const id = `notification-${Date.now()}-${Math.random()}`;
    setNotifications((prev) => [...prev, { id, message, type, duration }]);
  }, []);

  const removeNotification = useCallback((id: string) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  }, []);

  // Listen for custom notification events from error handling utilities
  useEffect(() => {
    const handleNotificationEvent = (event: Event) => {
      const customEvent = event as CustomEvent<{ message: string; type: 'error' | 'warning' | 'info' }>;
      showNotification(customEvent.detail.message, customEvent.detail.type);
    };

    window.addEventListener('hero-notification', handleNotificationEvent);
    return () => window.removeEventListener('hero-notification', handleNotificationEvent);
  }, [showNotification]);

  return (
    <NotificationContext.Provider value={{ showNotification }}>
      {children}
      <div style={{ position: 'fixed', top: 0, right: 0, zIndex: 9999 }}>
        {notifications.map((notification, index) => (
          <div key={notification.id} style={{ marginTop: index > 0 ? '10px' : '0' }}>
            <Notification
              message={notification.message}
              type={notification.type}
              duration={notification.duration}
              onClose={() => removeNotification(notification.id)}
            />
          </div>
        ))}
      </div>
    </NotificationContext.Provider>
  );
};
