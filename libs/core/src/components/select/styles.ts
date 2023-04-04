import styled from 'styled-components';

export const SelectStyled = styled.div`
  position: relative;

  div {
    transition: all 0.15s;
  }

  label {
    font-family: ${({ theme }) => theme.primaryFontFamily};
    color: ${({ theme }) => theme.textColorDown};
    letter-spacing: 0.03rem;
    font-size: 0.82rem;
    margin-bottom: 6px;
    display: block;
  }

  > div {
    width: 100%;
    height: 40px;
    border-radius: 8px;
    border: 1px solid ${({ theme }) => theme.borderColorUp};
    padding: 8px 10px;

    display: flex;
    justify-content: flex-start;
    background: ${({ theme }) => theme.backgroundColorUp};
    align-items: center;

    i {
      transition: all 0.15s;
      font-size: 1.2rem;
      color: ${({ theme }) => theme.textColorDown};
    }

    &.header {
      justify-content: space-between;
    }
  }

  &.disabled {
    pointer-events: none;
    opacity: 0.7;
  }

  div {
    font-family: ${({ theme }) => theme.primaryFontFamily};
    font-size: 0.875rem;

    color: ${({ theme }) => theme.textColorDown};
  }

  > div:last-child {
    width: 100%;
    height: fit-content;
    max-height: 400px;
    padding: 0px;
    overflow-y: auto;
    position: absolute;
    overflow: hidden;
    flex-direction: column;
    pointer-events: none;
    z-index: 7;
    opacity: 0;
  
    top: 45px;
    

    > div {
      width: 100%;
      display: flex;
      justify-content: flex-start;
      align-items: center;
      

      padding: 8px 10px;
      cursor: default;
      background: ${({ theme }) => theme.backgroundColorUp};

      height: 40px;

      &:hover {
        background: ${({ theme }) => theme.backgroundColorDown};
      }

      &.active {
        font-weight: 600;
        color: ${({ theme }) => theme.primaryColorUp};
      }
    }
  }

  &.label > div:last-child {
    top: 69px;
  }

  &.open {
    i {
      transform: rotate(180deg);
    }

    > div:last-child {
      opacity: 1;
      pointer-events: all;
    }

    > div:first-child {
      i {
        color: ${({ theme }) => theme.primaryColorUp};
      }

      border-color: ${({ theme }) => theme.primaryColorUp};
    }
  }
`;
