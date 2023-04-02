import { ReactNode } from 'react';

import { PharColor } from '../../types';

export type AlertProps = {
  onClose: () => void;
  color: PharColor;
  children: ReactNode;
  open: boolean;
  className?: string;
};
