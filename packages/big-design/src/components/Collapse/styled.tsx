import { theme as defaultTheme } from '@bigcommerce/big-design-theme';
import styled, { css } from 'styled-components';

import { withTransition } from '../../mixins/transitions';
import { ButtonProps } from '../Button';
import { StyleableButton } from '../Button/private';

interface StyledButtonProps extends ButtonProps {
  isOpen?: boolean;
}

export const StyledButton = styled(StyleableButton)<StyledButtonProps>`
  height: auto;
  line-height: inherit;
  margin-left: -${({ theme }) => theme.spacing.xxSmall};
  padding: ${({ theme }) => theme.spacing.xxSmall};
  padding-right: ${({ theme }) => theme.spacing.none};
  width: auto;

  &:active,
  &:hover:not(:active) {
    background: none;
    color: ${({ theme }) => theme.colors.primary70};
  }

  span {
    grid-gap: ${({ theme }) => theme.spacing.none};
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
