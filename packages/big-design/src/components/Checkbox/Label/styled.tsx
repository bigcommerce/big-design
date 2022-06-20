import { theme as defaultTheme } from '@bigcommerce/big-design-theme';
import { hideVisually } from 'polished';
import styled, { css, DefaultTheme, StyledComponent } from 'styled-components';

import { StyleableText } from '../../Typography/private';
import { TextProps } from '../../Typography/types';

export interface StyledLabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {
  hidden?: boolean;
  disabled?: boolean;
}

export const StyledLabel = styled<
  StyledComponent<'label' | 'p', DefaultTheme, Partial<TextProps>> & StyledLabelProps
>(StyleableText).attrs({
  as: 'label',
})<StyledLabelProps>`
  cursor: pointer;

  ${({ disabled }) =>
    disabled &&
    css`
      cursor: not-allowed;
    `}

  ${({ hidden }) => hidden && hideVisually()}
`;

StyledLabel.defaultProps = { theme: defaultTheme };
