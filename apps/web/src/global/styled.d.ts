import { Theme } from '@phar/themes';

declare module 'styled-components' {
  export interface DefaultTheme extends Theme {}
}
