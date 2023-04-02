import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { themes } from '@phar/themes';
import { ThemeProvider } from 'styled-components';
import { PharSkeletonTheme, PharThemeProvider } from '@phar/core';

import { setDefaultLangAction } from '@/store/actions/lang.actions';

import { AppProviderProps } from './model';

export const AppProvider = ({ children }: AppProviderProps) => {
  const dispatch = useDispatch();

  const theme = themes.light;

  useEffect(() => {
    dispatch(setDefaultLangAction());
  }, []);

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
