import classNames from 'classnames';

import { InputProps } from './model';
import { InputStyled } from './styles';

export const PharInput = ({
  onChange,
  className,
  label,
  error,
  variant,
  block,
  onKeyDown,
  helper,
  ...props
}: InputProps) => (
  <InputStyled
    {...props}
    className={classNames({
      block,
      error,
      [className || 'input']: !!className,
      [variant || 'solid']: !!variant,
    })}
  >
    {label && <label>{label}</label>}
    <input
      {...props}
      onKeyDown={e => onKeyDown && onKeyDown(e)}
      onChange={e => onChange && onChange((e.target as any).value)}
    />
    {helper && <span>{helper}</span>}
  </InputStyled>
);
