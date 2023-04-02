import styled from 'styled-components';

export const AvatarStyled = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  gap: 10px;

  div {
    width: 40px;
    height: 40px;
    background-size: cover;
    background-color: ${({ theme }) => theme.primaryColorDown};
    background-repeat: no-repeat;
    border-radius: 30px;
  }

  span {
    font-family: ${({ theme }) => theme.primaryFontFamily};
    font-size: 0.875rem;
    color: ${({ theme }) => theme.textColorDown};
  }
`;
