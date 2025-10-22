import { Link } from '@bigcommerce/big-design';
import NextLink from 'next/link';
import React from 'react';
import styled from 'styled-components';

import { List } from '../../';

interface Props {
  readonly children?: React.ReactNode;
  readonly href: string;
  readonly target?: string;
}

const StyledLink = styled(Link)`
  display: block;
  line-height: ${({ theme }) => theme.lineHeight.large};

  ${({ theme }) => theme.breakpoints.tablet} {
    display: inline-block;
    line-height: ${({ theme }) => theme.lineHeight.medium};
  }
`;

export const SideNavLink: React.FC<Props> = ({ children, href, target }) => (
  <List.Item>
    <StyledLink as={NextLink} href={href} target={target}>
      {children}
    </StyledLink>
  </List.Item>
);
