import { FC } from 'react';
import { AppProps } from 'next/app';

import { withAppState } from '@/providers/state';
import { Alert } from '@/components/alert';
import { AppProvider } from '@/providers/app';

import { GlobalStyle } from '@/global';
import { AuthProvider } from '@/providers/auth';

const App: FC<AppProps> = ({ Component, ...props }) => {
  return (
    <AppProvider>
      <AuthProvider>
        <Component {...props.pageProps} />

        <Alert />

        <GlobalStyle />
      </AuthProvider>
    </AppProvider>
  );
};

export default withAppState(App);
