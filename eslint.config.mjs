import globals from 'globals';
import pluginJs from '@eslint/js';
import tseslint from 'typescript-eslint';
import stylistic from '@stylistic/eslint-plugin';
import typescriptEslint from '@typescript-eslint/eslint-plugin';
import typescriptEslintParser from '@typescript-eslint/parser';

export default [
    { files: ['**/*.{js,mjs,cjs,ts}'] },
    { languageOptions: { globals: globals.browser } },
    pluginJs.configs.recommended,
    ...tseslint.configs.recommended,
    {
        languageOptions: {
            parser: typescriptEslintParser,
            parserOptions: {
                project: './tsconfig.json',
            },
        },
        plugins: {
            '@typescript-eslint': typescriptEslint,
            '@stylistic': stylistic,
        },
        rules: {
            curly: 'error',
            quotes: ['error', 'single', { avoidEscape: true }],
            'prefer-const': ['error', { destructuring: 'all' }],
            'no-else-return': ['error', { allowElseIf: false }],
            'no-console': [
                'error',
                {
                    allow: ['warn', 'error', 'info', 'dir', 'clear'],
                },
            ],
            'no-dupe-args': 'error',
            '@typescript-eslint/no-floating-promises': 'error',
            '@typescript-eslint/no-unused-vars': [
                'error',
                {
                    vars: 'all',
                    args: 'none',
                },
            ],
            '@typescript-eslint/explicit-module-boundary-types': 'off',
            '@typescript-eslint/no-explicit-any': 'warn',
            '@stylistic/max-len': ['error', {
                code: 120,
                ignoreComments: true,
                ignoreTemplateLiterals: true,
            }],
            '@stylistic/indent': ['error', 4, { ignoredNodes: ['JSXAttribute'] }],
            '@stylistic/object-curly-spacing': ['error', 'always'],
            '@stylistic/eol-last': 'error',
            '@stylistic/semi': 'error',
            '@stylistic/comma-dangle': ['error', 'always-multiline'],
            '@stylistic/padding-line-between-statements': [
                'error',
                { blankLine: 'always', prev: '*', next: 'return' },
                { blankLine: 'always', prev: 'block-like', next: '*' },
                { blankLine: 'always', prev: 'block', next: '*' },
            ],
            '@stylistic/no-multi-spaces': 'error',
            '@stylistic/space-infix-ops': 'error',
            '@stylistic/key-spacing': 'error',
            '@stylistic/arrow-spacing': 'error',
            '@stylistic/brace-style': 'error',
            '@stylistic/no-multiple-empty-lines': ['error', { max: 1, maxEOF: 0 }],
            '@stylistic/member-delimiter-style': 'error',
            '@stylistic/jsx-curly-brace-presence': [2, { props: 'never' }],
            '@stylistic/jsx-wrap-multilines': [
                'error',
                {
                    declaration: 'parens-new-line',
                    assignment: 'parens-new-line',
                    return: 'parens-new-line',
                    arrow: 'parens-new-line',
                    condition: 'parens-new-line',
                    logical: 'parens-new-line',
                    prop: 'parens-new-line',
                },
            ],
            '@stylistic/operator-linebreak': ['error', 'before'],
            '@typescript-eslint/no-var-requires': 'off',
            '@typescript-eslint/ban-ts-comment': 'off',
        },
    },
];
