import styled, { css } from 'styled-components';

import { defaultTheme, remCalc } from '../../../theme';
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
        grid-template-columns: repeat(2, ${remCalc(200)});
      `}

    ${({ childrenCount }) =>
      childrenCount === 3 &&
      css`
        grid-template-columns: repeat(3, ${remCalc(128)});
      `}

    ${StyledInputWrapper},
    ${StyledTextareaWrapper} {
      max-width: ${remCalc(416)};
    }
  }

  &:last-child {
    margin: 0;
  }
`;

StyledRow.defaultProps = { theme: defaultTheme };
