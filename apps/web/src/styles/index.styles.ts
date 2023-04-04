import { media } from '@phar/themes';
import styled from 'styled-components';

export const IndexStyled = styled.div`
  width: 100vw;
  height: 100vh;
  height: 100dvh;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  overflow-y: auto;
  overflow-x: hidden;
  background: ${({ theme }) => theme.backgroundColorUp};

  .products {
    width: 100%;
    height: 100%;
    padding: 100px 40px 20px;

    > div {
      width: 100%;

      display: flex;
      justify-content: flex-start;
      height: fit-content;
      align-items: flex-start;
      gap: 30px;
      padding: 20px 0px;

      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
      place-items: flex-start;

      ${media.lessThan('sm')`
        place-items: center;
      `}
    }
  }
`;
