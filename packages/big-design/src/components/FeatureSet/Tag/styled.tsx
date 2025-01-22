import { theme as defaultTheme } from '@bigcommerce/big-design-theme';
import styled from 'styled-components';

export const StyledLi = styled.li.attrs({ theme: defaultTheme })`
  align-items: center;
  background-color: ${({ theme }) => theme.colors.secondary20};
  border-radius: ${({ theme }) => theme.borderRadius.normal};
  display: inline-flex;
  color: ${({ theme }) => theme.colors.secondary60};
  flex-wrap: nowrap;
  gap: ${({ theme }) => theme.spacing.xxSmall};
  justify-content: center;
  padding-block: ${({ theme }) => theme.helpers.remCalc(2)};
  padding-inline: ${({ theme }) => theme.spacing.xSmall};

  & > svg {
    height: ${({ theme }) => theme.spacing.medium};
    flex-shrink: 0;
    width: ${({ theme }) => theme.spacing.medium};
  }
`;
