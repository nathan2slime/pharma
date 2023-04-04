import styled from 'styled-components';
import { rgba, parseToRgb } from 'polished';
import { media } from '@phar/themes';

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

  .search {
    width: 100%;
    max-width: 600px;
  }

  div,
  section {
    display: flex;
    justify-content: center;
    align-items: center;

    .auth_action {
      gap: 10px;
    }
  }

  section {
    width: 100%;
    gap: 15px;
    justify-content: flex-start;

    a img {
      width: 55px;
      height: 55px;
    }
  }

  .nav_items {
    align-items: center;

    > div:first-child {
      margin-right: 50px;
      gap: 35px;

      i {
        color: ${({ theme }) => theme.textColorDown};
        cursor: pointer;
        font-size: 1.4rem;
        transition: all 0.15s;

        &:hover {
          color: ${({ theme }) => theme.primaryColorUp};
        }
      }
    }
  }

  .mobile_action {
    height: 100%;
    align-items: center;
    gap: 10px;
    justify-content: flex-end;

    button {
      display: none;
    }
  }

  .auth_modal {
    align-items: flex-end;
    padding: 0px;
    background: none;
    backdrop-filter: none;

    > div {
      width: 100%;
      max-width: 100%;
      border-radius: 10px 10px 0px 0px;
      padding: 0px 20px;
      background: ${({ theme }) => theme.foregroundColorDown};

      .auth_content_modal {
        width: 100%;
        height: 80px;

        display: flex;
        justify-content: space-between;
        align-items: center;

        i {
          color: ${({ theme }) => theme.textColorDown};
          cursor: pointer;
          font-size: 1.4rem;
          transition: all 0.15s;

          &:hover {
            color: ${({ theme }) => theme.primaryColorUp};
          }
        }

        > div:first-child {
          gap: 30px;
        }
      }
    }
  }

  .search_modal > div {
    width: 100%;
    max-width: 90%;
    margin: auto;

    .search_content_modal {
      width: 100%;
      padding: 20px;
    }
  }

  ${media.lessThan('lg')`
    section .search {
      display: none ;
    }

    .mobile_action button:first-child {
      display: block;
    }
  `}

  ${media.lessThan('sm')`
      gap: 0px;

      align-items: flex-start;

      section {
        flex-direction: column;
        justify-content: center;
        align-items: flex-start;
      }

      > div:last-child {
        display: none;
      }

      .mobile_action  button{
        display: block;
      }
  `}
`;
