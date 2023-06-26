import { OpenInNewIcon } from '@bigcommerce/big-design-icons';
import React, { AnchorHTMLAttributes, forwardRef, memo, Ref } from 'react';

import { MarginProps } from '../../mixins';

import { StyledBreadcrumb } from './styled';

export interface BreadcrumbProps extends AnchorHTMLAttributes<HTMLAnchorElement>, MarginProps {
  children?: React.ReactNode;
  ellipsis?: boolean;
  external?: boolean;
}

interface PrivateProps {
  forwardedRef: Ref<HTMLAnchorElement>;
  isExternal?: boolean;
}

const StyleableLink: React.FC<BreadcrumbProps & PrivateProps> = memo((props) => (
  <StyledBreadcrumb {...props} />
));

export const Breadcrumb = forwardRef<HTMLAnchorElement, BreadcrumbProps>(
  ({ children, external, ...props }, ref) => {
    const isExternal = external && props.target === '_blank';

    return (
      <StyleableLink {...props} forwardedRef={ref} isExternal={isExternal}>
        {isExternal ? <span>{children}</span> : children}
        {isExternal && <OpenInNewIcon size="medium" />}
      </StyleableLink>
    );
  },
);

Breadcrumb.displayName = 'Breadcrumb';
