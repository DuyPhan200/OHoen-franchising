import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import {
  isValidPath,
  logError,
  ErrorType,
  showNotification,
  NotificationType,
  getErrorLogs,
  clearErrorLogs,
} from './errorHandling';

describe('errorHandling utilities', () => {
  beforeEach(() => {
    // Clear sessionStorage before each test
    sessionStorage.clear();
    vi.clearAllMocks();
  });

  afterEach(() => {
    sessionStorage.clear();
  });

  describe('isValidPath', () => {
    it('should return true for valid paths', () => {
      expect(isValidPath('/')).toBe(true);
      expect(isValidPath('/locations')).toBe(true);
      expect(isValidPath('/menu')).toBe(true);
      expect(isValidPath('/catering')).toBe(true);
      expect(isValidPath('/franchise')).toBe(true);
      expect(isValidPath('/about')).toBe(true);
      expect(isValidPath('/order/pickup')).toBe(true);
      expect(isValidPath('/order/delivery')).toBe(true);
    });

    it('should return false for invalid paths', () => {
      expect(isValidPath('/invalid')).toBe(false);
      expect(isValidPath('/random-page')).toBe(false);
      expect(isValidPath('')).toBe(false);
      expect(isValidPath('/order')).toBe(false);
      expect(isValidPath('/order/invalid')).toBe(false);
    });
  });

  describe('logError', () => {
    it('should log error to console', () => {
      const consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

      logError(ErrorType.IMAGE_LOAD_FAILED, 'Test error message', { src: '/test.jpg' });

      expect(consoleErrorSpy).toHaveBeenCalledWith(
        '[image_load_failed]',
        'Test error message',
        { src: '/test.jpg' }
      );

      consoleErrorSpy.mockRestore();
    });

    it('should store error in sessionStorage', () => {
      logError(ErrorType.NAVIGATION_FAILED, 'Navigation error', { path: '/invalid' });

      const errors = getErrorLogs();
      expect(errors).toHaveLength(1);
      expect(errors[0]).toMatchObject({
        type: ErrorType.NAVIGATION_FAILED,
        message: 'Navigation error',
        metadata: { path: '/invalid' },
      });
      expect(errors[0].timestamp).toBeDefined();
    });

    it('should keep only last 10 errors in sessionStorage', () => {
      // Log 15 errors
      for (let i = 0; i < 15; i++) {
        logError(ErrorType.IMAGE_LOAD_FAILED, `Error ${i}`);
      }

      const errors = getErrorLogs();
      expect(errors).toHaveLength(10);
      // Should keep the last 10 errors (5-14)
      expect(errors[0].message).toBe('Error 5');
      expect(errors[9].message).toBe('Error 14');
    });

    it('should handle sessionStorage errors gracefully', () => {
      // Mock sessionStorage to throw error
      const setItemSpy = vi.spyOn(Storage.prototype, 'setItem').mockImplementation(() => {
        throw new Error('Storage full');
      });

      // Should not throw
      expect(() => {
        logError(ErrorType.IMAGE_LOAD_FAILED, 'Test error');
      }).not.toThrow();

      setItemSpy.mockRestore();
    });
  });

  describe('showNotification', () => {
    it('should log notification to console', () => {
      const consoleWarnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});

      showNotification('Test notification', NotificationType.ERROR);

      expect(consoleWarnSpy).toHaveBeenCalledWith('[ERROR]', 'Test notification');

      consoleWarnSpy.mockRestore();
    });

    it('should dispatch custom event', () => {
      const eventListener = vi.fn();
      window.addEventListener('hero-notification', eventListener);

      showNotification('Test notification', NotificationType.WARNING);

      expect(eventListener).toHaveBeenCalled();
      const event = eventListener.mock.calls[0][0] as CustomEvent;
      expect(event.detail).toEqual({
        message: 'Test notification',
        type: NotificationType.WARNING,
      });

      window.removeEventListener('hero-notification', eventListener);
    });

    it('should default to ERROR type', () => {
      const consoleWarnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});

      showNotification('Test notification');

      expect(consoleWarnSpy).toHaveBeenCalledWith('[ERROR]', 'Test notification');

      consoleWarnSpy.mockRestore();
    });
  });

  describe('getErrorLogs', () => {
    it('should return empty array when no errors logged', () => {
      const errors = getErrorLogs();
      expect(errors).toEqual([]);
    });

    it('should return all logged errors', () => {
      logError(ErrorType.IMAGE_LOAD_FAILED, 'Error 1');
      logError(ErrorType.NAVIGATION_FAILED, 'Error 2');

      const errors = getErrorLogs();
      expect(errors).toHaveLength(2);
      expect(errors[0].message).toBe('Error 1');
      expect(errors[1].message).toBe('Error 2');
    });

    it('should handle corrupted sessionStorage data', () => {
      sessionStorage.setItem('hero_errors', 'invalid json');

      const consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
      const errors = getErrorLogs();

      expect(errors).toEqual([]);
      expect(consoleErrorSpy).toHaveBeenCalled();

      consoleErrorSpy.mockRestore();
    });
  });

  describe('clearErrorLogs', () => {
    it('should clear all error logs from sessionStorage', () => {
      logError(ErrorType.IMAGE_LOAD_FAILED, 'Error 1');
      logError(ErrorType.NAVIGATION_FAILED, 'Error 2');

      expect(getErrorLogs()).toHaveLength(2);

      clearErrorLogs();

      expect(getErrorLogs()).toEqual([]);
    });

    it('should handle sessionStorage errors gracefully', () => {
      const removeItemSpy = vi.spyOn(Storage.prototype, 'removeItem').mockImplementation(() => {
        throw new Error('Storage error');
      });

      const consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

      // Should not throw
      expect(() => {
        clearErrorLogs();
      }).not.toThrow();

      expect(consoleErrorSpy).toHaveBeenCalled();

      removeItemSpy.mockRestore();
      consoleErrorSpy.mockRestore();
    });
  });
});
