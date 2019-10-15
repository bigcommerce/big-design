import { theme as defaultTheme } from '@bigcommerce/big-design-theme';
import styled from 'styled-components';

import { HeadProps } from './Head';

export const StyledTableHead = styled.thead<HeadProps>``;

StyledTableHead.defaultProps = { theme: defaultTheme };
