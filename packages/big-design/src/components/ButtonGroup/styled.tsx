import { theme as defaultTheme } from '@bigcommerce/big-design-theme';
import styled from 'styled-components';

import { Flex } from '../Flex';

import { ButtonGroupProps } from './ButtonGroup';

export const StyledButtonGroup = styled(Flex)<ButtonGroupProps>`
  .bd-button + & {
    margin-left: ${({ theme }) => theme.spacing.xSmall};
  }

  & + .bd-button {
    margin-left: ${({ theme }) => theme.spacing.xSmall};
  }

  .bd-button {
    border-radius: ${({ theme }) => theme.borderRadius.none};
    margin: 0;
    width: auto;
  }

  .bd-button:not(:first-of-type) {
    border-left: ${({ theme }) => theme.border.none};
  }

  .bd-button:first-of-type {
    border-bottom-left-radius: ${({ theme }) => theme.borderRadius.normal};
    border-top-left-radius: ${({ theme }) => theme.borderRadius.normal};
  }

  .bd-button:last-of-type {
    border-bottom-right-radius: ${({ theme }) => theme.borderRadius.normal};
    border-top-right-radius: ${({ theme }) => theme.borderRadius.normal};
  }
`;

StyledButtonGroup.defaultProps = { theme: defaultTheme };
