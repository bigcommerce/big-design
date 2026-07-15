import { theme as defaultTheme } from '@bigcommerce/big-design-theme';
import styled, { css } from 'styled-components';

export const StyledUl = styled.ul<{
  $maxHeight?: number;
  $virtualized?: boolean;
  show?: boolean;
}>`
  list-style-type: none;
  margin: 0;
  padding: 0;
  user-select: none;

  > li > ul {
    padding-left: ${({ theme }) =>
      theme.helpers.addValues(theme.spacing.xLarge, theme.spacing.xxSmall)};
  }

  &[role='tree'] {
    overflow: hidden;

    ${({ $maxHeight, $virtualized }) =>
      $virtualized &&
      css`
        max-height: ${$maxHeight}px;
        overflow-x: hidden;
        overflow-y: auto;
        position: relative;
      `}
  }
`;

export const StyledVirtualSpacer = styled.li<{ $height: number }>`
  height: ${({ $height }) => $height}px;
`;

StyledUl.defaultProps = { theme: defaultTheme };
