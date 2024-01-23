import { OpenInNewIcon } from '@bigcommerce/big-design-icons';
import React, { AnchorHTMLAttributes, forwardRef, memo, Ref } from 'react';

import { MarginProps } from '../../mixins';
import { withTransients } from '../../utils/withTransients';

import { StyledLink } from './styled';

export interface LinkProps extends AnchorHTMLAttributes<HTMLAnchorElement>, MarginProps {
  children?: React.ReactNode;
  ellipsis?: boolean;
  external?: boolean;
}

interface PrivateProps {
  forwardedRef: Ref<HTMLAnchorElement>;
  external?: boolean;
}

const StyleableLink: React.FC<LinkProps & PrivateProps> = memo(({ forwardedRef, ...props }) => (
  <StyledLink ref={forwardedRef} {...withTransients(props)} />
));

export const Link = forwardRef<HTMLAnchorElement, LinkProps>(({ children, ...props }, ref) => {
  const isExternal = props.external && props.target === '_blank';

  return (
    <StyleableLink {...props} forwardedRef={ref}>
      {isExternal ? <span>{children}</span> : children}
      {isExternal && <OpenInNewIcon size="medium" />}
    </StyleableLink>
  );
});

Link.displayName = 'Link';
