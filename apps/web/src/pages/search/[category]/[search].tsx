import { GetServerSideProps } from 'next';
import { PharProductCard, SelectValue } from '@phar/core';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import { langs } from '@phar/i18n';
import { useEffect, useState } from 'react';

import { FilterBar } from '@/components/filter-bar';

import { SearchStyled } from '@/styles/search.styles';
import { ProductServices } from '@/services/product.services';
import {
  Category,
  PriceSort,
  ProductFilterResponse,
} from '@/types/product.types';
import { AppState } from '@/store';
import { FilterOrder, FilterParams } from '@/components/filter-bar/model';

const Index = ({ search, page, ...props }: IndexProps) => {
  const router = useRouter();
  const { lang, categories } = useSelector((state: AppState) => state);

  const i18n = langs[lang];

  const defaultCategory = {
    key: 'all',
    title: i18n.all,
  };
  const orders: FilterOrder[] = [
    {
      key: PriceSort.NAME,
      title: i18n.name,
    },
    {
      key: PriceSort.PRICE_ASC,
      title: i18n.lowestPrice,
    },
    {
      key: PriceSort.PRICE_DESC,
      title: i18n.biggestPrice,
    },
  ];

  const [products, setProducts] = useState(props.products);
  const [isLoading, setIsLoading] = useState(false);
  const [category, setCategory] = useState<SelectValue>({
    key: props.category._id,
    title: props.category.name,
  });
  const [order, setOrder] = useState<FilterOrder>(orders[0]);

  const selectCategories: SelectValue[] = [
    defaultCategory,
    ...categories.data.map(({ _id, name }) => ({ key: _id, title: name })),
  ];

  const onFilterProducts = async (e: FilterParams) => {
    setCategory(e.category);
    setOrder(e.order);
    setIsLoading(true);

    const productServices = new ProductServices(lang);

    const res = await productServices.filter({
      limit: 20,
      page: 1,
      sort: e.order.key,
      search,
      filters: {
        category: e.category?.key != 'all' ? e.category.key : undefined,
      },
    });

    if (res) {
      setProducts(res);
    }

    setIsLoading(false);
  };

  console.log('rendizrio');

  useEffect(() => {
    const newCategory = props.category;

    if (category.key != newCategory._id) {
      setCategory({
        key: newCategory._id,
        title: newCategory.name,
      });
    }
  }, [props.category]);

  useEffect(() => {
    if (props.products != products) {
      setProducts(props.products);
    }
  }, [props.products]);

  return (
    <SearchStyled>
      <div className="products">
        <FilterBar
          lang={lang}
          isLoading={!products}
          order={order}
          orders={orders}
          search={search}
          category={category}
          categories={selectCategories}
          onChange={onFilterProducts}
          results={products.docs.length || 0}
        />

        <div>
          {!isLoading && products
            ? products.docs.map(({ _id, title, price, thumb }) => (
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
              ))
            : Array.from({ length: 10 }).map(() => (
                <PharProductCard isLoading />
              ))}
        </div>
      </div>
    </SearchStyled>
  );
};

export default Index;

export type IndexProps = {
  products: ProductFilterResponse;
  search: string;
  category: Category;
  page: string;
};

export type SearchParams = { category: string; search: string };

export const getServerSideProps: GetServerSideProps = async ctx => {
  const { search, category: categoryId } = ctx.params as SearchParams;

  const productServices = new ProductServices('en');

  let category = {
    _id: 'all',
    name: 'All',
  };

  const products = await productServices.filter({
    page: 1,
    limit: 20,
    search,
  });

  if (categoryId != 'all') {
    category = await productServices.fetchCategory(categoryId);
  }

  return {
    props: {
      products,
      category,
      search,
    },
  };
};
