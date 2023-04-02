import { PharThemeProvider } from '@phar/core';
import { themes } from '@phar/themes';

import './styles/global.scss';

/** @type { import('@storybook/react').Preview } */
const preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
    actions: { argTypesRegex: '^on.*' },
  },
};

export default preview;

/** @type { import('@storybook/react').Decorator } */
export const decorators = [
  Story => (
    <PharThemeProvider theme={themes.light}>
      <Story />
    </PharThemeProvider>
  ),
];
