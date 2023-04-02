import { media } from '@phar/themes';
import styled from 'styled-components';

export const AuthStyled = styled.div`
  width: 100vw;
  height: 100vh;
  height: 100dvh;

  overflow-y: auto;
  overflow-x: hidden;

  background: ${({ theme }) => theme.backgroundColorDown};

  &,
  > div,
  > div > div,
  a {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  > div {
    width: 100%;
    flex-direction: column;
    max-width: 450px;
    min-height: 500px;
    background: ${({ theme }) => theme.backgroundColorUp};
    gap: 50px;
    border-radius: 20px;
    padding: 40px;

    img {
      width: 70px;
      height: 70px;
      cursor: pointer;
    }

    > div {
      width: 100%;
      flex-direction: column;
      gap: 14px;

      &:first-child {
        gap: 16px;
        margin-bottom: 26px;
        flex-direction: row;

        > div {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
        }

        h3 {
          font-family: ${({ theme }) => theme.secondaryFontFamily};
          color: ${({ theme }) => theme.primaryColorUp};

          font-size: 1.2rem;
          margin-bottom: 6px;
        }

        p {
          font-family: ${({ theme }) => theme.primaryFontFamily};
          font-size: 0.875rem;
          color: ${({ theme }) => theme.textColorDown};
        }
      }
    }

    > a {
      font-family: ${({ theme }) => theme.primaryFontFamily};
      font-size: 0.875rem;
      display: flex;
      justify-content: center;
      align-items: center;
      gap: 2px;
      text-decoration: none;
      padding: 3px 0px;
      border-bottom: 1px solid transparent;
      color: ${({ theme }) => theme.textColorDown};

      &,
      i {
        transition: all 0.3s;
      }

      i {
        font-size: 1rem;
      }

      &:hover {
        &,
        i {
          color: ${({ theme }) => theme.primaryColorUp};
        }

        border-color: ${({ theme }) => theme.primaryColorUp};
      }
    }

    ${media.lessThan('sm')`
      max-width: 100%;
      height: 100%;
      padding: 20px;
      border-radius: 0px;
    `}
  }
`;
