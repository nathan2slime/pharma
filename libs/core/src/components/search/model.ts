import { ReactNode } from 'react';

export type SearchProps = {
  value: string;
  onChange: (value: string | number) => void;
  onSearch: () => void;
  placeholder?: string;
  select?: ReactNode;
  button?: ReactNode;
  className?: string;
};
