import classNames from 'classnames';

import { ButtonProps } from './model';
import { ButtonStyled } from './styles';

export const PharButton = ({ className, children, block ,...props }: ButtonProps) => (
  <ButtonStyled
    {...props}
    className={classNames({ [className || 'button']: !!className, block })}
  >
    {children}
  </ButtonStyled>
);
