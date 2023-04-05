import styled from 'styled-components';

import { ButtonProps } from './model';

export const ButtonStyled = styled.button<ButtonProps>`
  height: 40px;
  background: ${({ theme }) => theme.primaryColorUp};
  border-radius: 8px;
  padding: 10px 15px;
  font-family: ${({ theme }) => theme.primaryFontFamily};
  font-size: 0.875rem;
  transition: all 0.14s;
  font-weight: ${({ bold }) => bold || 400};
  letter-spacing: 0.03rem;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 2px solid transparent;
  outline: none;
  color: ${({ theme }) => theme.lightColorUp};
  cursor: pointer;

  &:focus {
    border-color: ${({ theme }) => theme.outlineColorUp};
  }

  &.disabled {
    pointer-events: none;
    opacity: 0.3;
  }

  &.block {
    width: 100%;
  }
`;
