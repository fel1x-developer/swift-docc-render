/**
 * This source file is part of the Swift.org open source project
 *
 * Copyright (c) 2023 Apple Inc. and the Swift project authors
 * Licensed under Apache License v2.0 with Runtime Library Exception
 *
 * See https://swift.org/LICENSE.txt for license information
 * See https://swift.org/CONTRIBUTORS.txt for Swift project authors
*/

import { createI18n } from 'vue-i18n';
import * as lang from 'theme/lang/index';

function createi18nInstance(config = lang) {
  const { defaultLocale, messages, dateTimeFormats = {} } = config;

  return createI18n({
    dateTimeFormats,
    locale: defaultLocale,
    fallbackLocale: defaultLocale,
    messages,
  });
}

const SwiftDocCRenderi18n = createi18nInstance();

export default SwiftDocCRenderi18n;
