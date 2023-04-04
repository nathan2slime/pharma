export type ProductsFilter = {
  category?: string;
  minPrice?: number;
  maxPrice?: number;
};

export type ProductsPaginate = {
  page?: number;
  limit?: number;
  search?: string;
  sort?: ProductSort;
  filters?: ProductsFilter;
};

export enum ProductSort {
  PRICE_DESC = 'PRICE_DESC',
  PRICE_ASC = 'PRICE_ASC',
  NAME = 'NAME',
}
