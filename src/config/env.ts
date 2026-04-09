/**
 * Environment configuration utility
 * Provides type-safe access to environment variables
 */

export const env = {
  // Application Configuration
  appName: import.meta.env.VITE_APP_NAME || 'O Hoèn',
  appVersion: import.meta.env.VITE_APP_VERSION || '1.0.0',

  // API Configuration
  apiBaseUrl: import.meta.env.VITE_API_BASE_URL || '',
  apiTimeout: parseInt(import.meta.env.VITE_API_TIMEOUT || '10000', 10),

  // Image Assets
  heroImagePath: import.meta.env.VITE_HERO_IMAGE_PATH || '/herosection.png',

  // Feature Flags
  enableAnalytics: import.meta.env.VITE_ENABLE_ANALYTICS === 'true',
  enableDebugMode: import.meta.env.VITE_ENABLE_DEBUG_MODE === 'true',

  // External Services
  googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY || '',
  analyticsId: import.meta.env.VITE_ANALYTICS_ID || '',

  // Environment
  isDevelopment: import.meta.env.DEV,
  isProduction: import.meta.env.PROD,
  mode: import.meta.env.MODE,
} as const;

/**
 * Validate required environment variables
 * Call this function at app startup to ensure all required vars are set
 */
export function validateEnv(): void {
  const requiredVars = [
    'VITE_APP_NAME',
    'VITE_APP_VERSION',
    'VITE_HERO_IMAGE_PATH',
  ];

  const missingVars = requiredVars.filter(
    (varName) => !import.meta.env[varName]
  );

  if (missingVars.length > 0) {
    console.warn(
      `Missing environment variables: ${missingVars.join(', ')}\n` +
      'Using default values. Check your .env file.'
    );
  }
}
