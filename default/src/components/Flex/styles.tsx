import { css } from 'styled-components';

import { FlexProps } from './Flex';

export const FlexStyles = css<FlexProps>`
  display: flex;
  flex-direction: column;
  align-items: ${({ alignItems }) => alignItems};
  justify-content: ${({ justifyContent }) => justifyContent};

  ${({ theme }) => theme.breakpoints.medium} {
    flex-direction: ${({ flexDirection }) => flexDirection};
  }
`;
