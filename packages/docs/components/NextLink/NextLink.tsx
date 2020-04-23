import { Link } from '@bigcommerce/big-design';
import { default as NLink } from 'next/link';
import React from 'react';

function getLinkAs(as = '') {
  const prefix = process.env.URL_PREFIX || '';

  return prefix + as;
}

export const NextLink: React.FC<{ href: string; as?: string }> = (props) => {
  const { as, children, href } = props;

  return (
    <NLink href={href} as={getLinkAs(as)}>
      {typeof children === 'string' ? <Link href={isHash(href) ? href : ''}>{children}</Link> : children}
    </NLink>
  );
};

function isHash(href: string) {
  return href && href.charAt(0) === '#';
}
