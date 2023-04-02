import Link from 'next/link';
import Image from 'next/image';
import { useSelector } from 'react-redux';
import { PharAvatar, PharButton } from '@phar/core';
import { langs } from '@phar/i18n';

import { AppState } from '@/store';

import { NavbarStyled } from './styles';

import pharm from '../../assets/phar.svg';

export const Navbar = () => {
  const {
    user: { isLogged, data, isLoading },
    lang,
  } = useSelector((state: AppState) => state);

  const i18n = langs[lang];

  return (
    <NavbarStyled>
      <Link href="/">
        <Image src={pharm} alt="Pharm" />
      </Link>

      <div>
        {isLogged || isLoading ? (
          <PharAvatar isLoading={isLoading} username={data?.username} />
        ) : (
          <div className="auth_action">
            <Link href="/auth/login">
              <PharButton bold={600}>{i18n.login}</PharButton>
            </Link>
            <Link href="/auth/signup">
              <PharButton bold={600}>{i18n.signup}</PharButton>
            </Link>
          </div>
        )}
      </div>
    </NavbarStyled>
  );
};
