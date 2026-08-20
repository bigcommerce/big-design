import { type LinkProps, default as NLink } from 'next/link';
import React from 'react';
import styled from 'styled-components';

interface Props {
  children?: React.ReactNode;
  href: LinkProps['href'];
  as?: string;
}

// Mirrors BigDesign's Link styling. next/link's Link always renders its own <a>, and
// BigDesign's Link doesn't expose an `as` prop to swap next/link in without nesting two
// anchors, so the (small) visual styling is duplicated here instead.
const StyledLink = styled(NLink)`
  color: ${({ theme }) => theme.colors.primary};
  cursor: pointer;
  font-size: ${({ theme }) => theme.typography.fontSize.medium};
  font-weight: ${({ theme }) => theme.typography.fontWeight.regular};
  text-decoration: none;

  &:active {
    color: ${({ theme }) => theme.colors.primary70};
  }

  &:hover:not(:active) {
    color: ${({ theme }) => theme.colors.primary70};
  }
`;

export const NextLink: React.FC<Props> = ({ children, href }) => (
  <StyledLink href={href}>{children}</StyledLink>
);
