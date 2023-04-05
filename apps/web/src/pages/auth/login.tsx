import { NextPage } from 'next';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import { langs } from '@phar/i18n';
import { useState } from 'react';

import { Auth } from '@/components/auth';
import { AuthFormFields } from '@/components/auth/model';
import { withAuth } from '@/guards';

import { AuthServices } from '@/services/auth.services';
import { AppState } from '@/store';
import { showAlert } from '@/utils/funcs';
import {
  setAuthTokenAction,
  setUserDataAction,
  setUserIsAdminAction,
  setUserIsLoggedAction,
} from '@/store/actions/user.actions';

const Login: NextPage = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(false);
  const { lang } = useSelector((state: AppState) => state);

  const i18n = langs[lang];

  const onLogin = async (form: AuthFormFields) => {
    const authServices = new AuthServices(lang);
    setIsLoading(true);
    const res = await authServices.login(form);
    setIsLoading(false);

    if (res) {
      showAlert(i18n.welcomeBack, 'success');

      const { user, token } = res;
      const isAdmin = user.roles.includes('ADMIN');

      dispatch(setUserDataAction(user));
      dispatch(setUserIsLoggedAction(true));
      dispatch(setUserIsAdminAction(isAdmin));
      dispatch(setAuthTokenAction(token));

      router.push('/');
    }
  };

  return <Auth isLoading={isLoading} type="login" onAuth={e => onLogin(e)} />;
};

export default withAuth(Login);
