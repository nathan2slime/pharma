import Link from 'next/link';
import Image from 'next/image';
import { langs } from '@phar/i18n';
import { useSelector } from 'react-redux';
import { PharButton, PharInput } from '@phar/core';
import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import { AppState } from '@/store';

import { AuthProps, AuthFormFields } from './model';
import { AuthStyled } from './styles';

import pharm from '@/assets/pharm.svg';

export const Auth = ({ type, onAuth }: AuthProps) => {
  const { lang } = useSelector((state: AppState) => state);

  const i18n = langs[lang];

  const schemas = {
    login: yup.object().shape({
      email: yup.string().required(i18n.form.required).email(i18n.form.email),
      password: yup.string().required(i18n.form.required),
    }),
    signup: yup.object().shape({
      email: yup.string().required(i18n.form.required).email(i18n.form.email),
      password: yup
        .string()
        .required(i18n.form.required)
        .min(8, i18n.mustBeAtLeastCharacter(8)),
      username: yup
        .string()
        .required(i18n.form.required)
        .min(6, i18n.mustBeAtLeastCharacter(6))
        .max(14, i18n.maximumCharactersReaching)
        .matches(/^[a-zA-Z0-9]+$/, i18n.invalidUsername),
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

  const onSubmit = async () => {
    const res = await trigger();

    if (res) onAuth(form as AuthFormFields);
  };

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
          onClick={() => onSubmit()}
          aria-label={i18n[type]}
        >
          {i18n[type]}
        </PharButton>

        <Link href={type == 'login' ? '/auth/signup' : '/auth/login'}>
          {type == 'login' ? i18n.dontHaveAnAccount : i18n.alreadyHaveAnAccount}

          <i className="ri-arrow-right-s-line" />
        </Link>
      </div>
    </AuthStyled>
  );
};
