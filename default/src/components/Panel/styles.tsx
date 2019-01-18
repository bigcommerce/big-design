import { css } from 'styled-components';

export const PanelStyles = css`
  ${({ theme }) => theme.elevation.floating}

  background-color: ${({ theme }) => theme.colors.white};
  margin: 0 0 ${({ theme }) => theme.spacing.xxLarge};
  padding: ${({ theme }) => theme.spacing.xxLarge};
  
  &:last-child {
    margin: 0;
  }
`;
