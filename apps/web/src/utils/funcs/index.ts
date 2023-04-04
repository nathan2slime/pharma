import { PharColor } from '@phar/core';

export const withWindow = (callback: () => void) =>
  typeof window != 'undefined' && callback();

export const getLocalStorageItem = (item: string) =>
  withWindow(() => localStorage.getItem(item)) || '';

export const setLocalStorageItem = (item: string, value: string) =>
  withWindow(() => localStorage.setItem(item, value));

export const dispatchCustomEvent = <T>(
  name: string,
  detail: T,
  target: Document | Window = document
) => target.dispatchEvent(new CustomEvent(name, { detail }));

export const showAlert = (message: string, color: PharColor) =>
  withWindow(() =>
    dispatchCustomEvent('pharAlert', {
      message,
      color,
      open: true,
    })
  );
