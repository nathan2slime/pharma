import Skeleton from 'react-loading-skeleton';

import { AvatarProps } from './model';
import { AvatarStyled } from './styles';

import 'react-loading-skeleton/dist/skeleton.css';

export const PharAvatar = ({ username, avatar, isLoading }: AvatarProps) => {
  const styles = {
    backgroundImage: `url(${avatar})`,
  };

  return (
    <AvatarStyled>
      {isLoading ? (
        <Skeleton circle width="40px" height="40px" />
      ) : (
        <div style={styles} />
      )}

      {isLoading ? (
        <Skeleton width="140px" height="25px" />
      ) : (
        <span>{username}</span>
      )}
    </AvatarStyled>
  );
};
