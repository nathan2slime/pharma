export type ProductsFilter = {
  category?: string;
  minPrice?: number;
  maxPrice?: number;
};

export type ProductsPaginate = {
  page?: number;
  limit?: number;
  search?: string;
  filters?: ProductsFilter;
};
