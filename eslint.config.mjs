// @ts-check
import eslint from '@eslint/js';
import eslintConfigPrettier from 'eslint-config-prettier/flat';
import { defineConfig, globalIgnores } from 'eslint/config';
import nextCoreWebVitals from 'eslint-config-next/core-web-vitals';
import globals from 'globals';
import tseslint from 'typescript-eslint';

const FRONTEND_FILES = ['frontend/**/*.{ts,tsx}'];

const NO_PARENT_IMPORTS = {
  regex: '^\\.\\./',
  message: 'Use the `~/` alias (maps to `src/`) instead of parent-relative imports.',
};

const NO_DIRECT_SHARED_IMPORTS = {
  name: '@quiz/shared',
  message:
    'Import shared types, enums, constants and schemas through the local barrels (`libs/types/types`, `libs/enums/enums`, ...).',
};

const SHARED_REEXPORT_BARRELS = [
  'backend/src/**/libs/{types/types,enums/enums,constants/constants,validation-schemas/validation-schemas}.ts',
  'frontend/src/**/libs/{types/types,enums/enums,constants/constants,validation-schemas/validation-schemas}.ts',
];

const nextConfigs = nextCoreWebVitals
  .filter((config) => config.name === 'next' || config.name === 'next/core-web-vitals')
  .map(({ languageOptions: _languageOptions, ...config }) => ({
    ...config,
    files: FRONTEND_FILES,
  }));

export default defineConfig(
  globalIgnores([
    '**/node_modules/',
    '**/dist/',
    '**/coverage/',
    '**/.next/',
    '**/next-env.d.ts',
    'backend/src/generated/',
  ]),

  eslint.configs.recommended,
  tseslint.configs.recommendedTypeChecked,

  {
    languageOptions: {
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
    rules: {
      '@typescript-eslint/no-unused-vars': [
        'error',
        { argsIgnorePattern: '^_', varsIgnorePattern: '^_', caughtErrorsIgnorePattern: '^_' },
      ],
      'no-restricted-syntax': [
        'error',
        {
          selector: 'ExportAllDeclaration',
          message: 'Use named re-exports: `export { a, b } from "..."`.',
        },
        {
          selector: 'ImportNamespaceSpecifier',
          message: 'Use named imports: `import { a, b } from "..."`.',
        },
      ],
    },
  },

  {
    files: ['**/*.{js,mjs,cjs}'],
    extends: [tseslint.configs.disableTypeChecked],
    languageOptions: { globals: globals.node },
  },

  {
    files: ['backend/**/*.ts', 'packages/**/*.ts'],
    languageOptions: { globals: globals.node },
  },

  {
    files: ['packages/shared/src/**/*.ts', SHARED_REEXPORT_BARRELS].flat(),
    rules: {
      'no-restricted-imports': ['error', { patterns: [NO_PARENT_IMPORTS] }],
    },
  },

  {
    files: ['backend/src/**/*.ts', 'backend/prisma/**/*.ts', 'frontend/src/**/*.{ts,tsx}'],
    ignores: SHARED_REEXPORT_BARRELS,
    rules: {
      'no-restricted-imports': [
        'error',
        { paths: [NO_DIRECT_SHARED_IMPORTS], patterns: [NO_PARENT_IMPORTS] },
      ],
    },
  },

  ...nextConfigs,

  {
    files: FRONTEND_FILES,
    languageOptions: { globals: { ...globals.browser, ...globals.node } },
    settings: { react: { version: 'detect' }, next: { rootDir: 'frontend' } },
  },

  eslintConfigPrettier,
);
