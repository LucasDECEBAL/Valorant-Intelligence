import eslint from '@eslint/js';

export default [
  {
    ignores: ['.next/**', 'node_modules/**'],
  },
  eslint.configs.recommended,
];
