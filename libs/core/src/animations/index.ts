import { AnimationProps } from 'framer-motion';

export const animationModal = {
  content: {
    initial: { scale: 0.7, opacity: 0 },
    animate: {
      scale: 1,
      opacity: 1,
      transition: { type: 'spring', duration: 0.3 },
    },
    exit: {
      scale: 0.7,
      opacity: 0,
      transition: { type: 'spring', duration: 0.15 },
    },
  } as AnimationProps,
  overlay: {
    initial: { opacity: 0 },
    animate: { opacity: 1, transition: { duration: 0.3 } },
    exit: { opacity: 0, transition: { duration: 0.15 } },
  } as AnimationProps,
};
