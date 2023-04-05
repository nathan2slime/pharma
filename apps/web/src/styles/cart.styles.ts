import { media } from '@phar/themes';
import { parseToRgb, rgba } from 'polished';
import styled from 'styled-components';

export const CartStyled = styled.div`
  width: 100vw;
  height: 100vh;
  height: 100dvh;

  overflow-y: auto;
  overflow-x: hidden;
  background: ${({ theme }) => theme.backgroundColorUp};
  padding: 110px 40px 20px;
  position: relative;

  .header,
  & {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
  }

  .header {
    flex-direction: row;
    align-items: center;
    gap: 15px;

    h4 {
      font-size: 1.2rem;
      font-family: ${({ theme }) => theme.secondaryFontFamily};
      color: ${({ theme }) => theme.primaryColorDown};
      text-align: end;
      word-wrap: break-word;
    }

    > i {
      font-size: 1.3rem;
      transition: all 0.15s;
      cursor: pointer;
      padding: 4px;
      border-radius: 5px;
      color: ${({ theme }) => theme.textColorDown};
      background: ${({ theme }) => theme.backgroundColorUp};
      border: 1px solid ${({ theme }) => theme.borderColorDown};

      &:hover {
        color: ${({ theme }) => theme.primaryColorDown};
        border-color: ${({ theme }) => theme.primaryColorDown};
      }
    }
  }

  .price_bar {
    width: 100%;
    position: fixed;
    left: 0px;
    height: 60px;
    padding: 10px 40px;
    bottom: 0px;
    display: flex;
    justify-content: space-around;
    align-items: center;
    z-index: 10;
    background: ${({ theme }) => theme.foregroundColorDown};

    h3 {
      font-size: 1rem;
      font-family: ${({ theme }) => theme.secondaryFontFamily};
      color: ${({ theme }) => theme.textColorDown};
      word-wrap: break-word;

      span {
        color: ${({ theme }) => theme.primaryColorDown};
      }
    }
  }

  .products {
    width: 100%;
    height: 100%;

    > div {
      width: 100%;

      display: flex;
      justify-content: flex-start;
      height: fit-content;
      align-items: flex-start;
      gap: 30px;
      padding: 20px 0px;
      padding-bottom: 90px;

      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
      place-items: flex-start;

      ${media.lessThan('sm')`
        place-items: center;
      `}
    }
  }

  ${media.lessThan('sm')`
    > div {
        place-items: center;
    } 
            
    padding: 120px 20px 20px;
   `}
`;
