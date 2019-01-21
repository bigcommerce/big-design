import { css } from 'styled-components';

import { ErrorProps } from './Error';

export const ErrorStyles = css<ErrorProps>`
  color: ${({ theme }) => theme.colors.danger40};
  margin-top: ${({ theme }) => theme.spacing.xxSmall};
`;
