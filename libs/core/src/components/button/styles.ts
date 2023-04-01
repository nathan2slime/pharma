import styled from 'styled-components';

import { ButtonProps } from './model';

export const ButtonStyled = styled.button<ButtonProps>`
  height: 40px;
  background: ${({ theme }) => theme.primaryColorUp};
  border: 1px solid transparent;
  border-radius: 5px;
  padding: 10px 15px;
  font-family: ${({ theme }) => theme.primaryFontFamily};
  font-size: 0.875rem;
  font-weight: ${({ bold }) => bold || 400};
  letter-spacing: 0.03rem;
  color: ${({ theme }) => theme.lightColorUp};
  cursor: pointer;

  &.block {
    width: 100%;
  }
`;
