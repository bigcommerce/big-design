import { theme as defaultTheme } from '@bigcommerce/big-design-theme';
import styled, { css, DefaultTheme, StyledComponent } from 'styled-components';

import { StyleableH4 } from '../../Typography/private';

import { LabelProps } from './Label';

export const StyledLabel = styled(StyleableH4).attrs({
  as: 'label',
})<LabelProps>`
  display: inline-block;
  margin-bottom: ${({ theme }) => theme.spacing.xxSmall};

  ${({ renderOptional }) =>
    renderOptional &&
    css`
      &::after {
        color: ${({ theme }) => theme.colors.secondary60};
        content: ' (optional)';
        font-weight: ${({ theme }) => theme.typography.fontWeight.regular};
      }
    `}
` as StyledComponent<'label', DefaultTheme>;

StyledLabel.defaultProps = { theme: defaultTheme };
