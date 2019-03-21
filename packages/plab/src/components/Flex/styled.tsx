import styled from 'styled-components';

import { defaultTheme } from '../../theme';
import { Box } from '../Box';

import { FlexProps } from './Flex';

export const StyledFlex = styled(Box)<FlexProps>`
  display: flex;
  flex-direction: column;
  align-items: ${({ alignItems }) => alignItems};
  justify-content: ${({ justifyContent }) => justifyContent};

  ${({ theme }) => theme.breakpoints.tablet} {
    flex-direction: ${({ flexDirection }) => flexDirection};
  }
`;

StyledFlex.defaultProps = {
  alignItems: 'stretch',
  flexDirection: 'row',
  justifyContent: 'flex-start',
  theme: defaultTheme,
};
