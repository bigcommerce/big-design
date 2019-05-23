import { rem } from 'polished';
import styled from 'styled-components';

import { defaultTheme } from '../../../theme';

import { ListActionProps } from './Action';

export const StyledListAction = styled.li<ListActionProps>`
  border-top: 1px solid ${({ theme }) => theme.colors.secondary30};
  color: ${({ actionType, theme }) => (actionType === 'normal' ? theme.colors.primary : theme.colors.danger)};
  margin-top: ${({ theme }) => theme.spacing.xSmall};
  min-width: ${rem(256)};
  outline: none;
  overflow: hidden;
  padding: ${({ theme }) => theme.spacing.xSmall} 0 0;
  &[data-highlighted='true'] > div {
    background-color: ${({ theme }) => theme.colors.secondary10};
  }
  &:only-child {
    border: none;
    margin: 0;
    padding: 0;
  }
`;

export const Wrapper = styled.div`
  cursor: pointer;
  display: flex;
  height: ${rem(36)};
  padding: 0 ${({ theme }) => theme.spacing.medium};
  width: 100%;
`;

export const ContentWrapper = styled.span`
  align-content: center;
  align-items: center;
  display: inline-grid;
  grid-auto-flow: column;
  grid-gap: ${({ theme }) => theme.spacing.xSmall};
`;

ContentWrapper.defaultProps = { theme: defaultTheme };
StyledListAction.defaultProps = { theme: defaultTheme };
Wrapper.defaultProps = { theme: defaultTheme };
