import { GetStaticProps } from 'next';
import { PharProductCard } from '@phar/core';
import { useRouter } from 'next/router';

import { IndexStyled } from '@/styles/index.styles';
import { ProductServices } from '@/services/product.services';
import { ProductFilterResponse } from '@/types/product.types';

const Index = ({ products }: IndexProps) => {
  const router = useRouter();

  return (
    <IndexStyled>
      <div className="products">
        <div>
          {products &&
            products.docs.map(({ _id, title, price, thumb }) => (
              <PharProductCard
                key={_id}
                name={title}
                onClick={() => router.push('/product/' + _id)}
                price={price.toLocaleString('en', {
                  style: 'currency',
                  currency: 'USD',
                })}
                thumb={thumb}
              />
            ))}
        </div>
      </div>
    </IndexStyled>
  );
};

export default Index;

export type IndexProps = {
  products: ProductFilterResponse;
};

export const getStaticProps: GetStaticProps = async () => {
  const productServices = new ProductServices('en');
  const res = await productServices.filter();

  return {
    props: {
      products: res,
    },
  };
};
