export type ProductType = {
  _id: string;
  title: string;
  description: string;
  thumb: string;
  gallery: string[];
  categories: string[];
  price: number;
  created_at: string;
  updated_at: string;
};

export type Pagination<T> = {
  docs: T[];
  totalDocs: number;
  limit: number;
  totalPages: number;
  page: number;
  pagingCounter: number;
  hasPrevPage: boolean;
  hasNextPage: boolean;
  prevPage: number | null;
  nextPage: number | null;
};

export type Category = {
  color: string;
  created_at: string;
  name: string;
  updated_at: string;
  _id: string;
};

export type CategoryProductResponse = Category[];

export type ProductFilterResponse = Pagination<ProductType>;

export type ProductsFilter = {
  category?: string;
  minPrice?: number;
  maxPrice?: number;
};

export type CategoryState = {
  data: Category[];
};

export type ProductsFilterParams = {
  limit: number;
  page: number;
  search?: string;
  filters?: ProductsFilter;
  sort?: PriceSort;
};

export enum PriceSort {
  PRICE_DESC = 'PRICE_DESC',
  PRICE_ASC = 'PRICE_ASC',
  NAME = 'NAME',
}
