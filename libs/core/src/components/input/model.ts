import { InputType, PharVariant } from '../../types';

export type InputProps = {
  value?: string | number;
  onChange?: (value: string | number) => void;
  label?: string;
  className?: string;
  type?: InputType;
  variant?: PharVariant;
  block?: boolean;
  error?: boolean;
  placeholder?: string;
  helper?: string;
};
