import { OpenInNewIcon } from '@bigcommerce/big-design-icons';
import React, { AnchorHTMLAttributes, forwardRef, memo, Ref } from 'react';

import { MarginProps } from '../../mixins';

import { StyledLink } from './styled';

export interface LinkProps extends AnchorHTMLAttributes<HTMLAnchorElement>, MarginProps {
  children?: React.ReactNode;
  ellipsis?: boolean;
  external?: boolean;
  breadcrumbItem?: boolean;
}

interface PrivateProps {
  forwardedRef: Ref<HTMLAnchorElement>;
  isExternal?: boolean;
  isbreadcrumbItem?: boolean;
  hasLink?: boolean;
}

const StyleableLink: React.FC<LinkProps & PrivateProps> = memo((props) => (
  <StyledLink {...props} />
));

export const Link = forwardRef<HTMLAnchorElement, LinkProps>(
  ({ breadcrumbItem = false, children, external, ...props }, ref) => {
    const isExternal = external && props.target === '_blank';
    const isbreadcrumbItem = breadcrumbItem;
    const hasLink = Boolean(props.href);

    return (
      <StyleableLink
        {...props}
        forwardedRef={ref}
        hasLink={hasLink}
        isExternal={isExternal}
        isbreadcrumbItem={isbreadcrumbItem}
      >
        {isExternal ? <span>{children}</span> : children}
        {isExternal && <OpenInNewIcon size="medium" />}
      </StyleableLink>
    );
  },
);

Link.displayName = 'Link';
