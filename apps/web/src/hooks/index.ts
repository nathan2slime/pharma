import { useEffect } from 'react';

export const useEventListener = (
  eventName: string,
  handler: (event: Event) => void,
  el = typeof window !== 'undefined' ? document : undefined
): void => {
  useEffect(() => {
    if (!el) return;

    el.addEventListener(eventName, handler);

    return () => {
      el.removeEventListener(eventName, handler);
    };
  }, [eventName, handler, el]);
};
