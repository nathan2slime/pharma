export type Theme = {
  primaryColorUp?: string;
  primaryFontFamily?: string;
  lightColorUp?: string;
  lightColorDown?: string;
  outlineColorUp?: string;
  outlineColorDown?: string;
  textColorUp?: string;
  textColorDown?: string;
};

export type MultiTheme = {
  [name: string]: Theme;
};

export type Themes = 'dark' | 'light';

export type Breakpoints = {
  [name: string]: string;
};
