import js from '@eslint/js';
import { defineConfig } from 'eslint/config';
import configPrettier from 'eslint-config-prettier';
import { createTypeScriptImportResolver } from 'eslint-import-resolver-typescript';
import { importX as pluginImportX } from 'eslint-plugin-import-x';
import pluginNoRelativeImportPaths from 'eslint-plugin-no-relative-import-paths';
import pluginReact from 'eslint-plugin-react';
import pluginReactHooks from 'eslint-plugin-react-hooks';
import pluginReactRefresh from 'eslint-plugin-react-refresh';
import globals from 'globals';
import { configs as tseslintConfigs, parser as tseslintParser } from 'typescript-eslint';

const isProd = (process.env.NODE_ENV ?? '').toLowerCase() === 'production';

export default defineConfig(
  {
    ignores: ['dist/**', 'public/**'],
  },

  js.configs.recommended,

  /** @see https://github.com/un-ts/eslint-plugin-import-x?tab=readme-ov-file#typescript-example */
  pluginImportX.flatConfigs.recommended,
  pluginImportX.flatConfigs.typescript,

  /** @see https://typescript-eslint.io/getting-started/typed-linting */
  tseslintConfigs.recommendedTypeChecked,
  tseslintConfigs.stylisticTypeChecked,

  /** @see https://www.npmjs.com/package/eslint-plugin-react-hooks */
  pluginReactHooks.configs.flat.recommended,

  /** @see https://www.npmjs.com/package/eslint-plugin-react */
  pluginReact.configs.flat.recommended,
  pluginReact.configs.flat['jsx-runtime'],

  configPrettier,

  {
    files: ['**/*.{js,jsx,ts,tsx}'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: {
        ...globals.browser,
      },
      parserOptions: {
        ecmaFeatures: { jsx: true },
        /** @see https://typescript-eslint.io/packages/typescript-eslint#advanced-usage */
        parser: tseslintParser,
        /** @see https://typescript-eslint.io/blog/project-service */
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
    settings: {
      react: {
        version: 'detect',
      },
      'import-x/resolver-next': [
        createTypeScriptImportResolver({
          alwaysTryTypes: true,
          project: ['tsconfig.app.json', 'tsconfig.node.json'],
        }),
      ],
    },
  },

  {
    /** @see https://typescript-eslint.io/troubleshooting/typed-linting/#how-do-i-disable-type-checked-linting-for-a-file */
    files: ['**/*.{js,jsx}'],
    extends: [tseslintConfigs.disableTypeChecked],
  },

  {
    files: [
      '*.config.{js,ts,mjs,cjs}',
      'scripts/**/*.{js,ts}',
      'vite.config.{js,ts}',
      'vitest.config.{js,ts}',
    ],
    languageOptions: {
      globals: {
        ...globals.node,
      },
    },
  },

  {
    plugins: {
      'no-relative-import-paths': pluginNoRelativeImportPaths,
      'react-refresh': pluginReactRefresh,
    },
    rules: {
      'no-console': isProd ? 'error' : 'warn',
      'no-relative-import-paths/no-relative-import-paths': [
        'warn',
        { allowSameFolder: false, rootDir: 'src', prefix: '@' },
      ],
      'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],
      'import-x/order': [
        'error',
        {
          groups: [
            'builtin',
            'external',
            'type',
            'internal',
            ['parent', 'sibling', 'index'],
            'object',
            'unknown',
          ],
          pathGroups: [
            // react
            {
              pattern: '{react,react-dom,react-dom/**,react-*}',
              group: 'external',
              position: 'before',
            },

            // internal
            { pattern: '@/pages/**', group: 'internal', position: 'before' },
            { pattern: '@/components/**', group: 'internal', position: 'before' },
            { pattern: '@/shared/**', group: 'internal', position: 'after' },
            { pattern: '@/api/**', group: 'internal', position: 'after' },
          ],
          'newlines-between': 'always',
          pathGroupsExcludedImportTypes: ['builtin'],
          alphabetize: { order: 'asc', caseInsensitive: true },
        },
      ],
    },
  },
);
