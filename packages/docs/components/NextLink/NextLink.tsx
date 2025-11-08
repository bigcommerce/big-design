import { Link } from '@bigcommerce/big-design';
import { LinkProps, default as NLink } from 'next/link';
import React from 'react';

interface Props {
  children?: React.ReactNode;
  href: LinkProps['href'];
  as?: string;
}

export const NextLink: React.FC<Props> = (props) => {
  const { children, href } = props;

  return (
    // eslint-disable-next-line @typescript-eslint/no-deprecated
    <NLink href={href} legacyBehavior passHref>
      <Link>{children}</Link>
    </NLink>
  );
};
