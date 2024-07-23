import { theme as defaultTheme } from '@bigcommerce/big-design-theme';
import styled from 'styled-components';

import { StyleableButton } from '../../../Button/private';

export const StyledExpandButton = styled(StyleableButton)`
  position: absolute;
  top: 0;
  height: 100%;
  width: 100%;
  min-width: ${({ theme }) => theme.helpers.remCalc(32)};
  border-radius: 0;

  &:focus {
    box-shadow: none;
  }

  &:hover {
    svg {
      color: ${({ theme }) => theme.colors.primary};
    }
  }
`;

StyledExpandButton.defaultProps = { theme: defaultTheme };
