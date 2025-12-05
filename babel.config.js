module.exports = function (api) {
  // Cache config for performance; re-evaluate when NODE_ENV changes
  api && api.cache && api.cache.using(() => process.env.NODE_ENV);
  const envFile = process.env.ENVFILE || '.env';
  return {
    presets: ['module:@react-native/babel-preset'],
    plugins: [
      [
        'module:react-native-dotenv',
        {
          envName: 'APP_ENV',
          moduleName: '@env',
          path: envFile,
          blocklist: null,
          allowlist: null,
          safe: false,
          allowUndefined: true,
          verbose: false,
        },
      ],
      'react-native-reanimated/plugin',
    ],
  };
};
