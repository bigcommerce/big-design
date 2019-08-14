import { Flex } from '@bigcommerce/big-design';
import Link from 'next/link';
import React from 'react';

import { StyledLogo } from './styled';

export const SideNavLogo: React.FC = () => (
  <Flex.Item>
    <Link href="/GettingStarted/GettingStartedPage" as="/">
      <StyledLogo>
        <img src={`${process.env.URL_PREFIX}/static/logo-with-text.svg`} alt="BigDesign Logo" />
      </StyledLogo>
    </Link>
  </Flex.Item>
);
