import NextLink from 'next/link';
import React from 'react';
import styled from 'styled-components';

import { List } from '../../';

interface Props {
  children?: React.ReactNode;
  href: string;
  target?: string;
}

// Mirrors BigDesign's Link styling. next/link's Link always renders its own <a>, and
// BigDesign's Link doesn't expose an `as` prop to swap next/link in without nesting two
// anchors, so the (small) visual styling is duplicated here instead.
const StyledLink = styled(NextLink)`
  color: ${({ theme }) => theme.colors.primary};
  cursor: pointer;
  display: block;
  font-size: ${({ theme }) => theme.typography.fontSize.medium};
  font-weight: ${({ theme }) => theme.typography.fontWeight.regular};
  line-height: ${({ theme }) => theme.lineHeight.large};
  text-decoration: none;

  &:active {
    color: ${({ theme }) => theme.colors.primary70};
  }

  &:hover:not(:active) {
    color: ${({ theme }) => theme.colors.primary70};
  }

  ${({ theme }) => theme.breakpoints.tablet} {
    display: inline-block;
    line-height: ${({ theme }) => theme.lineHeight.medium};
  }
`;

export const SideNavLink: React.FC<Props> = ({ children, href, target }) => (
  <List.Item>
    <StyledLink href={href} target={target}>
      {children}
    </StyledLink>
  </List.Item>
);
