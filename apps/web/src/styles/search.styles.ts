import styled from 'styled-components';

export const SearchStyled = styled.div`
  width: 100vw;
  height: 100vh;
  height: 100dvh;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  overflow-y: auto;
  overflow-x: hidden;
  background: ${({theme}) => theme.backgroundColorUp};

  .products {
    width: 100%;
    height: 100%;
    padding: 120px 40px 40px;

    display: flex;
    gap: 40px;

    > div:first-child {
      width: 100%;
      flex-shrink: 0;
      max-width: 300px;

      height: fit-content;
    }

    > div:last-child {
      width: 100%;

      display: flex;
      justify-content: flex-start;
      height: fit-content;
      align-items: flex-start;
      gap: 30px;

      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
      place-items: flex-start;
    }
  }
`;
