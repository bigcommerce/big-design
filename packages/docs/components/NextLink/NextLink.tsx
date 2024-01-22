import { Link } from '@bigcommerce/big-design';
import { LinkProps, default as NLink } from 'next/link';
import React from 'react';

function getLinkAs(as = '') {
  if (!as) {
    return undefined;
  }

  const prefix = process.env.URL_PREFIX || '';

  return prefix + as;
}

interface Props {
  children?: React.ReactNode;
  href: LinkProps['href'];
  as?: string;
}

export const NextLink: React.FC<Props> = (props) => {
  const { as, children, href } = props;

  return (
    <NLink as={getLinkAs(as)} href={href} legacyBehavior={true} passHref={true}>
      {typeof children === 'string' ? <Link>{children}</Link> : children}
    </NLink>
  );
};
