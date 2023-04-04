import { themes } from '@phar/themes';
import { ThemeProvider } from 'styled-components';
import { PharSkeletonTheme, PharThemeProvider } from '@phar/core';

import { AppProviderProps } from './model';

export const AppProvider = ({ children }: AppProviderProps) => {
  const theme = themes.light;

  return (
    <PharThemeProvider theme={theme}>
      <ThemeProvider theme={theme}>
        <PharSkeletonTheme
          baseColor={theme.backgroundColorUp}
          highlightColor={theme.foregroundColorDown}
        >
          {children}
        </PharSkeletonTheme>
      </ThemeProvider>
    </PharThemeProvider>
  );
};
