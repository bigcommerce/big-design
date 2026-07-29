import { theme as defaultTheme } from '@bigcommerce/big-design-theme';
import isPropValid from '@emotion/is-prop-valid';
import styled from 'styled-components';

import { ListProps } from './List';

export const StyledListOverflowWrapper = styled.div.withConfig({
  shouldForwardProp: (prop, defaultValidatorFn) =>
    typeof prop === 'string' ? isPropValid(prop) : defaultValidatorFn(prop),
})`
  ${({ theme }) => theme.shadow.raised}

  height: 100%;
  position: relative;
  overflow: hidden;
`;

StyledListOverflowWrapper.defaultProps = { theme: defaultTheme };

export const StyledList = styled.ul.withConfig({
  shouldForwardProp: (prop, defaultValidatorFn) =>
    typeof prop === 'string' ? isPropValid(prop) : defaultValidatorFn(prop),
})<Partial<ListProps<unknown>>>`
  ${({ theme }) => theme.shadow.raised};

  background-color: ${({ theme }) => theme.colors.white};
  color: ${({ theme }) => theme.colors.secondary70};
  margin: 0;
  max-height: ${({ theme, maxHeight }) => (maxHeight ? theme.helpers.remCalc(maxHeight) : '')};
  outline: none;
  overflow-y: auto;
  padding: ${({ theme }) => theme.spacing.xSmall} 0;
  z-index: ${({ theme }) => theme.zIndex.popover};
`;

StyledList.defaultProps = { theme: defaultTheme };
