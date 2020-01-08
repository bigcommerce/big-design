import { theme as defaultTheme } from '@bigcommerce/big-design-theme';
import styled, { DefaultTheme, StyledComponent } from 'styled-components';

import { StyleableH3, StyleableSmall } from '../Typography/private';

export const StyledFieldset = styled.fieldset`
  border: none;
  margin: 0 0 ${({ theme }) => theme.spacing.xLarge};
  padding: 0;

  &:last-child {
    margin: 0;
  }
`;

export const StyledFieldsetDescription = styled(StyleableSmall)``;

export const StyledFieldsetLegend = styled(StyleableH3).attrs({ as: 'legend' })`
  &:not(:last-child) {
    margin-bottom: ${({ theme }) => theme.spacing.xxSmall};
  }
` as StyledComponent<'legend', DefaultTheme>;

StyledFieldset.defaultProps = { theme: defaultTheme };
StyledFieldsetLegend.defaultProps = { theme: defaultTheme };
StyledFieldsetDescription.defaultProps = { theme: defaultTheme };
