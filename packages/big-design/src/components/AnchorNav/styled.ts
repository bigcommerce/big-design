import { theme as defaultTheme } from '@bigcommerce/big-design-theme';
import styled from 'styled-components';

import { BoxProps } from '../Box';

export const StyledAnchorNav = styled.div<BoxProps>`
display: block;
position relative;

.anchor-nav {
    &__list {
        position: sticky;
        inset-block-start: 0;
        width: 266px;
        float: inline-start;
        display:none;

        @media (min-width: ${({ theme }) => theme.breakpointValues.tablet}) {
            display: block;
            margin-inline-end: ${defaultTheme.spacing.xLarge};
        }

        & > ul {
            list-style-type: none;
            padding: 0;
            margin: 0;

            & > li {
                display:block;
                margin: 0;
                padding: 0;
                box-sizing: border-box;

                & > a {
                    color: ${defaultTheme.colors.primary};
                    text-decoration: none;
                    display: block;
                    padding: ${defaultTheme.spacing.small} ${defaultTheme.spacing.large};
                    border-inline-start: 3px solid transparent;

                    &:hover {
                        background-color: ${defaultTheme.colors.primary10};
                    }

                    &.active {
                        color: ${defaultTheme.colors.secondary70};
                        border-inline-start: 3px solid ${defaultTheme.colors.primary};

                        &:hover {
                            background-color: transparent;
                        }
                    }
                }
            }
        }
    
    }
    
    &__elements {
        display:flex;
        flex-direction: column;
        gap: ${defaultTheme.spacing.xLarge};
    }
}
`;

StyledAnchorNav.defaultProps = { theme: defaultTheme };
