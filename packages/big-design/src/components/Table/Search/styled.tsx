import { theme as defaultTheme } from '@bigcommerce/big-design-theme';
import styled from 'styled-components';

import { FlexProps } from '../../Flex';
import { withFlexedContainer } from '../../Flex/withFlex';

export const StyledFlex = styled.div<FlexProps & { stickyHeader?: boolean }>`
  ${withFlexedContainer()}

  background-color: ${({ theme }) => theme.colors.white};
  display: flex;
  padding-bottom: 4px;

  & > *:not(:first-child) {
    margin-left: ${({ theme }) => theme.spacing.small};
  }
`;

export const StyledInput = styled.div`
  flex-grow: 1;
`;

StyledFlex.defaultProps = { theme: defaultTheme };
