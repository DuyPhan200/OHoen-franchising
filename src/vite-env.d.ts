/// <reference types="vite/client" />

interface ImportMetaEnv {
  // Application Configuration
  readonly VITE_APP_NAME: string;
  readonly VITE_APP_VERSION: string;

  // API Configuration
  readonly VITE_API_BASE_URL?: string;
  readonly VITE_API_TIMEOUT?: string;

  // Image Assets
  readonly VITE_HERO_IMAGE_PATH: string;

  // Feature Flags
  readonly VITE_ENABLE_ANALYTICS: string;
  readonly VITE_ENABLE_DEBUG_MODE: string;

  // External Services
  readonly VITE_GOOGLE_MAPS_API_KEY?: string;
  readonly VITE_ANALYTICS_ID?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
