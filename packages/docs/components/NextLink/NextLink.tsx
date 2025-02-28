import { Link } from '@bigcommerce/big-design';
import { LinkProps, default as NLink } from 'next/link';
import React from 'react';

interface Props {
  readonly children?: React.ReactNode;
  readonly href: LinkProps['href'];
  readonly as?: string;
}

export const NextLink: React.FC<Props> = (props) => {
  const { children, href } = props;

  return (
    <NLink href={href} legacyBehavior passHref>
      <Link>{children}</Link>
    </NLink>
  );
};
