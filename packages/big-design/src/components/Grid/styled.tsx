import styled from 'styled-components';

import { defaultTheme } from '../../theme';
import { Box } from '../Box';

import { GridProps } from './Grid';

export const StyledGrid = styled(Box)<GridProps>`
  display: grid;

  grid-auto-flow: ${props => props.autoFlow};
  grid-gap: ${props => (props.gap === undefined ? props.theme.spacing.medium : props.gap)};
  grid-template: ${props => props.template};
  grid-template-areas: ${props => props.areas};
  grid-template-columns: ${props => props.columns};
  grid-template-rows: ${props => props.rows};
  grid-auto-columns: ${props => props.autoColumns};
  grid-auto-rows: ${props => props.autoRows};
`;

StyledGrid.defaultProps = { theme: defaultTheme };
