import js from '@eslint/js'
import globals from 'globals'
import tseslint from 'typescript-eslint'
import pluginReactHooks from 'eslint-plugin-react-hooks'
import pluginReactRefresh from 'eslint-plugin-react-refresh'
import prettierConfig from 'eslint-config-prettier'
import { defineConfig } from 'eslint/config'

export default defineConfig([
  { ignores: ['dist'] },
  {
    files: ['**/*.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],
    plugins: {
      js,
      'react-hooks': pluginReactHooks,
      'react-refresh': pluginReactRefresh,
    },
    extends: ['js/recommended', ...tseslint.configs.recommended, prettierConfig],
    languageOptions: {
      globals: globals.browser,
      parserOptions: {
        ecmaFeatures: { jsx: true },
      },
    },
    rules: {
      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': 'warn',
      'react-refresh/only-export-components': 'off',
    },
  },
])
