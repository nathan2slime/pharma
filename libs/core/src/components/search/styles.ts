import styled from 'styled-components';

export const SearchStyled = styled.div`
  width: 100%;
  position: relative;

  input {
    width: 100%;
    padding-right: 48px;
    padding-left: 148px;
  }

  > .select {
    width: 140px;
    position: absolute;
    top: 0px;
    left: 0px;

    > div:first-child {
      border-top-right-radius: 0px;
      border-bottom-right-radius: 0px;
      border-color: ${({ theme }) => theme.borderColorDown};
    }

    &.open {
      > div:first-child {
        border-color: ${({ theme }) => theme.borderColorDown};
      }
    }
  }

  &.focused {
    .select > div:first-child {
      border-color: ${({ theme }) => theme.primaryColorUp};
    }
  }

  button {
    position: absolute;

    top: 0px;
    right: 0px;
    padding: 0px;
    width: 40px;
    border-top-left-radius: 0px;
    border-bottom-left-radius: 0px;

    i {
      font-size: 1.2rem;
    }
  }
`;
