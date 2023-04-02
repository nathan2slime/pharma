import styled from 'styled-components';

export const IndexStyled = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  padding-top: 100px;

  > div:last-child {
    width: 100%;
    display: flex;
    justify-content: flex-start;
    align-items: flex-start;
    gap: 20px;
    padding: 20px 40px;

    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    place-items: center;
  }
`;
