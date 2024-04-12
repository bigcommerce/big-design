import { Small } from '@bigcommerce/big-design';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

import Logo from '../../../public/logo-with-text.svg';

import { StyledLogo } from './styled';

export const SideNavLogo: React.FC = () => (
  <Link href="/" style={{ textDecoration: 'none' }}>
    <StyledLogo>
      <Image alt="BigDesign Logo" priority quality={100} src={Logo} />
      <Small>v{process.env.BD_VERSION}</Small>
    </StyledLogo>
  </Link>
);
