import { theme as defaultTheme } from '@bigcommerce/big-design-theme';
import { css, styled } from 'styled-components';

import { Flex } from '../../Flex';

interface StyledProps {
  childrenCount?: number;
  fullWidth?: boolean;
}

const SharedGroupStyles = css`
  display: grid;
  grid-gap: ${({ theme }) => `${theme.spacing.xSmall} ${theme.spacing.medium}`};
  margin-bottom: ${({ theme }) => theme.spacing.medium};

  &:last-child {
    margin-bottom: ${({ theme }) => theme.spacing.none};
  }
`;

export const StyledError = styled(Flex)`
  flex-direction: row;
`;

export const StyledGroup = styled.div`
  ${SharedGroupStyles};
`;

export const StyledInlineGroup = styled.div<StyledProps>`
  ${SharedGroupStyles};

  ${({ theme }) => theme.breakpoints.tablet} {
    ${({ childrenCount, fullWidth, theme }) =>
      childrenCount === 2 &&
      css`
        grid-template-columns: repeat(2, ${fullWidth ? '1fr' : theme.helpers.remCalc(200)});

        ${StyledError} {
          grid-column: 1 / 3;
        }
      `}

    ${({ childrenCount, fullWidth, theme }) =>
      childrenCount === 3 &&
      css`
        grid-template-columns: repeat(3, ${fullWidth ? '1fr' : theme.helpers.remCalc(128)});

        ${StyledError} {
          grid-column: 1 / 4;
        }
      `}
  }
`;

StyledError.defaultProps = { theme: defaultTheme };
StyledGroup.defaultProps = { theme: defaultTheme };
StyledInlineGroup.defaultProps = { theme: defaultTheme };
