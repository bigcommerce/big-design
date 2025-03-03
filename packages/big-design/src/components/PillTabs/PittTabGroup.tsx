import { theme as defaultTheme } from '@bigcommerce/big-design-theme';
import styled, { css } from 'styled-components';

interface Props {
  isVisible: boolean;
}

export const PillTabGroup = styled.fieldset<Props>`
  ${({ isVisible }) =>
    !isVisible &&
    css`
      position: absolute;
      visibility: hidden;
      z-index: ${({ theme }) => -theme.zIndex.tooltip};
    `}

  display: flex;
  border: none;
  margin: 0;
  padding: 0;
  border-left: 1px solid ${({ theme }) => theme.colors.secondary30};
  padding-left: ${({ theme }) => theme.spacing.xSmall};

  &:first-child {
    border-left: none;
    padding-left: 0;
  }
`;

PillTabGroup.defaultProps = { theme: defaultTheme };
