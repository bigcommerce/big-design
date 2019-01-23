import styled from 'styled-components';

import { defaultTheme } from '../../theme';

import { PanelStyles } from './styles';

export const Panel = styled.section`
  ${PanelStyles};
`;

Panel.defaultProps = { theme: defaultTheme };
