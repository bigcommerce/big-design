import { withDefaultTheme } from '@bigcommerce/big-design-theme';
import styled, { css } from 'styled-components';

import { StyleableButton } from '../Button/private';
import { Flex } from '../Flex';

import { TabItem } from './Tabs';

interface TabProps extends Omit<TabItem, 'title'> {
  activeTab?: string;
}

export const StyledTabs = styled(Flex).attrs(withDefaultTheme)`
  overflow: auto;
`;

export const StyledTab = styled(StyleableButton).attrs(withDefaultTheme)<TabProps>`
  border: none;
  border-bottom: ${({ theme }) => theme.spacing.xxSmall} solid transparent;
  border-bottom-color: ${(props) =>
    props.id === props.activeTab ? props.theme.colors.primary40 : 'transparent'};
  border-radius: 0;
  color: ${({ theme }) => theme.colors.primary};
  pointer-events: ${(props) => (props.id === props.activeTab ? 'none' : 'auto')};
  width: auto;

  ${(props) =>
    props.id === props.activeTab &&
    css`
      color: ${props.theme.colors.secondary70};

      &:focus {
        box-shadow: none;
      }
    `}
`;
