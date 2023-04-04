import classNames from 'classnames';
import { AnimatePresence, motion } from 'framer-motion';
import { MouseEvent } from 'react';

import { animationModal } from '../../animations';

import { ModalProps } from './model';

import { ModalSyled } from './styles';

export const PharModal = (props: ModalProps) => {
  const { open, children, fixed, onClose, className } = props;

  const toggle = (e: MouseEvent<HTMLDivElement, globalThis.MouseEvent>) =>
    !fixed && e.target === e.currentTarget && onClose && onClose();

  return (
    <AnimatePresence mode="sync">
      {open && (
        <ModalSyled
          {...props}
          className={classNames({ [className || 'modal']: true })}
          onClick={toggle}
          {...animationModal.overlay}
        >
          <motion.div {...animationModal.content}>{children}</motion.div>
        </ModalSyled>
      )}
    </AnimatePresence>
  );
};
