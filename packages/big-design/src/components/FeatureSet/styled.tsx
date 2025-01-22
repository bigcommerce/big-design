import { theme as defaultTheme } from '@bigcommerce/big-design-theme';
import styled from 'styled-components';

import { withMargins } from '../../helpers';

export const StyledUl = styled.ul.attrs({ theme: defaultTheme })`
  ${({ theme }) => theme.helpers.listReset}

  ${withMargins()};

  display: inline-flex;
  flex-wrap: wrap;
  gap: ${({ theme }) => theme.spacing.small};
`;
