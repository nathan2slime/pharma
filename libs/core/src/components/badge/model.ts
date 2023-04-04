import { ReactNode } from 'react';

import { PharColor } from '../../types';

export type BadgeProps = {
  count?: number;
  children: ReactNode;
  color?: PharColor;
};
