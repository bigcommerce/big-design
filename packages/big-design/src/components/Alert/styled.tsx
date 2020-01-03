import { addValues, theme as defaultTheme } from '@bigcommerce/big-design-theme';
import styled from 'styled-components';

import { StyleableButton } from '../Button/private';
import { Flex, FlexProps } from '../Flex';

import { AlertProps, DEFAULT_VARIANT } from './Alert';

export const StyledAlert = styled(Flex)<FlexProps & Pick<AlertProps, 'variant'>>`
  border-left-width: ${({ theme }) => theme.spacing.xxSmall};
  border-left-style: solid;
  border-left-color: ${({ theme, variant }) => variant && theme.colors[variant]};
`;

export const StyledButton = styled(StyleableButton)`
  color: ${({ theme }) => theme.colors.secondary70};
  height: ${({ theme }) => addValues(theme.spacing.xLarge, theme.spacing.xxSmall)};
  width: auto;
`;

StyledAlert.defaultProps = {
  theme: defaultTheme,
  variant: DEFAULT_VARIANT,
};
StyledButton.defaultProps = { theme: defaultTheme };
