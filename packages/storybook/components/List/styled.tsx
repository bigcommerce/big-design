import { defaultTheme } from '@bigcommerce/big-design';
import styled, { css } from 'styled-components';

import { ListProps } from './List';

const SharedListStyles = css`
  color: ${defaultTheme.colors.secondary70}
  padding-left: ${defaultTheme.spacing.xLarge}
  font-size: ${defaultTheme.typography.fontSize.medium};
  font-weight: ${defaultTheme.typography.fontWeight.regular};
  line-height: ${defaultTheme.lineHeight.medium};
`;

export const StyledOrderedList = styled.ol<ListProps>`
  ${SharedListStyles}
  list-style-type: ${({ bulleted }) => `${bulleted ? 'decimal' : 'none'}`}
`;
export const StyledUnorderedList = styled.ul<ListProps>`
  ${SharedListStyles}
  list-style-type: ${({ bulleted }) => `${bulleted ? 'disc' : 'none'}`}
`;

StyledOrderedList.defaultProps = { theme: defaultTheme };
StyledUnorderedList.defaultProps = { theme: defaultTheme };
