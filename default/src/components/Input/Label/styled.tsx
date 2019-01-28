import styled from 'styled-components';

import { defaultTheme } from '../../../theme';
import { H4 } from '../../Text';

export const StyledLabel = styled(H4).attrs({
  as: 'label',
})<React.LabelHTMLAttributes<HTMLLabelElement>>`
  display: inline-block;
  margin-bottom: ${({ theme }) => theme.spacing.xxSmall};
`;

StyledLabel.defaultProps = { theme: defaultTheme };
