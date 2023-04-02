import styled from 'styled-components';

export const NavbarStyled = styled.div`
  width: 100%;
  height: 80px;

  position: fixed;
  top: 0px;
  backdrop-filter: blur(10px);
  background: ${({ theme }) => theme.foregroundColorDown};
  padding: 10px 40px;

  display: flex;
  justify-content: space-between;
  align-items: center;

  > a img {
    width: 55px;
    height: 55px;
  }

  div {
    display: flex;
    justify-content: center;
    align-items: center;

    &,
    .auth_action {
      gap: 10px;
    }
  }
`;
