import { Small } from '@bigcommerce/big-design';
import Link from 'next/link';
import React from 'react';

import { StyledLogo } from './styled';

export const SideNavLogo: React.FC = () => (
  <Link href="/">
    <StyledLogo>
      <img src={`${process.env.URL_PREFIX}/logo-with-text.svg`} alt="BigDesign Logo" />
      <Small>v{process.env.BD_VERSION}</Small>
    </StyledLogo>
  </Link>
);
