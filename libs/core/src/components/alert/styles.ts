import styled from 'styled-components';

export const AlertStyled = styled.div`
  width: fit-content;
  padding: 8px 30px;
  border-radius: 8px;
  position: absolute;
  bottom: 20px;
  right: 20px;
  pointer-events: none;
  transition: all 0.3s;
  height: 40px;
  font-family: ${({ theme }) => theme.primaryFontFamily};
  font-size: 0.875rem;
  color: ${({ theme }) => theme.lightColorUp};
  font-weight: 600;
  z-index: 11;
  opacity: 0;

  display: flex;
  justify-content: center;
  align-items: center;

  &.open {
    pointer-events: all;
    opacity: 1;
  }

  &.info {
    background: ${({ theme }) => theme.primaryColorUp};
  }

  &.danger {
    background: ${({ theme }) => theme.dangerColorUp};
  }

  &.success {
    background: ${({ theme }) => theme.successColorUp};
  }

  &.warning {
    color: ${({ theme }) => theme.textColorDown};
    background: ${({ theme }) => theme.warningColorUp};
  }
`;
