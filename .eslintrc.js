module.exports = {
  root: true,
  extends: ['@react-native-community', 'plugin:react-hooks/recommended'],
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint'],
  rules: {
    'no-shadow': 'off',
    '@typescript-eslint/no-shadow': ['error'],
  },
  overrides: [
    {
      files: ['src/**/*'],
      rules: {
        'react-native/no-inline-styles': 'off',
      },
    },
  ],
};
