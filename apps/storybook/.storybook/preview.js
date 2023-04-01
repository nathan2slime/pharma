import React from 'react';

import { PharThemeProvider } from '@phar/core';
import themes from '@phar/themes';

import './styles/global.css';

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
};

export const decorators = [
  Story => (
    <PharThemeProvider theme={themes.dark}>
      <Story />
    </PharThemeProvider>
  ),
];
