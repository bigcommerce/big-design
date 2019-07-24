import { theme as defaultTheme } from '@bigcommerce/big-design-theme';
import styled, { css } from 'styled-components';

import { StyleableButton } from '../Button/private';

import { TabProps } from './Tabs';

export const StyledTabs = styled.div.attrs({ role: 'tablist' })``;

export const StyledTab = styled(StyleableButton).attrs<TabProps>(props => ({
  role: 'tab',
  tabIndex: props.id === props.activeTab ? -1 : 0,
}))<TabProps>`
  border: none;
  border-bottom: ${({ theme }) => theme.spacing.xxSmall} solid transparent;
  border-bottom-color: ${props => (props.id === props.activeTab ? props.theme.colors.primary40 : 'transparent')};
  border-radius: 0;
  color: ${({ theme }) => theme.colors.secondary70};
  pointer-events: ${props => (props.id === props.activeTab ? 'none' : 'auto')};

  &:active,
  &:hover:not(:active) {
    background-color: transparent;
  }

  &:active {
    box-shadow: none;
  }

  ${props =>
    props.id === props.activeTab &&
    css`
      &:focus {
        box-shadow: none;
      }
    `}
`;

StyledTab.defaultProps = {
  theme: defaultTheme,
  variant: 'subtle',
};

StyledTabs.defaultProps = { theme: defaultTheme };
