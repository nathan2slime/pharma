import { generateMedia } from 'styled-media-query';

import { breakpoints } from '../core';
import { Theme } from '../types';

type ThemeTuple = [string, unknown];

export const parseCssTheme = (theme: Theme) =>
  Object.entries(theme)
    .map((entry: ThemeTuple) => {
      const [key, value] = entry;
      const cssVariable = `--${key.replace(
        /[A-Z]/g,
        m => `-${m.toLowerCase()}`
      )}`;

      return `${cssVariable}:${value};`;
    })
    .join('');

export const media = generateMedia(breakpoints);
