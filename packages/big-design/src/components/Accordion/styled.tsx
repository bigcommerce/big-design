import { theme as defaultTheme } from '@bigcommerce/big-design-theme';
import styled, { css } from 'styled-components';

import { withTransition } from '../../mixins/transitions';
import { StyleableButton } from '../Button/private';
import { H3 } from '../Typography';

export const StyledTitle = styled(H3)`
  button {
    width: auto;
  }
`;

export const StyledButton = styled(StyleableButton)`
  padding-left: ${({ theme }) => theme.spacing.none};
  padding-right: ${({ theme }) => theme.spacing.none};

  &:hover:not(:active) {
    background: none;
  }
`;

export const StyledIconWrapper = styled.span.attrs<{}, { isOpen?: boolean }>({})`
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
