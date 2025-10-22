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
    // @ts-expect-error - BigCommerce Link doesn't type the polymorphic 'as' prop from styled-components
    // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
    <Link as={NLink} href={href as string}>
      {children}
    </Link>
  );
};
