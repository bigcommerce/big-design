import { withDefaultTheme } from '@bigcommerce/big-design-theme';
import styled from 'styled-components';

import { Link } from '../../Link';

export const StyledLink = styled(Link).attrs(withDefaultTheme)`
  font-size: ${({ theme }) => theme.typography.fontSize.small};
`;
