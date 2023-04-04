import styled from 'styled-components';

export const BadgeStyled = styled.div`
  position: relative;
  width: fit-content;

  > div:first-child {
    min-width: 15px;
    height: 20px;
    padding: 0px 5px;
    display: grid;
    place-items: center;
    border-radius: 5px;

    position: absolute;
    top: -16px;
    right: -16px;

    font-size: 0.75rem;
    font-weight: 500;
    font-family: ${({ theme }) => theme.primaryFontFamily};
    color: ${({ theme }) => theme.lightColorUp};

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
      color: ${({ theme }) => theme.darkColorUp};
      background: ${({ theme }) => theme.warningColorUp};
    }
  }
`;
