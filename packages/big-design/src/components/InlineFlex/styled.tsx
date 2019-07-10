import styled from 'styled-components';

import { defaultTheme } from '../../theme';
import { FlexProps } from '../Flex';

export const StyledInlineFlex = styled.span<FlexProps>`
  display: inline-flex;
  flex-direction: column;
  flex-wrap: ${({ wrap }) => wrap};
  align-content: ${({ alignContent }) => alignContent};
  align-items: ${({ alignItems }) => alignItems};
  justify-content: ${({ justifyContent }) => justifyContent};

  ${({ theme }) => theme.breakpoints.tablet} {
    flex-direction: ${({ direction }) => direction};
  }
`;

StyledInlineFlex.defaultProps = {
  alignContent: 'stretch',
  alignItems: 'stretch',
  direction: 'row',
  wrap: 'nowrap',
  justifyContent: 'flex-start',
  theme: defaultTheme,
};
