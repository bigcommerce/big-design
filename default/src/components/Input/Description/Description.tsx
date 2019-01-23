import styled from 'styled-components';

import { defaultTheme } from '../../../theme';
import { Small } from '../../Text';

import { DescriptionStyles } from './styles';

export const Description = styled(Small)`
  ${DescriptionStyles};
`;

Description.defaultProps = { theme: defaultTheme };
