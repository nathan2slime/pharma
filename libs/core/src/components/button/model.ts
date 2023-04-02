import { ReactNode } from 'react';

import { ButtonType, PharVariant } from '../../types';

export type ButtonProps = {
  children?: ReactNode;
  className?: string;
  block?: boolean;
  disabled?: boolean;
  bold?: number;
  variant?: PharVariant;
  type?: ButtonType;
  onClick?: () => void;
};
