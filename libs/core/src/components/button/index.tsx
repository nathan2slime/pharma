import classNames from 'classnames';

import { ButtonProps } from './model';
import { ButtonStyled } from './styles';

export const PharButton = ({
  className,
  children,
  disabled,
  block,
  ...props
}: ButtonProps) => (
  <ButtonStyled
    {...props}
    aria-disabled={disabled}
    className={classNames({
      [className || 'button']: !!className,
      block,
      disabled,
    })}
  >
    {children}
  </ButtonStyled>
);
