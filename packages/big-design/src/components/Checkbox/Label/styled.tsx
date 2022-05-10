import { theme as defaultTheme } from '@bigcommerce/big-design-theme';
import { hideVisually } from 'polished';
import styled, { css } from 'styled-components';

import { StyleableText } from '../../Typography/private';

export interface StyledLabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {
  hidden?: boolean;
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

  ${({ hidden }) => hidden && hideVisually()}
`;

StyledLabel.defaultProps = { theme: defaultTheme };
