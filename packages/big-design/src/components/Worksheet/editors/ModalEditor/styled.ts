import { withDefaultTheme } from '@bigcommerce/big-design-theme';
import styled from 'styled-components';

import { StyleableButton } from '../../../Button/Button';
import { FlexItem } from '../../../Flex';

export const StyledButton = styled(StyleableButton).attrs(withDefaultTheme)`
  font-size: ${({ theme }) => theme.typography.fontSize.small};
  height: auto;
  line-height: ${({ theme }) => theme.lineHeight.small};
  padding: 0;

  &:hover:not(:active) {
    background-color: inherit;
    color: ${({ theme }) => theme.colors.primary70};
  }

  &:active {
    background-color: inherit;
  }
`;

export const StyledFlexItem = styled(FlexItem).attrs(withDefaultTheme)`
  overflow: hidden;
`;
