import { css, DefaultTheme, styled, StyledComponent } from 'styled-components';

import { TextProps } from '../../Typography';
import { StyleableText } from '../../Typography/private';

export interface StyledLabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {
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
`;
