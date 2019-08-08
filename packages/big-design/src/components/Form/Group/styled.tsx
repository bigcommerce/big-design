import { theme as defaultTheme } from '@bigcommerce/big-design-theme';
import styled, { css } from 'styled-components';

import { Flex } from '../../Flex';
import { StyledInputWrapper } from '../../Input/styled';
import { StyledTextareaWrapper } from '../../Textarea/styled';

interface StyledProps {
  childrenCount?: number;
}

const SharedGroupStyles = css`
  display: grid;
  grid-gap: ${({ theme }) => `${theme.spacing.xSmall} ${theme.spacing.medium}`};
  margin-bottom: ${({ theme }) => theme.spacing.medium};

  ${({ theme }) => theme.breakpoints.tablet} {
    ${StyledInputWrapper},
    ${StyledTextareaWrapper} {
      max-width: ${({ theme }) => theme.helpers.remCalc(416)};
    }
  }

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
    ${({ childrenCount }) =>
      childrenCount === 2 &&
      css`
        grid-template-columns: repeat(2, ${({ theme }) => theme.helpers.remCalc(200)});

        ${StyledError} {
          grid-column: 1 / 3;
        }
      `}

    ${({ childrenCount }) =>
      childrenCount === 3 &&
      css`
        grid-template-columns: repeat(3, ${({ theme }) => theme.helpers.remCalc(128)});

        ${StyledError} {
          grid-column: 1 / 4;
        }
      `}
  }
`;

StyledError.defaultProps = { theme: defaultTheme };
StyledGroup.defaultProps = { theme: defaultTheme };
StyledInlineGroup.defaultProps = { theme: defaultTheme };
