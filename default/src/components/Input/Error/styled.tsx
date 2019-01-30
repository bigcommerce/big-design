import styled from 'styled-components';

import { defaultTheme } from '../../../theme';
import { Small } from '../../Text';

export const StyledError = styled(Small)`
  color: ${({ theme }) => theme.colors.danger40};
  margin-top: ${({ theme }) => theme.spacing.xxSmall};
`;

StyledError.defaultProps = { theme: defaultTheme };
