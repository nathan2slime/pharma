import {
  GetStaticPaths,
  GetStaticProps,
  GetStaticPropsContext,
  NextPage,
} from 'next';
import { useRouter } from 'next/router';
import { PharButton } from '@phar/core';
import Skeleton from 'react-loading-skeleton';

import { Navbar } from '@/components/navbar';

import { ProductStyled } from '@/styles/product.styles';
import { Category, ProductType } from '@/types/product.types';
import { ProductServices } from '@/services/product.services';

export type ProductProps = {
  data: ProductType;
  categories: Category[];
};

const Product: NextPage<ProductProps> = ({ data, categories }) => {
  const router = useRouter();

  const isLoading = router.isFallback;

  const thumbStyles = isLoading
    ? {}
    : { backgroundImage: `url(${data.thumb})` };

  return (
    <ProductStyled>
      <Navbar />

      <div className="wrapper">
        <div>
          <div>
            <div className="thumb" style={thumbStyles}>
              {isLoading && <Skeleton height="100%" width="100%" />}
            </div>

            <div className="description">
              {isLoading ? (
                <h4 className="loader">
                  <Skeleton height={40} width="100%" />
                </h4>
              ) : (
                <h4>{data.title}</h4>
              )}

              <div className="categories">
                {isLoading
                  ? Array.from({ length: 5 }).map(() => (
                      <Skeleton key={Math.random()} width={60} height={20} />
                    ))
                  : categories.map(category => (
                      <div className="category" key={category._id}>
                        {category.name}
                      </div>
                    ))}
              </div>

              {isLoading ? (
                <div className="loader">
                  <Skeleton width="100%" height={130} />
                </div>
              ) : (
                <p>{data.description}</p>
              )}
            </div>
          </div>

          <div>
            <i className="ri-bookmark-line" />

            <div className="buy_cart">
              <h3>
                {isLoading ? (
                  <Skeleton width={80} height={40} />
                ) : (
                  data.price.toLocaleString('en', {
                    currency: 'USD',
                    style: 'currency',
                  })
                )}
              </h3>
              <div>
                {isLoading ? (
                  <Skeleton width="100%" height={40} />
                ) : (
                  <PharButton block bold={600}>
                    Add to cart
                  </PharButton>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </ProductStyled>
  );
};

export default Product;

const productServices = new ProductServices('en');

export const getStaticPaths: GetStaticPaths = async () => {
  const data = await productServices.filter();

  if (data) {
    const paths = data.docs.map(({ _id }) => ({
      params: { id: _id },
    }));

    return {
      paths,
      fallback: true,
    };
  }

  return {
    paths: [],
    fallback: true,
  };
};

export const getStaticProps: GetStaticProps = async (
  ctx: GetStaticPropsContext
) => {
  const id = ctx.params?.id as string;

  try {
    if (id) {
      const product = await productServices.getById(id);

      if (product) {
        const categories = await Promise.all(
          product.categories.map(
            async category => await productServices.fetchCategory(category)
          )
        );

        return {
          props: {
            data: product,
            categories,
          },
          revalidate: 1,
        };
      }
    }

    throw new Error();
  } catch (error) {
    return {
      props: {},
      notFound: true,
    };
  }
};
