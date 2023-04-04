import { useEffect } from 'react';
import classNames from 'classnames';

import { AlertProps } from './model';
import { AlertStyled } from './styles';

export const PharAlert = ({
  children,
  open,
  color,
  className,
  onClose,
  ...props
}: AlertProps) => {
  let timer: NodeJS.Timeout;

  useEffect(() => {
    timer && clearTimeout(timer);

    timer = setTimeout(() => onClose && onClose(), 1500);
  }, [open]);

  return (
    <AlertStyled
      {...props}
      className={classNames({
        open,
        [className || 'alert']: !!className,
        [color || 'info']: true,
      })}
    >
      {children}
    </AlertStyled>
  );
};
