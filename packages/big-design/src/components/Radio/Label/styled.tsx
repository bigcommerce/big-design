import styled, { css, DefaultTheme, StyledComponent } from 'styled-components';

import { StyleableText } from '../../Typography/private';

export interface StyledLabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {
  disabled?: boolean;
}

// eslint-disable-next-line @typescript-eslint/consistent-type-assertions
export const StyledLabel = styled(StyleableText).attrs({
  as: 'label',
})<StyledLabelProps>`
  cursor: pointer;

  ${({ disabled }) =>
    disabled &&
    css`
      cursor: not-allowed;
    `}
` as StyledComponent<'label', DefaultTheme, StyledLabelProps>;
