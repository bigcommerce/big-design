import styled, { css } from 'styled-components';

import { ListProps } from './List';

const SharedListStyles = css`
  color: ${({ theme }) => theme.colors.secondary70};
  font-size: ${({ theme }) => theme.typography.fontSize.medium};
  font-weight: ${({ theme }) => theme.typography.fontWeight.regular};
  line-height: ${({ theme }) => theme.lineHeight.medium};
  padding-left: ${({ theme }) => theme.spacing.xLarge};
`;

export const StyledOrderedList = styled.ol<ListProps>`
  ${SharedListStyles};
  list-style-type: ${({ bulleted }) => `${bulleted ? 'decimal' : 'none'}`};
`;

export const StyledUnorderedList = styled.ul<ListProps>`
  ${SharedListStyles}
  list-style-type: ${({ bulleted }) => `${bulleted ? 'disc' : 'none'}`}
`;
