import { Link } from '@bigcommerce/big-design';
import NextLink from 'next/link';
import React from 'react';
import styled from 'styled-components';

import { List } from '../../';

interface Props {
  children?: React.ReactNode;
  href: string;
  target?: string;
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
    {/* eslint-disable-next-line @typescript-eslint/no-deprecated */}
    <NextLink href={href} legacyBehavior passHref target={target}>
      <StyledLink href="">{children}</StyledLink>
    </NextLink>
  </List.Item>
);
