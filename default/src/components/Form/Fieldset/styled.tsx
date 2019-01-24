import styled, { css } from 'styled-components';

import { defaultTheme } from '../../../theme';
import { Small } from '../../Text';
import { H3Styles } from '../../Text/styled';

interface LegendProps {
  hasDescription: boolean;
}

export const StyledFieldset = styled.fieldset`
  border: none;
  margin: 0 0 ${({ theme }) => theme.spacing.xLarge};
  padding: 0;

  &:last-child {
    margin: 0;
  }
`;

// TODO: Fix this using component selector and remove props and style
export const StyledFieldsetLegend = styled.legend<LegendProps>`
  ${H3Styles};

  ${props =>
    props.hasDescription &&
    css`
      margin: 0;
    `};
`;

export const StyledFieldsetDescription = styled(Small)``;

StyledFieldset.defaultProps = { theme: defaultTheme };
StyledFieldsetLegend.defaultProps = { theme: defaultTheme };
StyledFieldsetDescription.defaultProps = { theme: defaultTheme };
