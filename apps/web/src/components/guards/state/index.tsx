import { FC } from 'react';
import { AppProps } from 'next/app';
import { Provider } from 'react-redux';

import { wrapper } from '@/store';

export const withAppState =
  (Component: FC<AppProps>) => (appProps: AppProps) => {
    const { store, props } = wrapper.useWrappedStore(appProps);

    return (
      <Provider store={store}>
        <Component {...props} />
      </Provider>
    );
  };
