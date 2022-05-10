import styled, { css } from 'styled-components';

import { StyleableText } from '../../Typography/private';

export interface StyledLabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {
  disabled?: boolean;
}

export const StyledLabel = styled(StyleableText).attrs({
  as: 'label',
})<StyledLabelProps>`
  cursor: pointer;

  ${({ disabled }) =>
    disabled &&
    css`
      cursor: not-allowed;
    `}
`;
