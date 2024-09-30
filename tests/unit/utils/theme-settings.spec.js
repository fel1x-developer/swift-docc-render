/**
 * This source file is part of the Swift.org open source project
 *
 * Copyright (c) 2021 Apple Inc. and the Swift project authors
 * Licensed under Apache License v2.0 with Runtime Library Exception
 *
 * See https://swift.org/LICENSE.txt for license information
 * See https://swift.org/CONTRIBUTORS.txt for Swift project authors
*/

import { vi } from 'vitest';

const themeSettings = {
  theme: 'foo',
};

const jsonMock = vi.fn().mockResolvedValue(themeSettings);
const fetchMock = vi.fn().mockResolvedValue({
  json: jsonMock,
});

const resolveAbsoluteUrlMock = vi.fn();
const mockUrlHelper = {
  resolveAbsoluteUrl: resolveAbsoluteUrlMock,
};

vi.mock('docc-render/utils/url-helper', () => (mockUrlHelper));

async function importDeps() {
  vi.resetModules();
}

window.fetch = fetchMock;

describe('theme-settings', () => {
  beforeEach(() => {
    importDeps();
    vi.clearAllMocks();
  });

  it('fetches the theme settings from a remote path', async () => {
    const { fetchThemeSettings } = await import('@/utils/theme-settings');
    window.baseUrl = '/';
    resolveAbsoluteUrlMock.mockReturnValue('http://localhost/theme-settings.json');
    importDeps();
    await fetchThemeSettings();
    expect(resolveAbsoluteUrlMock).toHaveBeenCalledWith('/theme-settings.json');
    expect(fetchMock).toHaveBeenCalledTimes(1);
    expect(fetchMock).toHaveBeenCalledWith('http://localhost/theme-settings.json');
    expect(jsonMock).toHaveBeenCalledTimes(1);
  });

  it('uses the window.baseUrl for the json path', async () => {
    const { fetchThemeSettings } = await import('@/utils/theme-settings');
    window.baseUrl = '/bar/foo/';
    resolveAbsoluteUrlMock.mockReturnValue(`http://localhost${window.baseUrl}theme-settings.json`);
    importDeps();
    await fetchThemeSettings();
    expect(resolveAbsoluteUrlMock).toHaveBeenCalledWith('/theme-settings.json');
    expect(fetchMock).toHaveBeenCalledTimes(1);
    expect(fetchMock).toHaveBeenCalledWith('http://localhost/bar/foo/theme-settings.json');
    expect(jsonMock).toHaveBeenCalledTimes(1);
  });

  it('silences errors while fetching theme settings', async () => {
    const { fetchThemeSettings } = await import('@/utils/theme-settings');
    fetchMock.mockRejectedValueOnce('Foo is not JSON');
    expect(await fetchThemeSettings()).toEqual({});
  });

  it('retrieves already stored data', async () => {
    const { getSetting, themeSettingsState } = await import('@/utils/theme-settings');
    expect(getSetting(['theme'])).toEqual({});
    Object.assign(themeSettingsState, themeSettings);
    expect(getSetting(['theme'])).toEqual(themeSettings.theme);
  });
});
