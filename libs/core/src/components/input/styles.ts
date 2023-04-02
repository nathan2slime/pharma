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
    border: 2px solid ${({ theme }) => theme.borderColorUp};
    padding: 8px 10px;
    outline: none;
    font-size: 0.875rem;

    &:focus {
      border-color: ${({ theme }) => theme.primaryColorUp};
    }
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

  &.error {
    input {
      border-color: ${({ theme }) => theme.dangerColorUp};
    }

    span {
      color: ${({ theme }) => theme.dangerColorUp};
    }
  }

  &.solid {
    input {
      background: ${({ theme }) => theme.foregroundColorDown};
    }
  }
`;
