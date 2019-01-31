import styled from 'styled-components';

import { defaultTheme } from '../../../theme';
import { H3, Small } from '../../Typography';

export const StyledFieldset = styled.fieldset`
  border: none;
  margin: 0 0 ${({ theme }) => theme.spacing.xLarge};
  padding: 0;

  &:last-child {
    margin: 0;
  }
`;

export const StyledInfoContainer = styled.div`
  margin-bottom: ${({ theme }) => theme.spacing.medium};
`;

export const StyledFieldsetDescription = styled(Small)``;

export const StyledFieldsetLegend = styled(H3).attrs({
  as: 'legend',
})`
  &:not(:last-child) {
    margin: 0;
  }
`;

StyledFieldset.defaultProps = { theme: defaultTheme };
StyledFieldsetLegend.defaultProps = { theme: defaultTheme };
StyledFieldsetDescription.defaultProps = { theme: defaultTheme };
StyledInfoContainer.defaultProps = { theme: defaultTheme };
