import { css, IStyledComponent, styled } from 'styled-components';

import { TextProps } from '../../Typography';
import { StyleableText } from '../../Typography/private';

export interface StyledLabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {
  disabled?: boolean;
}

export const StyledLabel = styled<IStyledComponent<'web', Partial<TextProps>> & StyledLabelProps>(
  StyleableText,
).attrs({
  as: 'label',
})<StyledLabelProps>`
  cursor: pointer;

  ${({ disabled }) =>
    disabled &&
    css`
      cursor: not-allowed;
    `}
`;
