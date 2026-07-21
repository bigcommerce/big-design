import { theme as defaultTheme, ThemeInterface } from '@bigcommerce/big-design-theme';
import styled, { css } from 'styled-components';

// Per tree-depth indent, shared with TreeNode's virtualized row padding so both
// rendering modes indent nested nodes identically.
export const getTreeIndentUnit = (theme: ThemeInterface) =>
  theme.helpers.addValues(theme.spacing.xLarge, theme.spacing.xxSmall);

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
    padding-left: ${({ theme }) => getTreeIndentUnit(theme)};
  }

  /* Doubled selector (&&) plus !important match the override-resistance the
     previous inline overflow:hidden style had (only another !important rule can
     beat an inline style) — a plain class rule's specificity can be beaten by a
     host-page ID selector, which would silently defeat the scroll clipping that
     virtualization's windowing depends on. */
  &&[role='tree'] {
    overflow: hidden !important;

    ${({ $maxHeight, $virtualized }) =>
      $virtualized &&
      css`
        max-height: ${$maxHeight}px !important;
        overflow-x: hidden !important;
        overflow-y: auto !important;
        position: relative;
      `}
  }
`;

export const StyledVirtualSpacer = styled.li<{ $height: number }>`
  height: ${({ $height }) => $height}px;
`;

StyledUl.defaultProps = { theme: defaultTheme };
