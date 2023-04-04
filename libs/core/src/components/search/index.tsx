import classNames from 'classnames';
import { useState } from 'react';

import { PharButton } from '../button';
import { PharInput } from '../input';
import { PharSelect } from '../select';
import { SearchProps } from './model';
import { SearchStyled } from './styles';

export const PharSearch = ({
  select,
  onChange,
  value,
  placeholder,
  className,
  onSearch,
  button,
}: SearchProps) => {
  const [focused, setFocused] = useState(false);

  return (
    <SearchStyled
      className={classNames({ focused, [className || 'search']: true })}
    >
      {select}

      <PharInput
        block
        onBlur={() => setFocused(false)}
        onFocus={() => setFocused(true)}
        value={value}
        onKeyDown={e => e.key == 'Enter' && onSearch && onSearch()}
        placeholder={placeholder}
        onChange={onChange}
      />

      {button}
    </SearchStyled>
  );
};
