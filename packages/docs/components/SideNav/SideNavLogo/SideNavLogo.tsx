import { Small } from '@bigcommerce/big-design';
import Link from 'next/link';
import React from 'react';

import { StyledLogo } from './styled';

export const SideNavLogo: React.FC = () => (
  <Link href="/">
    <StyledLogo>
      {/* eslint-disable-next-line @typescript-eslint/restrict-template-expressions */ ''}
      <img alt="BigDesign Logo" src={`${process.env.URL_PREFIX}/logo-with-text.svg`} />
      <Small>v{process.env.BD_VERSION}</Small>
    </StyledLogo>
  </Link>
);
