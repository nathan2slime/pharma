export type Product = {
  _id: string;
  title: string;
  description: string;
  thumb: string;
  gallery: any[];
  categories: any[];
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

export type ProductFilterResponse = Pagination<Product>;
