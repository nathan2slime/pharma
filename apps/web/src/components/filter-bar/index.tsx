import { PharSelect } from '@phar/core';
import { langs } from '@phar/i18n';
import classNames from 'classnames';
import { useState } from 'react';
import { useRouter } from 'next/router';
import Skeleton from 'react-loading-skeleton';

import { FilterBarProps, FilterOrder } from './model';
import { FilterBarStyled } from './styles';

export const FilterBar = ({
  lang,
  results,
  className,
  search,
  order,
  orders,
  onChange,
  categories,
  category,
  isLoading,
}: FilterBarProps) => {
  const i18n = langs[lang];
  const router = useRouter();

  const [openOrderBy, setOpenOrderBy] = useState(false);
  const [openCategory, setOpenCategory] = useState(false);

  return (
    <FilterBarStyled
      className={classNames({ [className || 'filter_bar']: !!className })}
    >
      <div>
        {isLoading ? (
          <div className="loader">
            <Skeleton height={27} />
          </div>
        ) : (
          <div className="header_filter_bar">
            <i className="ri-arrow-left-s-line" onClick={() => router.back()} />
            <h3>
              {i18n.resultsFor} <span>"{search}"</span>
            </h3>
          </div>
        )}
        {isLoading ? (
          <div className="loader">
            <Skeleton height={20} width="100%" />
          </div>
        ) : (
          <p>
            {results} {i18n.productsFound}
          </p>
        )}
      </div>

      {isLoading ? (
        <div className="loader">
          <Skeleton height={65} />
        </div>
      ) : (
        <PharSelect
          value={order}
          options={orders}
          open={openOrderBy}
          className="select"
          label={i18n.orderBy}
          onChange={e => {
            onChange &&
              onChange({
                order: e as FilterOrder,
                category,
              });
          }}
          onToggle={e => setOpenOrderBy(e)}
        />
      )}

      {isLoading ? (
        <div className="loader">
          <Skeleton height={65} />
        </div>
      ) : (
        <PharSelect
          value={category}
          options={categories}
          open={openCategory}
          className="select"
          label={i18n.category}
          onChange={e => onChange && onChange({ category: e, order })}
          onToggle={e => setOpenCategory(e)}
        />
      )}
    </FilterBarStyled>
  );
};
