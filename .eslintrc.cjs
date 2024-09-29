/**
 * This source file is part of the Swift.org open source project
 *
 * Copyright (c) 2021 Apple Inc. and the Swift project authors
 * Licensed under Apache License v2.0 with Runtime Library Exception
 *
 * See https://swift.org/LICENSE.txt for license information
 * See https://swift.org/CONTRIBUTORS.txt for Swift project authors
 */

/* eslint-env node */
require('@rushstack/eslint-patch/modern-module-resolution');
const createAliasSetting = require('@vue/eslint-config-airbnb-with-typescript/createAliasSetting');

module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: [
    'plugin:vue/vue3-essential',
    '@vue/eslint-config-airbnb-with-typescript',
    '@vue/eslint-config-airbnb-with-typescript/allow-js-in-vue',
    'plugin:vuejs-accessibility/recommended',
    'plugin:vitest-globals/recommended',
  ],
  parserOptions: {
    ecmaVersion: 'latest'
  },
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? [
      'error',
      { allow: ['error', 'warn'] },
    ] : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    indent: [
      'error', 2,
      { ignoredNodes: ['TemplateLiteral'] },
    ],
    'arrow-parens': ['error', 'as-needed', {
      requireForBlockBody: true,
    }],
    'template-curly-spacing': 'off',
    'vue/experimental-script-setup-vars': 'off',
    'vue/multi-word-component-names': 'off',
    'function-paren-newline': ['error', 'consistent'],
    'function-call-argument-newline': 'off',
    'vuejs-accessibility/form-control-has-label': 'off',
    'vuejs-accessibility/label-has-for': 'off',
    'vuejs-accessibility/aria-role': 'off',
    'vuejs-accessibility/click-events-have-key-events': 'off',
    'vuejs-accessibility/anchor-has-content': 'off',
    'no-irregular-whitespace': ['error', {
      skipStrings: true,
      skipComments: true,
    }],
  },
  overrides: [
    {
      files: ['*Icon.vue'],
      rules: {
        'max-len': 'off',
      },
    },
    {
      files: ['**/__mocks__/*.js'],
      env: {
        jest: true,
      },
    },
    {
      files: [
        '**/__tests__/*.{j,t}s?(x)',
        '**/tests/unit/**/*.spec.{j,t}s?(x)',
      ],
      env: {
        jest: true,
      },
    },
  ],
  settings: {
    ...createAliasSetting(['./tsconfig.json']),
  }
}
