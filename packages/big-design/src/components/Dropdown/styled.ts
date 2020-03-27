import { theme as defaultTheme } from '@bigcommerce/big-design-theme';
import styled from 'styled-components';

import { withTransition } from '../../mixins/transitions';
import { StyledGroupHeader } from '../List/GroupHeader/styled';

export const StyledLink = styled.a`
  ${withTransition(['background-color', 'color'])}

  align-items: center;
  color: ${({ theme }) => theme.colors.secondary70};
  display: flex;
  height: 100%;
  text-decoration: none;
  width: 100%;

  &:focus {
    outline: none;
  }
`;

export const StyledListGroupHeader = styled(StyledGroupHeader)`
  font-weight: ${({ theme }) => theme.typography.fontWeight.semiBold};
  font-size: ${({ theme }) => theme.typography.fontSize.small};
  margin-top: ${({ theme }) => theme.spacing.medium};
  color: ${({ theme }) => theme.colors.secondary50};
`;

StyledLink.defaultProps = { theme: defaultTheme };
StyledListGroupHeader.defaultProps = { theme: defaultTheme };
