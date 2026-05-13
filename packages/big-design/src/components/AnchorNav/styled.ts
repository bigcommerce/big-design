import { withDefaultTheme } from '@bigcommerce/big-design-theme';
import styled from 'styled-components';

export const StyledAnchorNavList = styled.nav.attrs(withDefaultTheme)`
  position: sticky;
  inset-block-start: 0;
  width: ${({ theme }) => theme.helpers.remCalc(266)};
  float: inline-start;
  display: none;

  @media (min-width: ${({ theme }) => theme.breakpointValues.tablet}) {
    display: block;
    margin-inline-end: ${({ theme }) => theme.spacing.xLarge};
  }

  & > ul {
    list-style-type: none;
    padding: 0;
    margin: 0;

    & > li {
      display: block;
      margin: 0;
      padding: 0;
      box-sizing: border-box;

      & > a {
        color: ${({ theme }) => theme.colors.primary};
        text-decoration: none;
        display: block;
        padding: ${({ theme }) => `${theme.spacing.small} ${theme.spacing.large}`};
        border-inline-start: ${({ theme }) => theme.spacing.xxSmall} solid transparent;

        &:hover {
          background-color: ${({ theme }) => theme.colors.primary10};
        }

        &.active {
          color: ${({ theme }) => theme.colors.secondary70};
          border-inline-start: ${({ theme }) => theme.spacing.xxSmall} solid
            ${({ theme }) => theme.colors.primary};

          &:hover {
            background-color: transparent;
          }
        }
      }
    }
  }
`;
