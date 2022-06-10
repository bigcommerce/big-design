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

export const NextLink: React.FC<{ href: LinkProps['href']; as?: string }> = (props) => {
  const { as, children, href } = props;

  return (
    <NLink as={getLinkAs(as)} href={href} passHref={true}>
      {typeof children === 'string' ? <Link>{children}</Link> : children}
    </NLink>
  );
};
