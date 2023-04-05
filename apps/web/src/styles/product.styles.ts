import { media } from '@phar/themes';
import { parseToRgb, rgba } from 'polished';
import styled from 'styled-components';

export const ProductStyled = styled.div`
  width: 100vw;
  height: 100vh;
  height: 100dvh;

  flex-direction: column;
  justify-content: center;
  overflow-y: auto;
  overflow-x: hidden;
  padding: 100px 40px 40px;
  background: ${({ theme }) => {
    const color = parseToRgb(theme.foregroundColorUp as string);

    return rgba(color.red, color.green, color.blue, 0.98);
  }};

  header.hidden {
    display: flex;
  }

  .loader {
    width: 100%;
  }

  > div,
  & {
    align-items: center;
    display: flex;
  }

  > div {
    width: 100%;
    gap: 25px;
    max-width: 900px;
    justify-content: space-between;
    align-items: flex-end;
    backdrop-filter: blur(10px);
    overflow: hidden;
    border-radius: 10px;
    background: ${({ theme }) => {
      const color = parseToRgb(theme.backgroundColorUp as string);

      return rgba(color.red, color.green, color.blue, 0.98);
    }};

    > div:first-child,
    > div:last-child {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      gap: 20px;
      padding: 20px;
    }

    > div:last-child {
      width: 100%;
      max-width: 260px;
      height: 100%;

      justify-content: space-between;
      align-items: flex-end;
      background: ${({ theme }) => theme.foregroundColorUp};
      border: 2px solid ${({ theme }) => theme.borderColorUp};
      border-left: 0px;
      border-radius: 0px 10px 10px 0px;

      i {
        font-size: 1.7rem;
        cursor: pointer;
        color: ${({ theme }) => theme.primaryColorUp};
      }
    }

    .thumb {
      width: 200px;
      height: 300px;
      flex-shrink: 0;
      border-radius: 8px;
      overflow: hidden;
      background-size: cover;
      background-repeat: no-repeat;
    }

    h4 {
      font-size: 1.8rem;
      font-family: ${({ theme }) => theme.secondaryFontFamily};
      color: ${({ theme }) => theme.primaryColorDown};
      margin-bottom: 10px;
    }

    .categories {
      display: flex;
      flex-wrap: wrap;
      gap: 5px;
      margin-bottom: 20px;

      .category {
        width: fit-content;
        padding: 5px 10px;
        border-radius: 8px;
        border: 1px solid ${({ theme }) => theme.primaryColorDown};
        color: ${({ theme }) => theme.primaryColorUp};
        font-family: ${({ theme }) => theme.primaryFontFamily};
        font-size: 0.875rem;
      }
    }

    .description {
      width: 100%;
      max-width: 600px;

      p {
        width: 100%;
        display: block;
        font-family: ${({ theme }) => theme.primaryFontFamily};
        font-size: 0.875rem;
        color: ${({ theme }) => theme.textColorDown};
      }
    }

    .buy_cart {
      width: 100%;
      height: 100%;
      border-radius: 10px;
      padding: 20px;

      display: flex;
      justify-content: space-between;
      flex-direction: column;

      button {
        text-transform: uppercase;
        margin-top: 14px;
      }

      h3 {
        font-size: 1.8rem;
        font-family: ${({ theme }) => theme.secondaryFontFamily};
        color: ${({ theme }) => theme.primaryColorDown};
        margin-bottom: 10px;
        text-align: end;
        word-wrap: break-word;
      }
    }
  }

  ${media.lessThan('md')`
    padding: 0px;

    > div {
      padding: 100px 40px 40px;
      max-width: 100%;
      height: 100%;
      overflow-y: auto;

      flex-direction: column;

      & > div:last-child {
        max-width: 100%;
        border-radius: 10px;
        border-left: 1px solid ${({ theme }) => theme.borderColorUp};
      }
    }
  `}

  ${media.lessThan('sm')`
    padding: 0px;

    > div {
      padding: 100px 20px 20px;

      .buy_cart {
        height: 160px;
        padding: 15px;
      }
    }
  `}
`;
