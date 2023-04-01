import { FC } from 'react';
import { AppProps } from 'next/app';
import { ThemeProvider } from 'styled-components';
import { themes } from '@phar/themes';
import { PharThemeProvider } from '@phar/core';

import { withAppState } from '@/components/guards/state';
import { GlobalStyle } from '@/global';

const App: FC<AppProps> = ({ Component, ...props }) => {
  const theme = themes.light;

  return (
    <PharThemeProvider theme={theme}>
      <ThemeProvider theme={theme}>
        <Component {...props} />

        <GlobalStyle />
      </ThemeProvider>
    </PharThemeProvider>
  );
};

export default withAppState(App);
