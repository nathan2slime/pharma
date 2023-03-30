import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
  * {
    padding: 0px;
    margin: 0px;
    box-sizing: border-box;
    user-select: none;
    letter-spacing: 0.03rem;
    user-zoom: none;
    -webkit-user-drag: none;
    -khtml-user-drag: none;
    -moz-user-drag: none;
    -o-user-drag: none;
    -webkit-tap-highlight-color: transparent;
    outline: none;
    font-size: 100%;
  }
`;
