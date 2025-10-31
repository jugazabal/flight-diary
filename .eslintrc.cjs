module.exports = {
  root: true,
  env: {
    node: true,
    es2022: true,
    browser: true
  },
  ignorePatterns: ['build/', 'frontend/dist/', 'node_modules/'],
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint'],
  extends: ['eslint:recommended', 'plugin:@typescript-eslint/recommended'],
  rules: {
    semi: 'error'
  },
  overrides: [
    {
      // Backend / server TS files
      files: ['src/**/*.ts', '*.ts'],
      parserOptions: {
        project: './tsconfig.json',
        tsconfigRootDir: __dirname,
        sourceType: 'module'
      },
      rules: {
        '@typescript-eslint/no-unsafe-assignment': 'error',
        '@typescript-eslint/no-explicit-any': 'error',
        '@typescript-eslint/explicit-function-return-type': 'off',
        '@typescript-eslint/explicit-module-boundary-types': 'off',
        '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }]
      }
    },
    {
      // Frontend TS/TSX files
      files: ['frontend/**/*.ts', 'frontend/**/*.tsx'],
      parserOptions: {
        project: './frontend/tsconfig.json',
        tsconfigRootDir: __dirname,
        sourceType: 'module'
      },
      env: {
        browser: true,
        es2022: true
      },
      rules: {
        '@typescript-eslint/no-unsafe-assignment': 'error',
        '@typescript-eslint/no-explicit-any': 'error',
        '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }]
      }
    }
  ]
};
