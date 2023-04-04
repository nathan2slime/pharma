import classNames from 'classnames';
import { useEffect, useRef } from 'react';

import { SelectProps } from './model';
import { SelectStyled } from './styles';

export const PharSelect = ({
  value,
  open,
  className,
  options = [],
  placeholder,
  label,
  disabled,
  onChange,
  onToggle,
}: SelectProps) => {
  const listen = (e: MouseEvent) => {
    if (!e.composedPath().includes(ref.current as HTMLElement)) {
      onToggle && onToggle(false);
    }
  };

  useEffect(() => {
    document.addEventListener('click', listen);

    return () => document.removeEventListener('click', listen);
  }, []);

  const ref = useRef<HTMLDivElement>(null);

  return (
    <SelectStyled
      ref={ref}
      onClick={() => onToggle && onToggle(!open)}
      className={classNames({
        open,
        disabled,
        [Math.random()]: true,
        [className || 'select']: !!className,
        label: !!label,
      })}
    >
      {label && <label>{label}</label>}

      <div className="header">
        {value ? <span>{value.title}</span> : <p>{placeholder}</p>}

        <i className="ri-arrow-down-s-line" />
      </div>

      <div>
        {options.map(el => (
          <div
            key={el.key}
            onClick={() => onChange && onChange(el)}
            className={classNames({ active: el.key == value?.key })}
          >
            {el.title}
          </div>
        ))}
      </div>
    </SelectStyled>
  );
};
