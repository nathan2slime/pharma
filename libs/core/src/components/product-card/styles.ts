import styled from 'styled-components';

export const CardProductStyled = styled.div`
  width: 220px;
  height: 300px;

  background: ${({ theme }) => theme.foregroundColorUp};
  border-radius: 10px;
  cursor: pointer;
  overflow: hidden;
  transition: all 0.15s;

  &.isLoading {
    pointer-events: none;
  }

  > div:first-child {
    height: 200px;
    background-size: cover;
    background-repeat: no-repeat;
  }

  > div:last-child {
    padding: 10px 20px;

    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    height: 100px;
    width: 100%;
    gap: 8px;
  }

  h3 {
    font-size: 0.98rem;
    font-family: ${({ theme }) => theme.primaryFontFamily};
    color: ${({ theme }) => theme.textColorDown};
    letter-spacing: 0.03rem;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }

  p {
    font-weight: 600;
    font-size: 0.875rem;
    font-family: ${({ theme }) => theme.secondaryFontFamily};
    color: ${({ theme }) => theme.primaryColorUp};
  }

  &:hover {
    box-shadow: 0 0 0 1px ${({ theme }) => theme.primaryColorUp};
  }
`;
