import { media } from '@phar/themes';
import styled from 'styled-components';

export const SearchStyled = styled.div`
  width: 100vw;
  height: 100vh;
  height: 100dvh;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: ${({ theme }) => theme.backgroundColorUp};

  .products {
    width: 100%;
    height: 100%;
    padding: 120px 40px 40px;

    display: flex;
    gap: 40px;
    overflow-y: auto;
    overflow-x: hidden;

    > div:first-child {
      width: 100%;
      flex-shrink: 0;
      max-width: 300px;

      height: fit-content;
      position: sticky;
      top: -1px;
    }

    > div:last-child:not(.no_products_found) {
      width: 100%;

      display: flex;
      justify-content: flex-start;
      height: fit-content;
      align-items: flex-start;
      padding-bottom: 40px;
      gap: 30px;

      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
      place-items: flex-start;
    }

    .no_products_found {
      width: 100%;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      gap: 40px;

      img {
        width: 100%;
        height: fit-content;
        max-width: 150px;
      }

      h4 {
        font-size: 1rem;
        font-family: ${({ theme }) => theme.secondaryFontFamily};
        color: ${({ theme }) => theme.primaryColorDown};
        margin-bottom: 10px;
        text-align: end;
        word-wrap: break-word;
      }
    }

    ${media.lessThan('md')`
      > div:last-child:not(.no_products_found) {
        place-items: center;
      }
    `}

    ${media.lessThan('sm')`
      flex-direction: column;
      padding: 120px 20px 20px;

      > div:first-child {
        max-width: 100%;
        position: unset;

        div {
          width: 100%;
          max-width: 100%;
        }
      }

      > div:last-child:not(.no_products_found) {
        place-items: center;
      }

      .no_products_found img {
        max-width: 95px;
      }
    `}
  }
`;
