import Link from 'next/link';
import Image from 'next/image';
import { useDispatch, useSelector } from 'react-redux';
import { PharAvatar, PharBadge, PharButton, PharModal } from '@phar/core';
import { langs } from '@phar/i18n';
import { useRouter } from 'next/router';
import classNames from 'classnames';
import { useEffect, useState } from 'react';

import { Search } from '../search';
import { AppState } from '@/store';
import { NavbarStyled } from './styles';
import {
  setAuthTokenAction,
  setUserDataAction,
  setUserIsLoggedAction,
} from '@/store/actions/user.actions';

import pharm from '../../assets/phar.svg';

export const Navbar = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  const { pathname } = useRouter();
  const [openModal, setOpenModal] = useState(false);
  const [openBottomSheet, setOpenBottomSheet] = useState(false);

  const {
    user: { isLogged, data, isLoading },
    lang,
  } = useSelector((state: AppState) => state);
  const i18n = langs[lang];

  const hidden = pathname.includes('auth');

  useEffect(() => {
    if (openModal) setOpenModal(false);
  }, [pathname]);

  const onLogout = () => {
    dispatch(setUserDataAction(null));
    dispatch(setUserIsLoggedAction(false));
    dispatch(setAuthTokenAction(null));
    router.push('/');
  };

  const search = <Search />;

  const auth = (
    <>
      <div>
        <Link href="/cart">
          <PharBadge count={data?.cart.length || 0}>
            <i className="cart ri-shopping-cart-fill" />
          </PharBadge>
        </Link>
      </div>

      {isLogged || isLoading ? (
        <PharAvatar
          isLoading={isLoading}
          onLogout={onLogout}
          username={data?.username}
        />
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
    </>
  );

  return (
    <NavbarStyled className={classNames({ hidden })}>
      <section>
        <Link href="/">
          <Image src={pharm} alt="Pharm" />
        </Link>

        {search}
      </section>

      <div className="mobile_action">
        <PharButton bold={600} onClick={() => setOpenModal(true)}>
          <i className="ri-search-line" />
        </PharButton>
        <PharButton bold={600} onClick={() => setOpenBottomSheet(true)}>
          <i className="ri-menu-3-line" />
        </PharButton>
      </div>

      <PharModal
        open={openModal}
        className="search_modal"
        onClose={() => setOpenModal(false)}
      >
        <div className="search_content_modal">{search}</div>
      </PharModal>

      <PharModal
        open={openBottomSheet}
        className="auth_modal"
        onClose={() => setOpenBottomSheet(false)}
      >
        <div className="auth_content_modal">{auth}</div>
      </PharModal>

      <div className="nav_items">{auth}</div>
    </NavbarStyled>
  );
};
