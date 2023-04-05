import classNames from 'classnames';
import Skeleton from 'react-loading-skeleton';

import { ProductCardProps } from './model';
import { CardProductStyled } from './styles';
import { PharButton } from '../button';

export const PharProductCard = ({
  name,
  price,
  thumb,
  onAdd,
  onRemove,
  onClick,
  isLoading,
  action,
}: ProductCardProps) => {
  const styles = isLoading ? {} : { backgroundImage: `url(${thumb})` };

  return (
    <CardProductStyled
      onClick={() => onClick && onClick()}
      className={classNames({ isLoading })}
    >
      <div style={styles}>
        {isLoading && <Skeleton width="100%" height="100%" />}
      </div>

      {action && (
        <div className="action">
          <PharButton onClick={() => onAdd && onAdd()}>
            <i className="ri-add-fill" />
          </PharButton>
          <PharButton onClick={() => onRemove && onRemove()}>
            <i className="ri-subtract-line" />
          </PharButton>
        </div>
      )}
      
      <div>
        {isLoading ? <Skeleton width="190px" height="20px" /> : <h3>{name}</h3>}

        {isLoading ? <Skeleton width="80px" height="20px" /> : <p>{price}</p>}
      </div>
    </CardProductStyled>
  );
};
