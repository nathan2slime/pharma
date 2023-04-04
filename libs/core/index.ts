import { SkeletonTheme } from 'react-loading-skeleton';
import { ThemeProvider } from 'styled-components';

import 'react-loading-skeleton/dist/skeleton.css';

export * from './src/components/button';
export * from './src/components/button/model';
export * from './src/components/input';
export * from './src/components/input/model';
export * from './src/components/alert';
export * from './src/components/alert/model';
export * from './src/components/avatar';
export * from './src/components/avatar/model';
export * from './src/components/product-card';
export * from './src/components/product-card/model';
export * from './src/components/badge';
export * from './src/components/badge/model';
export * from './src/components/search';
export * from './src/components/search/model';
export * from './src/components/select';
export * from './src/components/select/model';

export * from './src/types';

export const PharThemeProvider = ThemeProvider;
export const PharSkeletonTheme = SkeletonTheme;
