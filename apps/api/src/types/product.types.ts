export type ProductsFilter = {
  category?: string;
  minPrice?: number;
  maxPrice?: number;
};

export type ProductsPaginate = {
  page?: number;
  limit?: number;
  search?: string;
  priceSort?: PriceSort;
  filters?: ProductsFilter;
};

export enum PriceSort {
  PRICE_DESC = 'PRICE_DESC',
  PRICE_ASC = 'PRICE_ASC',
}
