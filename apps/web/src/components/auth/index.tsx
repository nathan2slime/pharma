import Link from 'next/link';
import Image from 'next/image';
import { langs } from '@phar/i18n';
import { useSelector } from 'react-redux';
import { PharButton, PharInput } from '@phar/core';
import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import { AppState } from '@/store';

import { AuthProps } from './model';
import { AuthStyled } from './styles';

import pharm from '@/assets/pharm.svg';

export const Auth = ({ type }: AuthProps) => {
  const { lang } = useSelector((state: AppState) => state);

  const i18n = langs[lang];

  const defaultSchema = {
    email: yup.string().required(i18n.form.required).email(i18n.form.email),
    password: yup.string().required(i18n.form.required),
  };

  const schemas = {
    login: yup.object().shape(defaultSchema),
    signup: yup.object().shape({
      ...defaultSchema,
      username: yup.string().required(i18n.form.required),
    }),
  };

  const {
    formState: { isValid, errors },
    setValue,
    trigger,
    watch,
  } = useForm({
    resolver: yupResolver(schemas[type]),
  });

  const form = watch();

  return (
    <AuthStyled>
      <div>
        <div>
          <Link aria-label={i18n.back} href="/">
            <Image src={pharm} alt="Pharm" />
          </Link>

          <div>
            <h3>{type == 'login' ? i18n.welcomeBack : i18n.welcome}</h3>

            {<p>{type == 'login' ? i18n.loginNow : i18n.signupNow}</p>}
          </div>
        </div>

        <div>
          {type == 'signup' && (
            <PharInput
              label={i18n.username}
              value={form.username || ''}
              error={!!errors.username?.message}
              helper={errors.username?.message as string}
              aria-label={i18n.insertUsername}
              onChange={e => setValue('username', e, { shouldValidate: true })}
              block
            />
          )}

          <PharInput
            type="email"
            label={i18n.email}
            aria-label={i18n.insertEmail}
            value={form.email || ''}
            error={!!errors.email?.message}
            helper={errors.email?.message as string}
            placeholder="example@gmail.com"
            onChange={e => setValue('email', e, { shouldValidate: true })}
            block
          />

          <PharInput
            error={!!errors.password?.message}
            aria-label={i18n.insertPassword}
            type="password"
            helper={errors.password?.message as string}
            value={form.password || ''}
            block
            onChange={e => setValue('password', e, { shouldValidate: true })}
            label={i18n.password}
          />
        </div>

        <PharButton
          block
          bold={600}
          disabled={!isValid}
          aria-label={i18n[type]}
        >
          {i18n[type]}
        </PharButton>
      </div>
    </AuthStyled>
  );
};
