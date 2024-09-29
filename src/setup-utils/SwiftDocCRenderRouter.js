/**
 * This source file is part of the Swift.org open source project
 *
 * Copyright (c) 2021 Apple Inc. and the Swift project authors
 * Licensed under Apache License v2.0 with Runtime Library Exception
 *
 * See https://swift.org/LICENSE.txt for license information
 * See https://swift.org/CONTRIBUTORS.txt for Swift project authors
*/

import { createRouter, createWebHistory } from 'vue-router';
import {
  notFoundRouteName,
  serverErrorRouteName,
} from 'docc-render/constants/router';
import {
  saveScrollOnReload,
  restoreScrollOnReload,
  scrollBehavior,
} from 'docc-render/utils/router-utils';
import routes from 'docc-render/routes';
import { baseUrl } from 'docc-render/utils/theme-settings';
import { addPrefixedRoutes } from 'docc-render/utils/route-utils';

const { VITE_APP_TARGET } = import.meta.env;

const defaultRoutes = [
  ...routes,
  ...addPrefixedRoutes(routes, [
    notFoundRouteName,
    serverErrorRouteName,
  ]),
];

function createRouterInstance(routerConfig = {}) {
  const router = createRouter({
    history: createWebHistory(baseUrl),
    scrollBehavior,
    ...routerConfig,
    routes: routerConfig.routes || defaultRoutes,
  });

  router.isReady().then(async () => {
    // Disable the browser's automatic scroll restoration mechanism so that it doesn't
    // interfere with vue-router's scrollBehavior.
    // https://github.com/vuejs/vue-router/pull/1814
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }
    await restoreScrollOnReload();
  });

  if (VITE_APP_TARGET !== 'ide') {
    router.onError((error) => {
      const { route = { path: '/' } } = error;
      router.replace({
        name: 'server-error',
        params: [route.path],
      }).then(() => {});
    });
  }

  // save the scrollPosition when we quit the tab. eg: reload
  window.addEventListener('unload', saveScrollOnReload);

  return router;
}

const SwiftDocCRenderRouter = createRouterInstance();

export default SwiftDocCRenderRouter;
