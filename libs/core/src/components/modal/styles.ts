import styled from 'styled-components';
import { motion } from 'framer-motion';
import { parseToRgb, rgba } from 'polished';

export const ModalSyled = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  z-index: 10;
  height: 100vh;
  height: 100dvh;
  background: ${({ theme }) => {
    const color = parseToRgb(theme.foregroundColorDown as string);

    return rgba(color.red, color.green, color.blue, 0.8);
  }};
  backdrop-filter: blur(8px);
  padding: 15px;

  display: flex;
  justify-content: center;
  align-items: center;

  > div {
    background: ${({ theme }) => theme.backgroundColorUp};
    border-radius: 10px;
    position: fixed;
    min-width: 0px;
    min-height: fit-content;
    width: fit-content;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
`;
