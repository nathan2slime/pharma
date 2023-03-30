export type Theme = {};

export type MultiTheme = {
  [name: string]: Theme;
};

export type Themes = 'dark' | 'light';

export type Breakpoints = {
  [name: string]: string;
};
