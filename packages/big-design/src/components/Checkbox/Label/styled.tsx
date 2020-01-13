import { theme as defaultTheme } from '@bigcommerce/big-design-theme';
import { hideVisually } from 'polished';
import styled, { css, DefaultTheme, StyledComponent } from 'styled-components';

import { StyleableText } from '../../Typography/private';

export interface StyledLabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {
  hidden?: boolean;
  disabled?: boolean;
}

export const StyledLabel = styled(StyleableText).attrs({
  as: 'label',
})<StyledLabelProps>`
  cursor: pointer;
  margin-left: ${({ theme }) => theme.spacing.xSmall};

  ${({ disabled, theme }) =>
    disabled &&
    css`
      cursor: not-allowed;
      color: ${theme.colors.secondary40};
    `}

  ${({ hidden }) => hidden && hideVisually()}
` as StyledComponent<'label', DefaultTheme, StyledLabelProps>;

StyledLabel.defaultProps = { theme: defaultTheme };
