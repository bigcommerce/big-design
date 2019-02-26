import styled from 'styled-components';

import { defaultTheme } from '../../../theme';

export const StyledFormActions = styled.div`
  margin-top: ${({ theme }) => theme.spacing.xxLarge};
`;

StyledFormActions.defaultProps = { theme: defaultTheme };
