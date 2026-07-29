import { theme as defaultTheme } from '@bigcommerce/big-design-theme';
import isPropValid from '@emotion/is-prop-valid';
import styled from 'styled-components';

export const StyledAnchorNavList = styled.nav.withConfig({
  shouldForwardProp: (prop, defaultValidatorFn) =>
    typeof prop === 'string' ? isPropValid(prop) : defaultValidatorFn(prop),
})`
  position: sticky;
  inset-block-start: 0;
  width: ${({ theme }) => theme.helpers.remCalc(266)};
  float: inline-start;
  display: none;

  @media (min-width: ${({ theme }) => theme.breakpointValues.tablet}) {
    display: block;
    margin-inline-end: ${defaultTheme.spacing.xLarge};
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
        color: ${defaultTheme.colors.primary};
        text-decoration: none;
        display: block;
        padding: ${defaultTheme.spacing.small} ${defaultTheme.spacing.large};
        border-inline-start: ${({ theme }) => theme.spacing.xxSmall} solid transparent;

        &:hover {
          background-color: ${defaultTheme.colors.primary10};
        }

        &.active {
          color: ${defaultTheme.colors.secondary70};
          border-inline-start: ${({ theme }) => theme.spacing.xxSmall} solid
            ${defaultTheme.colors.primary};

          &:hover {
            background-color: transparent;
          }
        }
      }
    }
  }
`;

StyledAnchorNavList.defaultProps = { theme: defaultTheme };
