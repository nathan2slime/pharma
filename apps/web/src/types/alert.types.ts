import { PharColor } from '@phar/core';

export type AlertState = {
  open: boolean;
  message: string;
  color: PharColor;
};
