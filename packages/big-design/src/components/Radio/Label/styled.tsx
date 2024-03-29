import { ComponentPropsWithoutRef } from 'react';
import styled, { css, DefaultTheme, StyledComponent } from 'styled-components';

import { TextProps } from '../../Typography';
import { StyleableText } from '../../Typography/private';

export interface StyledLabelProps extends ComponentPropsWithoutRef<'label'> {
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
