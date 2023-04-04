import styled from 'styled-components';
import { rgba, parseToRgb } from 'polished';

export const NavbarStyled = styled.header`
  width: 100%;
  height: 80px;

  position: fixed;
  top: 0px;
  backdrop-filter: blur(10px);
  background: ${({ theme }) => {
    const color = parseToRgb(theme.foregroundColorDown as string);

    return rgba(color.red, color.green, color.blue, 0.8);
  }};
  padding: 10px 40px;

  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 60px;
  z-index: 8;

  &.hidden {
    display: none;
  }

  > a img {
    width: 55px;
    height: 55px;
  }

  .search {
    width: 100%;
    max-width: 600px;
  }

  div {
    display: flex;
    justify-content: center;
    align-items: center;

    .auth_action {
      gap: 10px;
    }
  }

  > div {
    align-items: flex-end;

    > div:first-child {
      margin-right: 50px;
      gap: 35px;

      i {
        color: ${({ theme }) => theme.textColorDown};
        cursor: pointer;
        font-size: 1.3rem;
        transition: all 0.15s;

        &:hover {
          color: ${({ theme }) => theme.primaryColorUp};
        }
      }
    }
  }
`;
