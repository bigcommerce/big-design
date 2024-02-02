import { theme as defaultTheme } from '@bigcommerce/big-design-theme';
import { styled } from 'styled-components';

import { StyleableButton } from '../Button/private';

export const StyledButton = styled(StyleableButton)`
  color: ${({ theme }) => theme.colors.secondary70};
  width: auto;
`;

StyledButton.defaultProps = { theme: defaultTheme };
