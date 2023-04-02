import { FC, useEffect } from 'react';
import { AppProps } from 'next/app';
import { ThemeProvider } from 'styled-components';
import { themes } from '@phar/themes';
import { useDispatch } from 'react-redux';
import { PharThemeProvider } from '@phar/core';

import { withAppState } from '@/guards/state';
import { GlobalStyle } from '@/global';
import {
  setDefultLangAction,
} from '@/store/actions/lang.actions';

const App: FC<AppProps> = ({ Component, ...props }) => {
  const dispatch = useDispatch();

  const theme = themes.light;

  useEffect(() => {
    dispatch(setDefultLangAction());
  }, []);

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
