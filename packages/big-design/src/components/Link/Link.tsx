import { OpenInNewIcon } from '@bigcommerce/big-design-icons';
import React, { memo, Ref } from 'react';

import { MarginProps } from '../../mixins';

import { StyledLink } from './styled';

export interface LinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement>, MarginProps {
  ellipsis?: boolean;
  external?: boolean;
}

interface PrivateProps {
  forwardedRef: Ref<HTMLAnchorElement>;
  isExternal?: boolean;
}

const StyleableLink: React.FC<LinkProps & PrivateProps> = memo(props => <StyledLink {...props} />);

export const Link = React.forwardRef<HTMLAnchorElement, LinkProps>(({ children, external, ...props }, ref) => {
  const isExternal = external && props.target === '_blank';

  return (
    <StyleableLink {...props} isExternal={isExternal} forwardedRef={ref}>
      {isExternal ? <span>{children}</span> : children}
      {isExternal && <OpenInNewIcon size="medium" />}
    </StyleableLink>
  );
});

Link.displayName = 'Link';
