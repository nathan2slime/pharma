import classNames from 'classnames';

import { BadgeProps } from './model';
import { BadgeStyled } from './styles';

export const PharBadge = ({ children, color, count }: BadgeProps) => {
  return (
    <BadgeStyled>
      {(count || count != 0) && (
        <div className={classNames({ [color || 'info']: true })}>{count}</div>
      )}

      {children}
    </BadgeStyled>
  );
};
