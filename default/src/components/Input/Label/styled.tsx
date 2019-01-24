import styled from 'styled-components';

import { defaultTheme } from '../../../theme';
import { H4Styles } from '../../Text/styled';

export const StyledLabel = styled.label`
  ${H4Styles};

  display: inline-block;
  margin-bottom: ${({ theme }) => theme.spacing.xxSmall};
`;

StyledLabel.defaultProps = { theme: defaultTheme };
