import Link from 'next/link';
import Image from 'next/image';
import { useSelector } from 'react-redux';
import { PharAvatar, PharBadge, PharButton } from '@phar/core';
import { langs } from '@phar/i18n';
import { useRouter } from 'next/router';
import classNames from 'classnames';

import { Search } from '../search';

import { AppState } from '@/store';

import { NavbarStyled } from './styles';

import pharm from '../../assets/phar.svg';

export const Navbar = () => {
  const { pathname } = useRouter();

  const {
    user: { isLogged, data, isLoading },
    lang,
  } = useSelector((state: AppState) => state);

  const i18n = langs[lang];

  const hidden = pathname.includes('auth') || pathname.includes('product');

  return (
    <NavbarStyled className={classNames({ hidden })}>
      <Link href="/">
        <Image src={pharm} alt="Pharm" />
      </Link>

      <Search />

      <div>
        <div>
          <PharBadge count={20}>
            <i className="ri-shopping-cart-fill" />
          </PharBadge>

          <PharBadge count={9}>
            <i className="ri-bookmark-line" />
          </PharBadge>
        </div>

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
