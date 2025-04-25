import { theme as defaultTheme } from '@bigcommerce/big-design-theme';
import styled, { DefaultTheme, StyledComponent } from 'styled-components';

import { StyleableH4 } from '../../Typography/private';
import { HeadingProps } from '../../Typography/types';

import { type FormControlLabelProps } from './Label';

interface StyledLabelArgument extends Omit<FormControlLabelProps, 'localization'> {
  theme: DefaultTheme;
}

export const StyledLabel = styled<
  StyledComponent<'label' | 'h4', DefaultTheme, Partial<HeadingProps>> & FormControlLabelProps
>(StyleableH4).attrs({
  as: 'label',
})<FormControlLabelProps>`
  cursor: pointer;
  display: inline-block;
  margin-bottom: ${({ theme }: StyledLabelArgument) => theme.spacing.xxSmall};
`;

StyledLabel.defaultProps = { theme: defaultTheme };
