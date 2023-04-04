import {
  GetStaticPaths,
  GetStaticProps,
  GetStaticPropsContext,
  NextPage,
} from 'next';
import { useRouter } from 'next/router';
import { PharButton } from '@phar/core';

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

  const thumbStyles = { backgroundImage: `url(${data.thumb})` };

  return (
    <ProductStyled>
      <Navbar />

      <div className="wrapper">
        <div>
          <div>
            <div className="thumb" style={thumbStyles} />

            <div className="description">
              <h4>{data.title}</h4>

              <div className="categories">
                {categories.map(category => (
                  <div key={category._id}>{category.name}</div>
                ))}
              </div>

              <p>{data.description}</p>
            </div>
          </div>

          <div>
            <i className="ri-bookmark-line" />

            <div className="buy_cart">
              <h3>
                {data.price.toLocaleString('en', {
                  currency: 'USD',
                  style: 'currency',
                })}
              </h3>
              <div>
                <PharButton block bold={600}>
                  Add to cart
                </PharButton>
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
