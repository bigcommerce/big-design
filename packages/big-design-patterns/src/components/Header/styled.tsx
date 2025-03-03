import { Flex } from '@bigcommerce/big-design';
import { theme as defaultTheme } from '@bigcommerce/big-design-theme';
import styled from 'styled-components';

export const StyledBackLink = styled.a.attrs({ theme: defaultTheme })`
  color: ${({ theme }) => theme.colors.secondary50};
  display: inline-flex;
  font-size: ${({ theme }) => theme.typography.fontSize.medium};
  font-weight: ${({ theme }) => theme.typography.fontWeight.regular};
  gap: ${({ theme }) => theme.spacing.xxSmall};
  line-height: ${({ theme }) => theme.lineHeight.medium};
  padding-inline-end: ${({ theme }) => theme.spacing.xxSmall};
  padding-block: ${({ theme }) => theme.spacing.xxSmall};
  text-decoration: none;

  &:hover {
    color: ${({ theme }) => theme.colors.primary};
  }

  &:focus {
    outline: 4px solid ${({ theme }) => theme.colors.primary20};
  }
`;

export const StyledActionsWrapper = styled(Flex).attrs({ theme: defaultTheme })`
  & > .bd-button + .bd-button {
    margin-block-start ${({ theme }) => theme.spacing.none};
    margin-inline-start: ${({ theme }) => theme.spacing.none};
  }
`;
