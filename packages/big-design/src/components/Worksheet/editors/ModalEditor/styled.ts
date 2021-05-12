import { theme as defaultTheme } from '@bigcommerce/big-design-theme';
import styled from 'styled-components';

import { StyleableButton } from '../../../Button/Button';

export const StyledButton = styled(StyleableButton)`
  font-size: ${({ theme }) => theme.typography.fontSize.small};
  height: auto;
  line-height: ${({ theme }) => theme.lineHeight.small};
  padding: 0;

  & :hover:not(:active) {
    background-color: inherit;
    color: ${({ theme }) => theme.colors.primary70};
  }

  & :active {
    background-color: inherit;
  }
`;

StyledButton.defaultProps = { theme: defaultTheme };
