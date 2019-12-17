module.exports = {
  parser: '@typescript-eslint/parser',
  extends: ['prettier', 'plugin:@typescript-eslint/recommended'],
  parserOptions: {
    ecmaVersion: 6,
    sourceType: 'module',
  },
  env: { jest: true, browser: true, node: true },
  rules: { 'no-console': 'warn' },
};
