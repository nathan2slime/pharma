import { GetStaticProps } from 'next';
import { PharProductCard } from '@phar/core';

import { Navbar } from '@/components/navbar';
import { IndexStyled } from '@/styles/index.styles';
import { ProductServices } from '@/services/product.services';
import { ProductFilterResponse } from '@/types/product.types';

const Index = ({ products }: IndexProps) => {
  return (
    <IndexStyled>
      <Navbar />

      <div>
        {products.docs.map(({ _id, title, price, thumb }) => (
          <PharProductCard key={_id} name={title} price={price} thumb={thumb} />
        ))}
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

  if (res) {
    return {
      props: {
        products: res,
      },
    };
  }

  return {
    props: {},
  };
};
