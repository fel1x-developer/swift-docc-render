/**
 * This source file is part of the Swift.org open source project
 *
 * Copyright (c) 2021 Apple Inc. and the Swift project authors
 * Licensed under Apache License v2.0 with Runtime Library Exception
 *
 * See https://swift.org/LICENSE.txt for license information
 * See https://swift.org/CONTRIBUTORS.txt for Swift project authors
*/

// eslint-disable-next-line import/no-named-default
import { default as CommunicationBridge } from 'docc-render/plugins/CommunicationBridge';
import CustomComponents from 'docc-render/plugins/CustomComponents';
import directives from '../directives';

const { VITE_APP_TARGET } = import.meta.env;

/**
 * This is the SwiftDocCRenderPlugin, which attaches things to the Vue instance
 * Attach all Swift-DocC-Render helpers into the Vue object.
 */
export default {
  install: (app, {
    performanceMetrics = false,
  } = {}) => {
    app.use(CustomComponents);

    // Set up custom global directives
    app.directive('hide', directives.hide);

    app.use(CommunicationBridge, {
      appTarget: VITE_APP_TARGET,
      performanceMetricsEnabled: performanceMetrics,
    });

    window.bridge = app.config.globalProperties.$bridge;

    // Emit performance metrics.
    // eslint-disable-next-line no-param-reassign
    app.config.performance = performanceMetrics;
  },
};
