import styled from 'styled-components';

import { defaultTheme } from '../../theme';
import { Button } from '../Button';

import { TabProps } from './Tabs';

export const StyledTabs = styled.div.attrs({ role: 'tablist' })`
  border-bottom: ${({ theme }) => theme.border.box};
`;

export const StyledTab = styled(Button).attrs({ role: 'tab' })<TabProps>`
  border: none;
  border-bottom: 4px solid transparent;
  border-bottom-color: ${props => (props.id === props.activeTab ? props.theme.colors.primary40 : 'transparent')};
  border-radius: 0;
  color: ${({ theme }) => theme.colors.secondary70};
  pointer-events: ${props => (props.id === props.activeTab ? 'none' : 'auto')};

  &:active,
  &:hover:not(:active) {
    background-color: transparent;
  }
`;

StyledTab.defaultProps = {
  theme: defaultTheme,
  variant: 'subtle',
};

StyledTabs.defaultProps = { theme: defaultTheme };
