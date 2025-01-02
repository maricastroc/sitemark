module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true
    }
  },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react/recommended'
  ],
  plugins: ['@typescript-eslint', 'react'],
  rules: {
    indent: ['error', 2],
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/indent': ['error', 2],
    'react/jsx-indent': ['error', 2],
    'react/jsx-indent-props': ['error', 2]
  },
  ignorePatterns: ['node_modules/', 'dist/', 'build/'] // Exemplos de diretórios a serem ignorados
};
