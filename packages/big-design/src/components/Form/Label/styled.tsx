import { theme as defaultTheme } from '@bigcommerce/big-design-theme';
import styled, { css, DefaultTheme, StyledComponent } from 'styled-components';

import { StyleableH4 } from '../../Typography/private';
import { HeadingProps } from '../../Typography/types';

import { LabelProps } from './Label';

interface StyledLabelArgument extends LabelProps {
  theme: DefaultTheme;
}

export const StyledLabel = styled<
  StyledComponent<'label' | 'h4', DefaultTheme, Partial<HeadingProps>> & LabelProps
>(StyleableH4).attrs({
  as: 'label',
})<LabelProps>`
  cursor: pointer;
  display: inline-block;
  margin-bottom: ${({ theme }: StyledLabelArgument) => theme.spacing.xxSmall};

  ${({ theme, renderOptional, localization }: StyledLabelArgument) =>
    renderOptional &&
    css`
      &::after {
        color: ${theme.colors.secondary60};
        content: ' (${localization?.optional})';
        font-weight: ${theme.typography.fontWeight.regular};
      }
    `}
`;

StyledLabel.defaultProps = { theme: defaultTheme };
