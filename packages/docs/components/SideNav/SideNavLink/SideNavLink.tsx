import { Link } from '@bigcommerce/big-design';
import React from 'react';
import styled from 'styled-components';

import { List, NextLink } from '../../';

export const StyledLink = styled(Link)`
  display: block;
  line-height: ${({ theme }) => theme.lineHeight.large};

  ${({ theme }) => theme.breakpoints.tablet} {
    display: inline-block;
    line-height: ${({ theme }) => theme.lineHeight.medium};
  }
`;

export const SideNavLink: React.FC<{ href: string; as?: string }> = (props) => {
  const { as, href, children } = props;

  return (
    <List.Item>
      <NextLink as={as} href={href}>
        <StyledLink href="">{children}</StyledLink>
      </NextLink>
    </List.Item>
  );
};
