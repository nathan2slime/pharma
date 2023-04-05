import styled from 'styled-components';

export const AvatarStyled = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  gap: 10px;

  div:first-child {
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
    text-transform: lowercase;
    white-space: nowrap;
    margin-bottom: 5px;
    overflow: hidden;
    text-overflow: ellipsis;

    &:last-child {
      width: 100px;
    }
  }

  button {
    margin-left: 15px;
    padding: 0px;
    width: 40px;
    height: 40px;

    display: grid;
    place-items: center;

    i {
      font-size: 1.2rem;
      color: ${({ theme }) => theme.lightColorUp};
    }
  }

  &.isLoading {
    span {
      width: fit-content;
    }
  }
`;
