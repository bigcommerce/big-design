import { theme as defaultTheme } from '@bigcommerce/big-design-theme';
import styled from 'styled-components';

import { withMargins } from '../../helpers';
import { TransientMarginProps } from '../../helpers/margins/margins';

export const StyledUl = styled.ul.attrs({ theme: defaultTheme })<TransientMarginProps>`
  ${({ theme }) => theme.helpers.listReset}

  ${withMargins()};

  display: inline-flex;
  flex-wrap: wrap;
  gap: ${({ theme }) => theme.spacing.small};
`;
