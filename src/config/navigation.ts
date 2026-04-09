import { NavigationConfig } from '../types';

/**
 * Default navigation configuration for Bún Mee website
 * Includes menu items, logo settings, and CTA button configuration
 */
export const defaultNavigationConfig: NavigationConfig = {
  menuItems: [],
  logoText: 'O Hoèn',
  logoLink: '/',
  ctaButtons: {
    pickup: {
      label: 'ORDER PICKUP',
      link: '/order/pickup',
    },
    delivery: {
      label: 'ORDER DELIVERY',
      link: '/order/delivery',
    },
  },
};
