import { hideVisually } from 'polished';
import styled, { css } from 'styled-components';

import { defaultTheme, remCalc } from './../../theme';

interface StyledList {
  isOpen?: boolean;
  maxHeight?: number;
}

export const StyledList = styled.ul<StyledList>`
  ${props => !props.isOpen && hideVisually()}

  ${props =>
    props.isOpen &&
    css`
      ${({ theme }) => theme.elevation.raised};

      background-color: ${({ theme }) => theme.colors.white};
      color: ${({ theme }) => theme.colors.secondary70};
      display: inline-block;
      margin: 0;
      max-height: ${props.maxHeight ? remCalc(props.maxHeight) : ''};
      outline: none;
      overflow-y: scroll;
      padding: ${({ theme }) => theme.spacing.xSmall} 0;
    `}
`;

StyledList.defaultProps = { theme: defaultTheme };
