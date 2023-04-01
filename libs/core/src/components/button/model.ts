import { ReactNode } from 'react';

import { ButtonType } from '../../types';

export type ButtonProps = {
  children?: ReactNode;
  className?: string;
  block?: boolean;
  bold?: number;
  type?: ButtonType;
};
