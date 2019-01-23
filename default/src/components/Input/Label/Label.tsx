import styled from 'styled-components';

import { defaultTheme } from '../../../theme';

import { LabelStyles } from './styles';

export const Label = styled.label`
  ${LabelStyles};
`;

Label.defaultProps = { theme: defaultTheme };
