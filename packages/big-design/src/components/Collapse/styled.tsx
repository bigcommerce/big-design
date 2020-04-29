import { theme as defaultTheme } from '@bigcommerce/big-design-theme';
import styled, { css } from 'styled-components';

import { withTransition } from '../../mixins/transitions';
import { Box } from '../Box';
import { StyleableButton } from '../Button/private';

export const StyledBox = styled(Box)`
  margin-left: -${({ theme }) => theme.spacing.xxSmall};
`;

export const StyledButton = styled(StyleableButton).attrs<{}, { isOpen?: boolean }>({})`
  height: auto;
  line-height: inherit;
  margin-bottom: ${({ theme }) => theme.spacing.small};
  margin-left: -${({ theme }) => theme.spacing.xxSmall};
  margin-top: ${({ theme }) => theme.spacing.small};
  padding-bottom: ${({ theme }) => theme.spacing.xxSmall};
  padding-left: ${({ theme }) => theme.spacing.xxSmall};
  padding-right: ${({ theme }) => theme.spacing.none};
  padding-top: ${({ theme }) => theme.spacing.xxSmall};
  width: auto;

  &:active,
  &:hover:not(:active) {
    background: none;
    color: ${({ theme }) => theme.colors.primary70};
  }

  span {
    grid-gap: ${({ theme }) => theme.spacing.none};
    height: ${({ theme }) => theme.spacing.medium};
  }

  svg {
    ${withTransition(['transform'])}

    ${({ isOpen }) =>
      isOpen &&
      css`
        transform: rotate(-180deg);
      `}
  }
`;

StyledButton.defaultProps = { theme: defaultTheme };
