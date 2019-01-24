import styled from 'styled-components';

import { defaultTheme } from '../../../theme';
import { Small } from '../../Text';

import { ErrorProps } from './Error';

export const StyledError = styled(Small)<ErrorProps>`
  color: ${({ theme }) => theme.colors.danger40};
  margin-top: ${({ theme }) => theme.spacing.xxSmall};
`;

StyledError.defaultProps = { theme: defaultTheme };
