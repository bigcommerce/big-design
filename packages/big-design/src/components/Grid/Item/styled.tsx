import styled from 'styled-components';

import { Box } from '../../Box';

import { GridItemProps } from './Item';

export const StyledGridItem = styled(Box)<GridItemProps>`
  grid-area: ${props => props.area};
  grid-column-end: ${props => props.columnEnd};
  grid-column-start: ${props => props.columnStart};
  grid-column: ${props => props.column};
  grid-row-end: ${props => props.rowEnd};
  grid-row-start: ${props => props.rowStart};
  grid-row: ${props => props.row};
`;
