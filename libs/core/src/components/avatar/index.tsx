import Skeleton from 'react-loading-skeleton';
import classNames from 'classnames';

import { AvatarProps } from './model';
import { AvatarStyled } from './styles';
import { PharButton } from '../button';

export const PharAvatar = ({ username, avatar,onLogout, isLoading }: AvatarProps) => {
  const styles = avatar
    ? {
        backgroundImage: `url(${avatar})`,
      }
    : {};

  return (
    <AvatarStyled className={classNames({ isLoading })}>
      {isLoading ? (
        <Skeleton circle width="40px" height="40px" />
      ) : (
        <div style={styles} />
      )}

      {isLoading ? (
        <Skeleton width="140px" height="25px" />
      ) : (
        <div>
          <span>{username}</span>

          <PharButton onClick={onLogout}>
            <i className="ri-logout-circle-fill" />
          </PharButton>
        </div>
      )}
    </AvatarStyled>
  );
};
