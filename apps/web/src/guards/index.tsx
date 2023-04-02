import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';

import { AppState } from '@/store';

import { Guard } from './model';

const protecteds = ['/admin'];

export const withAuth: Guard = Component => props => {
  const { pathname, push } = useRouter();
  const user = useSelector((state: AppState) => state.user);

  const isAuth = pathname.includes('login') || pathname.includes('signup');
  const roles = user.data?.roles || [];

  if (pathname.includes('admin') && !roles.includes('ADMIN')) {
    push('/');
  }

  if (user.isLogged && isAuth) {
    push('/');
  }

  if (!user.isLogged && !isAuth) {
    protecteds.forEach(route => route == pathname && push('/login'));
  }

  return <Component {...props.pageProps} />;
};

export const withMe: Guard = Component => props => {
  const { push } = useRouter();
  const user = useSelector((state: AppState) => state.user);

  if (!user.isLogged && props.me) push('/auth/login');

  return <Component {...props.pageProps} />;
};
