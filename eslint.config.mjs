// eslint.config.mjs
import js from '@eslint/js';
import globals from 'globals';
import react from 'eslint-plugin-react';
import tseslint from 'typescript-eslint';
import prettier from 'eslint-plugin-prettier';

export default tseslint.config(js.configs.recommended, ...tseslint.configs.recommended, {
  files: ['**/*.{ts,tsx,js,jsx}'],
  ignores: ['node_modules', 'dist', '.next'],
  languageOptions: {
    globals: {
      ...globals.browser,
      ...globals.node,
    },
  },
  plugins: {
    react,
    prettier,
  },
  rules: {
    ...react.configs.recommended.rules,
    'react/react-in-jsx-scope': 'off', // Next.js에서는 불필요
    'prettier/prettier': 'error', // prettier 규칙을 ESLint에 통합
    '@typescript-eslint/no-unused-vars': ['warn'],
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
});
