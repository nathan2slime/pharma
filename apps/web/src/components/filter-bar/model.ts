import { AppI18nLang } from '@phar/i18n';

import { PriceSort } from '@/types/product.types';
import { SelectValue } from '@phar/core';

export type FilterParams = {
  order: FilterOrder;
  category: SelectValue;
};

export type FilterOrder = {
  key: PriceSort;
  title: string;
}

export type FilterBarProps = {
  className?: string;
  onChange?: (value: FilterParams) => void;
  results?: number;
  lang: AppI18nLang;
  search: string;
  order: FilterOrder;
  orders: FilterOrder[];
  isLoading?: boolean;
  categories: SelectValue[];
  category: SelectValue;
};
