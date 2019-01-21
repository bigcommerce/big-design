import styled from 'styled-components';

import { defaultTheme } from '../../../theme';
import { Text } from '../../Text';

import { DescriptionStyles } from './styles';

export const Description = styled(Text)`
  ${({ theme }) => theme.FormFieldDescription || DescriptionStyles};
`;

Description.defaultProps = { theme: defaultTheme };
