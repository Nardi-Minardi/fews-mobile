import {
  ENV,
  APP_NAME,
  APP_DISPLAY_NAME,
  API_URL,
  API_TIMEOUT,
  ENABLE_LOGGING,
  ENABLE_DEBUG_MODE,
  APP_VERSION,
  BUILD_NUMBER,
} from '@env';

export const Config = {
  env: ENV || 'development',
  appName: APP_NAME || 'FFEWFMS',
  appDisplayName: APP_DISPLAY_NAME || 'FFEWFMS',
  api: {
    url: API_URL || 'https://api-fews.payrasa.id/api/v1',
    timeout: parseInt(API_TIMEOUT || '30000', 10),
  },
  features: {
    enableLogging: ENABLE_LOGGING === 'true',
    enableDebugMode: ENABLE_DEBUG_MODE === 'true',
  },
  app: {
    version: APP_VERSION || '0.0.1',
    buildNumber: parseInt(BUILD_NUMBER || '1', 10),
  },
};

// Helper function to log configuration (only in development)
export const logConfig = () => {
  if (Config.features.enableDebugMode) {
    console.log('=== App Configuration ===');
    console.log('Environment:', Config.env);
    console.log('App Name:', Config.appName);
    console.log('API URLs:', Config.api.url);
    console.log('Debug Mode:', Config.features.enableDebugMode);
    console.log('Logging Enabled:', Config.features.enableLogging);
    console.log('========================');
  }
};

export default Config;
