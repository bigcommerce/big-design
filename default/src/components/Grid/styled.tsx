import styled from 'styled-components';

import { GridProps } from './Grid';

export const StyledGrid = styled.div<GridProps>`
  display: grid;

  grid-auto-flow: ${props => props.autoFlow};
  grid-gap: ${props => props.gap};
  grid-template: ${props => props.template};
  grid-template-areas: ${props => props.areas};
  grid-template-columns: ${props => props.columns};
  grid-template-rows: ${props => props.rows};
  grid-auto-columns: ${props => props.autoColumns};
  grid-auto-rows: ${props => props.autoRows};
`;
