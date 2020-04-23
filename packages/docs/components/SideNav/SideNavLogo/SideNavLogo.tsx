import Link from 'next/link';
import React from 'react';

import { StyledLogo } from './styled';

export const SideNavLogo: React.FC = () => (
  <Link href="/GettingStarted/GettingStartedPage" as="/">
    <StyledLogo>
      <img src={`${process.env.URL_PREFIX}/logo-with-text.svg`} alt="BigDesign Logo" />
    </StyledLogo>
  </Link>
);
