import styled from 'styled-components';

import { defaultTheme } from '../../../theme';

import { FormActionsStyles } from './styles';

export const Actions = styled.div`
  ${FormActionsStyles};
`;

Actions.defaultProps = { theme: defaultTheme };
