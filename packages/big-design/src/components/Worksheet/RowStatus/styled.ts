import { theme as defaultTheme, remCalc } from '@bigcommerce/big-design-theme';
import styled, { css } from 'styled-components';

export const Status = styled.td<{ isSelected?: boolean }>`
  background-color: ${({ theme }) => theme.colors.secondary30};
  box-sizing: border-box;
  padding: 0;
  width: ${remCalc(4)};

  ${({ isSelected }) =>
    isSelected &&
    css`
      background-color: ${({ theme }) => `${theme.colors.primary}`};
    `}
`;

Status.defaultProps = { theme: defaultTheme };
