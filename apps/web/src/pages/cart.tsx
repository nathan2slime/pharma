import { NextPage } from 'next';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { PharBadge, PharProductCard } from '@phar/core';
import { useRouter } from 'next/router';
import { langs } from '@phar/i18n';
import Skeleton from 'react-loading-skeleton';

import { withAuth } from '@/guards';

import { CartStyled } from '@/styles/cart.styles';
import { CartProduct, ProductType } from '@/types/product.types';
import { ProductServices } from '@/services/product.services';
import {
  addProductInCartUserAction,
  removeProductFromCartUserAction,
} from '@/store/actions/user.actions';
import {
  addProductInCartUserThunk,
  removeProductFromCartUserThunk,
} from '@/store/thunks/user.thunks';
import { AppState, useTypedDispatch } from '@/store';

export type CartProps = {};

const Cart: NextPage<CartProps> = () => {
  const { lang, user } = useSelector((state: AppState) => state);
  const router = useRouter();
  const dispatch = useTypedDispatch();

  const [isLoading, setIsLoading] = useState(true);
  const [products, setProducts] = useState<ProductType[]>([]);

  const i18n = langs[lang];

  useEffect(() => {
    if (!user.isLogged && !user.isLoading) {
      router.push('/auth/login');
    }

    fetchProducts();
  }, [user.isLogged]);

  const fetchProducts = async () => {
    const userData = user.data;

    if (userData) {
      const productServices = new ProductServices(lang);
      const data = await productServices.fetchProducts(userData.cart);

      if (data) {
        setProducts(data as ProductType[]);
        setIsLoading(false);
      }
    }

    return;
  };

  const filterProducts = () => {
    const filter: CartProduct[] = [];

    products.forEach(product => {
      if (!!filter.find(el => el.data._id == product._id)) return;

      const count = products.filter(p => p._id == product._id).length;

      filter.push({
        data: product,
        count,
      });
    });

    return filter;
  };

  const filtered = filterProducts();

  const totalPrice = filtered
    .map(el => el.count * el.data.price)
    .reduce((total, numero) => total + numero, 0);

  const onAddProduct = (id: string) => {
    dispatch(addProductInCartUserAction(id));
    dispatch(addProductInCartUserThunk(id));
  };

  const onRemoveProduct = (id: string) => {
    dispatch(removeProductFromCartUserAction(id));
    dispatch(removeProductFromCartUserThunk(id));
  };

  return (
    <CartStyled>
      <div className="header">
        <i className="ri-arrow-left-s-line" onClick={() => router.back()} />

        <h4>{i18n.yourCart}</h4>
      </div>

      <div className="products">
        <div>
          {isLoading
            ? Array.from({ length: 10 }).map(() => (
                <PharProductCard key={Math.random()} isLoading />
              ))
            : filtered.map(({ data: { _id, title, price, thumb }, count }) => (
                <PharBadge key={_id} count={count}>
                  <PharProductCard
                    onAdd={() => onAddProduct(_id)}
                    onRemove={() => onRemoveProduct(_id)}
                    name={title}
                    action
                    price={price.toLocaleString('en', {
                      style: 'currency',
                      currency: 'USD',
                    })}
                    thumb={thumb}
                  />
                </PharBadge>
              ))}
        </div>
      </div>

      <div className="price_bar">
        {isLoading ? (
          <Skeleton width={200} height={30} />
        ) : (
          <h3>
            {filtered.length} {i18n.products}
          </h3>
        )}

        {isLoading ? (
          <Skeleton width={200} height={30} />
        ) : (
          <h3>
            Total -{' '}
            <span>
              {totalPrice.toLocaleString('en', {
                style: 'currency',
                currency: 'USD',
              })}
            </span>
          </h3>
        )}
      </div>
    </CartStyled>
  );
};

export default withAuth(Cart);
