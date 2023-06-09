import styled from 'styled-components';

export const InputStyled = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  gap: 6px;

  input {
    width: 100%;
    height: 40px;
    transition: all 0.14s;
    border-radius: 8px;
    border: 1px solid ${({ theme }) => theme.borderColorUp};
    padding: 8px 10px;
    outline: none;
    background: ${({ theme }) => theme.backgroundColorUp};
    font-size: 0.875rem;
  }

  input,
  label,
  span {
    font-family: ${({ theme }) => theme.primaryFontFamily};
    color: ${({ theme }) => theme.textColorDown};
    letter-spacing: 0.03rem;
  }

  label,
  span {
    font-size: 0.82rem;
  }

  span {
    font-size: 0.73rem;
  }

  &.block {
    width: 100%;
  }

  &.solid {
    input {
      background: ${({ theme }) => theme.inputBackgroundColorDown};
      border-color: transparent;

      &:focus {
        background: ${({ theme }) => theme.inputBackgroundColorUp};
      }
    }
  }

  input:focus {
    border-color: ${({ theme }) => theme.primaryColorUp};
  }

  &.error {
    input {
      border-color: ${({ theme }) => theme.dangerColorUp};
    }

    span {
      color: ${({ theme }) => theme.dangerColorUp};
    }
  }
`;
