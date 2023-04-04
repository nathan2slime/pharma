import { useState } from 'react';
import { PharButton, PharSearch, PharSelect, SelectValue } from '@phar/core';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';
import { AppState } from '@/store';
import { langs } from '@phar/i18n';

export const Search = () => {
  const router = useRouter();
  const { categories: category, lang } = useSelector((state: AppState) => state);

  const i18n = langs[lang];

  const selectCategories: SelectValue[] = [
    {
      key: 'all',
      title: i18n.all,
    },
    ...category.data.map(({ _id, name }) => ({ key: _id, title: name })),
  ];

  const [openCategory, setOpenCategory] = useState<boolean>();
  const [currentFilter, setCurrentFilter] = useState<SelectValue>(
    selectCategories[0]
  );
  const [search, setSearch] = useState('');

  const isValidSearch = search.trim() != '' && search.length > 2;

  const onSearch = async () =>
    isValidSearch && router.push('/search/' + currentFilter.key + '/' + search);

  return (
    <PharSearch
      button={
        <PharButton onClick={onSearch} disabled={!isValidSearch}>
          <i className="ri-search-line" />
        </PharButton>
      }
      onChange={e => setSearch(e.toString())}
      placeholder="Search"
      value={search}
      onSearch={onSearch}
      select={
        <PharSelect
          className="select"
          open={openCategory}
          onToggle={e => setOpenCategory(e)}
          onChange={e => setCurrentFilter(e)}
          value={currentFilter}
          options={selectCategories}
          placeholder="Todos"
        />
      }
    />
  );
};
