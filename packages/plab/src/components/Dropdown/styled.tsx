import { rem } from 'polished';
import styled from 'styled-components';

import { defaultTheme } from '../../theme';

import { DropdownProps } from './Dropdown';
import { DropdownItem } from './Item/Item';

export const StyledDropdown = styled.ul<DropdownProps<DropdownItem>>`
  ${({ theme }) => theme.elevation.raised};

  background-color: ${({ theme }) => theme.colors.white};
  color: ${({ theme }) => theme.colors.secondary70};
  display: inline-block;
  margin: 0;
  max-height: ${props => (props.maxHeight ? rem(props.maxHeight) : 'none')};
  overflow-y: scroll;
  padding: ${({ theme }) => theme.spacing.xSmall} 0;
`;

StyledDropdown.defaultProps = { theme: defaultTheme };
