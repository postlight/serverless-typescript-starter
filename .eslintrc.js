module.exports = {
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint'],
  extends: ['prettier', 'airbnb'],
  parserOptions: {
    ecmaVersion: 6,
    sourceType: 'module',
  },
  env: { jest: true, browser: true, node: true },
  rules: { 'no-console': 'warn' },
  settings: {
    'import/resolver': {
      node: {
        paths: ['src'],
        extensions: ['.js', '.ts'],
      },
    },
  },
};
