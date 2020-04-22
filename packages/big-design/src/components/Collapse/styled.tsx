import { theme as defaultTheme } from '@bigcommerce/big-design-theme';
import styled, { css } from 'styled-components';

import { withTransition } from '../../mixins/transitions';
import { StyleableButton } from '../Button/private';

export const StyledButton = styled(StyleableButton).attrs<{}, { isOpen?: boolean }>({})`
  padding-left: ${({ theme }) => theme.spacing.none};
  padding-right: ${({ theme }) => theme.spacing.none};
  width: auto;

  &:active,
  &:hover:not(:active) {
    background: none;
    color: ${({ theme }) => theme.colors.primary70};
  }

  &:focus {
    box-shadow: none;
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
