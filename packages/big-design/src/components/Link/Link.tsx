import { OpenInNewIcon } from '@bigcommerce/big-design-icons';
import React, { ComponentPropsWithoutRef, forwardRef, memo, Ref } from 'react';

import { MarginProps } from '../../helpers';

import { StyledLink } from './styled';

export interface LinkProps extends ComponentPropsWithoutRef<'a'>, MarginProps {
  readonly children?: React.ReactNode;
  readonly ellipsis?: boolean;
  readonly external?: boolean;
}

interface PrivateProps {
  forwardedRef: Ref<HTMLAnchorElement>;
  isExternal?: boolean;
}

const StyleableLink: React.FC<LinkProps & PrivateProps> = memo((props) => (
  <StyledLink {...props} />
));

export const Link = forwardRef<HTMLAnchorElement, LinkProps>(
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

Link.displayName = 'Link';
