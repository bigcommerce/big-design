import styled from 'styled-components';

import { defaultTheme } from '../../../theme';
import { Small } from '../../Text';

import { ErrorStyles } from './styles';

export interface ErrorProps {
  error?: string;
}

export const Error = styled(Small)<ErrorProps>`
  ${ErrorStyles};
`;

Error.defaultProps = { theme: defaultTheme };
