import { rem } from 'polished';
import styled, { css } from 'styled-components';

import { defaultTheme } from '../../../theme';
import { StyledInputWrapper } from '../../Input/styled';
import { StyledTextareaWrapper } from '../../Textarea/styled';

interface StyledRowProps {
  childrenCount: number;
}

export const StyledRow = styled.div<StyledRowProps>`
  margin-bottom: ${({ theme }) => theme.spacing.medium};

  ${({ theme }) => theme.breakpoints.tablet} {
    display: grid;
    grid-gap: ${({ theme }) => theme.spacing.medium};

    ${({ childrenCount }) =>
      childrenCount === 2 &&
      css`
        grid-template-columns: repeat(2, ${rem(200)});
      `}

    ${({ childrenCount }) =>
      childrenCount === 3 &&
      css`
        grid-template-columns: repeat(3, ${rem(128)});
      `}

    ${StyledInputWrapper},
    ${StyledTextareaWrapper} {
      max-width: ${rem(416)};
    }
  }

  &:last-child {
    margin: 0;
  }
`;

StyledRow.defaultProps = { theme: defaultTheme };
