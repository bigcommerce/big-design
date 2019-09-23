import { theme as defaultTheme } from '@bigcommerce/big-design-theme';
import styled from 'styled-components';

import { TableHeadProps } from './Head';

export const StyledTableHead = styled.thead<TableHeadProps>``;

StyledTableHead.defaultProps = { theme: defaultTheme };
