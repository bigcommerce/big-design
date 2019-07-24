import { theme as defaultTheme } from '@bigcommerce/big-design-theme';
import styled from 'styled-components';

import { StyleableSmall } from '../../Typography/private';

export const StyledError = styled(StyleableSmall)`
  color: ${({ theme }) => theme.colors.danger40};
  margin-top: ${({ theme }) => theme.spacing.xxSmall};
`;

StyledError.defaultProps = { theme: defaultTheme };
