import styled from 'styled-components';

import { defaultTheme } from '../../../theme';

import { LabelStyles } from './styles';

export const Label = styled.label`
  ${({ theme }) => theme.FormFieldLabel || LabelStyles};
`;

Label.defaultProps = { theme: defaultTheme };
