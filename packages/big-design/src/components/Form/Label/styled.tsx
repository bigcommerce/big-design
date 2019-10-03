import { theme as defaultTheme } from '@bigcommerce/big-design-theme';
import styled, { DefaultTheme, StyledComponent } from 'styled-components';

import { StyleableH4 } from '../../Typography/private';

import { LabelProps } from './Label';

export const StyledLabel = styled(StyleableH4).attrs({
  as: 'label',
})<LabelProps>`
  display: inline-block;
  margin-bottom: ${({ theme }) => theme.spacing.xxSmall};
` as StyledComponent<'label', DefaultTheme>;

export const StyledOptionalSpan = styled.span`
  color: ${({ theme }) => theme.colors.secondary60};
  font-weight: ${({ theme }) => theme.typography.fontWeight.regular};
`;

StyledLabel.defaultProps = { theme: defaultTheme };
StyledOptionalSpan.defaultProps = { theme: defaultTheme };
