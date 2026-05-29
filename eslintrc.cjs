module.exports = {
  root: true,
  env: {
    node: true,
    es2022: true,
  },
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint'],
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
  ],
  rules: {
    // Customize rules as needed
    '@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
    '@typescript-eslint/no-explicit-any': 'warn',
    'no-console': 'off',
    'semi': ['error', 'always'],
    'quotes': ['warn', 'single', { avoidEscape: true }],
  },
  ignorePatterns: [
    'node_modules/',
    'playwright-report/',
    'allure-report/',
    'allure-results/',
    'test-results/',
    'playwright-html-report/',
    '*.config.*.ts',
    'playwright.config.ts',
  ],
};
