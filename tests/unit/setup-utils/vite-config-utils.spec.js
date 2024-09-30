// @vitest-environment node

/**
 * This source file is part of the Swift.org open source project
 *
 * Copyright (c) 2021 Apple Inc. and the Swift project authors
 * Licensed under Apache License v2.0 with Runtime Library Exception
 *
 * See https://swift.org/LICENSE.txt for license information
 * See https://swift.org/CONTRIBUTORS.txt for Swift project authors
*/

import viteConfig from 'docc-render/setup-utils/vite-config-utils';
import {
  beforeEach, describe, expect, it,
} from 'vitest';

describe('vite-config-utils', () => {
  beforeEach(() => {
    delete import.meta.env.VITE_APP_TITLE;
    delete import.meta.env.VITE_APP_DEV_SERVER_PROXY;
  });
  describe('Page Title', () => {
    it('does not set a page variable if already provided', () => {
      import.meta.env.VITE_APP_TITLE = 'Foo';
      viteConfig();
      expect(import.meta.env.VITE_APP_TITLE).toBe('Foo');
    });

    it('does not set a page title if it is set to empty value', () => {
      import.meta.env.VITE_APP_TITLE = '';
      viteConfig();
      expect(import.meta.env.VITE_APP_TITLE).toBe('');
    });

    it('sets the default page title if none provided', () => {
      viteConfig();
      expect(import.meta.env.VITE_APP_TITLE).toBe('Documentation');
    });
  });

  describe('options', () => {
    it('generates Vite config options', () => {
      expect(viteConfig())
        .toEqual({
          base: '{{BASE_PATH}}',
          plugins: expect.any(Array),
          resolve: {
            alias: expect.any(Array),
          },
          css: {
            preprocessorOptions: {
              scss: {
                additionalData: "$build-target: 'default'; $is-target-ide: $build-target == 'ide';",
              },
            },
            postcss: expect.any(Object),
          },
          server: { proxy: { '^/(data|downloads|images|videos|index)': 'http://localhost:8000' } },
          build: {
            target: expect.any(Array),
            cssCodeSplit: false,
            sourcemap: false,
          },
          optimizeDeps: {
            entries: ['swift-docc-render'],
          },
          test: {
            environment: 'jsdom',
            setupFiles: ['./tests/unit/config.js', './tests/unit/setup.mjs'],
          },
        });
    });
    it('generates Vite config options, under production mode', () => {
      process.env.NODE_ENV = 'production';
      expect(viteConfig())
        .toEqual({
          base: '{{BASE_PATH}}',
          plugins: expect.any(Array),
          resolve: {
            alias: expect.any(Array),
          },
          css: {
            preprocessorOptions: {
              scss: {
                additionalData: "$build-target: 'default'; $is-target-ide: $build-target == 'ide';",
              },
            },
            postcss: expect.any(Object),
          },
          server: { proxy: { '^/(data|downloads|images|videos|index)': 'http://localhost:8000' } },
          build: {
            target: expect.any(Array),
            cssCodeSplit: true,
            sourcemap: false,
          },
          optimizeDeps: {
            entries: ['swift-docc-render'],
          },
          test: {
            environment: 'jsdom',
            setupFiles: ['./tests/unit/config.js', './tests/unit/setup.mjs'],
          },
        });
    });
  });
});
