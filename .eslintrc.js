module.exports = {
  root: true,
  extends: [
    '@react-native-community',
    'eslint:recommended',
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended',
  ],
  env: { jest: true },
  ignorePatterns: [
    'node_modules/',
    'coverage/',
    'android/',
    'ios/',
    'src/mocks/Setup',
  ],
  rules: {
    'react/react-in-jsx-scope': 'off',
    'prettier/prettier': 'off',
    '@typescript-eslint/no-unused-vars': 'off',
    'eslint-comments/no-unused-disable': 'off',
  },
};
