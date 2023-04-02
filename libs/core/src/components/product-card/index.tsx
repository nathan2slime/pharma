import Skeleton from 'react-loading-skeleton';
import { ProductCardProps } from './model';
import { CardProductStyled } from './styles';

export const PharProductCard = ({
  name,
  price,
  thumb,
  isLoading,
}: ProductCardProps) => {
  const styles = { backgroundImage: `url(${thumb})` };

  return (
    <CardProductStyled>
      <div style={styles}>
        {isLoading && <Skeleton width="100%" height="100%" />}
      </div>
      <div>
        {isLoading ? <Skeleton width="190px" height="20px" /> : <h3>{name}</h3>}

        {isLoading ? (
          <Skeleton width="80px" height="20px" />
        ) : (
          <p>
            {price?.toLocaleString('pt', {
              style: 'currency',
              currency: 'BRL',
            })}
          </p>
        )}
      </div>
    </CardProductStyled>
  );
};
