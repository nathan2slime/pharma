export type Theme = {
  primaryColorUp?: string;
  primaryFontFamily?: string;
  lightColorUp?: string;
  lightColorDown?: string;
  outlineColorUp?: string;
  outlineColorDown?: string;
  textColorUp?: string;
  borderColorUp?: string;
  borderColorDown?: string;
  inputBackgroundColorUp?: string;
  inputBackgroundColorDown?: string;
  textColorDown?: string;
  warningColorUp?: string;
  warningColorDown?: string;
  dangerColorUp?: string;
  foregroundColorDown?: string;
  foregroundColorUp?: string;
  darkColorUp?: string;
  darkColorDown?: string;
  secondaryFontFamily?: string;
  secondaryColorUp?: string;
  secondaryColorDown?: string;
  primaryColorDown?: string;
  dangerColorDown?: string;
  backgroundColorDown?: string;
  backgroundColorUp?: string;
  successColorUp?: string;
  successColorDown?: string;
};

export type MultiTheme = {
  [name: string]: Theme;
};

export type Themes = 'dark' | 'light';

export type Breakpoints = {
  [name: string]: string;
};
