import styled from 'styled-components';

export const FilterBarStyled = styled.div`
  background: ${({ theme }) => theme.foregroundColorUp};
  border-radius: 8px;
  gap: 20px;
  padding: 30px 20px;

  h3 {
    font-family: ${({ theme }) => theme.primaryFontFamily};
    color: ${({ theme }) => theme.textColorDown};

    font-size: 1.04rem;

    span {
      color: ${({ theme }) => theme.primaryColorUp};
    }

    width: 200px;
    white-space: nowrap;
    overflow: hidden;

    text-overflow: ellipsis;
  }

  .header_filter_bar {
    display: flex;
    align-items: center;
    gap: 10px;

    > i {
      font-size: 1.3rem;
      transition: all 0.15s;
      cursor: pointer;
      padding: 4px;
      border-radius: 5px;
      color: ${({ theme }) => theme.textColorDown};
      background: ${({ theme }) => theme.backgroundColorUp};
      border: 1px solid ${({theme}) => theme.borderColorDown};

      &:hover {
        color: ${({ theme }) => theme.primaryColorDown};
        border-color: ${({ theme }) => theme.primaryColorDown};
      }
    }
  }

  p {
    font-size: 0.875rem;
    font-family: ${({ theme }) => theme.secondaryFontFamily};
    color: ${({ theme }) => theme.secondaryColorDown};
    text-transform: lowercase;
    font-weight: 400;
  }

  &,
  > div:first-child {
    width: 100%;

    display: flex;
    align-items: flex-start;
    flex-direction: column;
    justify-content: space-between;
  }

  > div:first-child {
    gap: 20px;
    margin-bottom: 10px;
  }

  .select {
    width: 100%;
    max-width: 300px;
  }

  .loader {
    width: 100%;
  }
`;
