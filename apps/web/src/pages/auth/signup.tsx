import { NextPage } from 'next';
import { langs } from '@phar/i18n';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import { useState } from 'react';

import { Auth } from '@/components/auth';
import { AuthFormFields } from '@/components/auth/model';
import { withAuth } from '@/guards';

import { AppState } from '@/store';
import { AuthServices } from '@/services/auth.services';
import { showAlert } from '@/utils/funcs';
import {
  setAuthTokenAction,
  setUserDataAction,
  setUserIsAdminAction,
  setUserIsLoggedAction,
} from '@/store/actions/user.actions';
import { SignupData } from '@/types/auth.types';

const Signup: NextPage = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  const { lang } = useSelector((state: AppState) => state);
  const [isLoading, setIsLoading] = useState(false);

  const i18n = langs[lang];

  const onSignup = async (form: AuthFormFields) => {
    const authServices = new AuthServices(lang);
    const res = await authServices.signup(form as SignupData);

    if (res) {
      showAlert(i18n.welcome, 'success');
      setIsLoading(true);

      const { user, token } = res;
      const isAdmin = user.roles.includes('ADMIN');

      dispatch(setUserDataAction(user));
      dispatch(setUserIsLoggedAction(true));
      dispatch(setUserIsAdminAction(isAdmin));
      dispatch(setAuthTokenAction(token));

      setIsLoading(false);

      router.push('/');
    }
  };

  return <Auth isLoading={isLoading} type="signup" onAuth={e => onSignup(e)} />;
};

export default withAuth(Signup);
