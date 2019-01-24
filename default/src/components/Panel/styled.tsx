import styled from 'styled-components';

import { defaultTheme } from '../../theme';

export const StyledPanel = styled.section`
  ${({ theme }) => theme.elevation.floating}

  background-color: ${({ theme }) => theme.colors.white};
  margin: 0 0 ${({ theme }) => theme.spacing.xxLarge};
  padding: ${({ theme }) => theme.spacing.xxLarge};
  
  &:last-child {
    margin: 0;
  }
`;

StyledPanel.defaultProps = { theme: defaultTheme };
