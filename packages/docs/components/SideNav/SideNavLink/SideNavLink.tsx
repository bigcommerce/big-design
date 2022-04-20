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

export const SideNavLink: React.FC<{ children?: React.ReactNode; href: string; as?: string }> = (props) => (
  <List.Item>
    <NextLink href={props.href} as={props.as}>
      <StyledLink href="">{props.children}</StyledLink>
    </NextLink>
  </List.Item>
);
