import { defaultTheme, Flex } from '@bigcommerce/big-design';
import { LiveError } from 'react-live';
import styled from 'styled-components';

export const StyledLiveError = styled(LiveError)`
  background-color: ${({ theme }) => theme.colors.secondary70};
  color: ${({ theme }) => theme.colors.danger};
  font-size: ${({ theme }) => theme.typography.fontSize.small};
  padding: ${({ theme }) => theme.spacing.small};
`;

export const StyledFlex = styled(Flex)`
  flex-direction: row;
`;

StyledLiveError.defaultProps = { theme: defaultTheme };
StyledFlex.defaultProps = { theme: defaultTheme };
