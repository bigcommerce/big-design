import { theme as defaultTheme } from '@bigcommerce/big-design-theme';
import styled, { css } from 'styled-components';

import { StyleableH4 } from '../../Typography/private';

import { LabelProps } from './Label';

export const StyledLabel = styled(StyleableH4).attrs({
  as: 'label',
})<LabelProps>`
  cursor: pointer;
  display: inline-block;
  margin-bottom: ${({ theme }) => theme.spacing.xxSmall};

  ${({ theme, renderOptional }) =>
    renderOptional &&
    css`
      &::after {
        color: ${theme.colors.secondary60};
        content: ' (optional)';
        font-weight: ${theme.typography.fontWeight.regular};
      }
    `}
`;

StyledLabel.defaultProps = { theme: defaultTheme };
