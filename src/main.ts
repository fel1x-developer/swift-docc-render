/**
 * This source file is part of the Swift.org open source project
 *
 * Copyright (c) 2024 Apple Inc. and the Swift project authors
 * Licensed under Apache License v2.0 with Runtime Library Exception
 *
 * See https://swift.org/LICENSE.txt for license information
 * See https://swift.org/CONTRIBUTORS.txt for Swift project authors
*/

import { createHead, VueHeadMixin } from '@unhead/vue'
import { createApp, configureCompat } from 'vue';
import App from '@/App.vue';
import SwiftDocCRenderPlugin from '@/setup-utils/SwiftDocCRenderPlugin';
import SwiftDocCRenderRouter from '@/setup-utils/SwiftDocCRenderRouter';
import SwiftDocCRenderi18n from '@/setup-utils/SwiftDocCRenderi18n';

configureCompat({
  ATTR_FALSE_VALUE: false,
});

// eslint-disable-next-line import/prefer-default-export
export const app = createApp(App);
const head = createHead();

export const bridge = app.config.globalProperties.$bridge;

app.use(SwiftDocCRenderPlugin);
app.use(SwiftDocCRenderRouter);
app.use(SwiftDocCRenderi18n);
app.use(head);
app.mixin(VueHeadMixin);

SwiftDocCRenderRouter.isReady().then(() => app.mount('#app'));
