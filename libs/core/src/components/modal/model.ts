import { MotionProps } from 'framer-motion';
import { ReactNode } from 'react';

export type ModalProps = {
  open?: boolean;
  children?: ReactNode;
  width?: number;
  fixed?: boolean;
  height?: number;
  className?: string;
  onClose?: () => void;
} & MotionProps;
