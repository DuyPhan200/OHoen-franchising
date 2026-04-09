# Environment Variables Setup Guide

## Overview

This project uses Vite's environment variable system. All environment variables must be prefixed with `VITE_` to be exposed to the client-side code.

## Setup Instructions

1. **Copy the example file:**
   ```bash
   cp .env.example .env
   ```

2. **Edit `.env` file with your values:**
   ```bash
   # On Windows
   notepad .env
   
   # On Mac/Linux
   nano .env
   ```

3. **Restart the development server** after changing environment variables:
   ```bash
   npm run dev
   ```

## Available Environment Variables

### Application Configuration

- `VITE_APP_NAME` - Application name (default: "Bún Mee")
- `VITE_APP_VERSION` - Application version (default: "1.0.0")

### Image Assets

- `VITE_HERO_IMAGE_PATH` - Path to hero section image (default: "/herosection.png")

### Feature Flags

- `VITE_ENABLE_ANALYTICS` - Enable analytics tracking (default: "false")
- `VITE_ENABLE_DEBUG_MODE` - Enable debug mode (default: "false")

### API Configuration (Optional)

- `VITE_API_BASE_URL` - Base URL for API calls
- `VITE_API_TIMEOUT` - API request timeout in milliseconds

### External Services (Optional)

- `VITE_GOOGLE_MAPS_API_KEY` - Google Maps API key
- `VITE_ANALYTICS_ID` - Analytics service ID

## Usage in Code

### Method 1: Direct Access (Not Recommended)

```typescript
const appName = import.meta.env.VITE_APP_NAME;
```

### Method 2: Using the env utility (Recommended)

```typescript
import { env } from './config/env';

console.log(env.appName);
console.log(env.heroImagePath);
console.log(env.enableAnalytics);
```

### Method 3: In Components

```typescript
import { env } from '../config/env';

function MyComponent() {
  return (
    <div>
      <h1>{env.appName}</h1>
      <img src={env.heroImagePath} alt="Hero" />
    </div>
  );
}
```

## Environment-Specific Files

You can create different `.env` files for different environments:

- `.env` - Default environment variables
- `.env.local` - Local overrides (not committed to git)
- `.env.production` - Production environment variables
- `.env.development` - Development environment variables

## Validation

The project includes environment variable validation. To use it:

```typescript
import { validateEnv } from './config/env';

// Call at app startup (e.g., in main.tsx)
validateEnv();
```

## Security Notes

⚠️ **Important Security Considerations:**

1. **Never commit `.env` files** - They are already in `.gitignore`
2. **Don't store sensitive data** - All `VITE_` variables are exposed to the client
3. **Use backend for secrets** - API keys, passwords, etc. should be on the server
4. **Commit `.env.example`** - This helps other developers set up their environment

## TypeScript Support

Environment variables are fully typed in `src/vite-env.d.ts`. Your IDE will provide autocomplete and type checking.

## Troubleshooting

### Variables not updating?

1. Restart the dev server (`npm run dev`)
2. Clear browser cache
3. Check variable name has `VITE_` prefix

### Variables showing as undefined?

1. Check `.env` file exists in project root
2. Verify variable name spelling
3. Ensure no spaces around `=` sign
4. Restart dev server

### Build issues?

1. Check all required variables are set
2. Run `npm run build` to test production build
3. Check `dist/` folder is being regenerated

## Example .env File

```env
# Application
VITE_APP_NAME=Bún Mee
VITE_APP_VERSION=1.0.0

# Assets
VITE_HERO_IMAGE_PATH=/herosection.png

# Features
VITE_ENABLE_ANALYTICS=false
VITE_ENABLE_DEBUG_MODE=true
```

## Resources

- [Vite Environment Variables Documentation](https://vitejs.dev/guide/env-and-mode.html)
- [Vite Config Reference](https://vitejs.dev/config/)
