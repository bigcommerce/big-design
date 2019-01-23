import styled from 'styled-components';

import { defaultTheme } from '../../theme';

import { FlexStyles } from './styles';

export interface FlexProps {
  alignItems?: 'normal' | 'stretch' | 'center' | 'flex-start' | 'flex-end' | 'baseline';
  flexDirection?: 'row' | 'column' | 'row-reverse' | 'column-reverse';
  justifyContent?:
    | 'center'
    | 'flex-start'
    | 'flex-end'
    | 'left'
    | 'right'
    | 'normal'
    | 'space-between'
    | 'space-around'
    | 'space-evenly'
    | 'stretch';
}

export const Flex = styled.div<FlexProps>`
  ${FlexStyles};
`;

Flex.defaultProps = {
  alignItems: 'stretch',
  flexDirection: 'row',
  justifyContent: 'flex-start',
  theme: defaultTheme,
};
