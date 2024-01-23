import { hideVisually } from 'polished';
import { css, IStyledComponent, styled } from 'styled-components';

import { StyleableText } from '../../Typography/private';
import { TextProps } from '../../Typography/types';

export interface StyledLabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {
  hidden?: boolean;
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

  ${({ hidden }) => hidden && hideVisually()}
`;
