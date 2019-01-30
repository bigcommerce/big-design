import styled from 'styled-components';

import { defaultTheme } from '../../../theme';
import { H4 } from '../../Text';

import { LabelProps } from './Label';

export const StyledLabel = styled(H4).attrs({
  as: 'label',
})<LabelProps>`
  display: inline-block;
  margin-bottom: ${({ theme }) => theme.spacing.xxSmall};
`;

StyledLabel.defaultProps = { theme: defaultTheme };
