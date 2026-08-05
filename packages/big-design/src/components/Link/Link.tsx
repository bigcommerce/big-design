import { OpenInNewIcon } from '@bigcommerce/big-design-icons';
import React, { ComponentPropsWithoutRef, forwardRef, memo, Ref } from 'react';

import { MarginProps } from '../../helpers';
import { toTransientMarginProps } from '../../helpers/margins/margins';

import { StyledLink } from './styled';

export interface LinkProps extends ComponentPropsWithoutRef<'a'>, MarginProps {
  children?: React.ReactNode;
  ellipsis?: boolean;
  external?: boolean;
}

interface PrivateProps {
  forwardedRef: Ref<HTMLAnchorElement>;
  isExternal?: boolean;
}

const StyleableLink: React.FC<LinkProps & PrivateProps> = memo((props) => {
  const {
    ellipsis,
    isExternal,
    margin,
    marginTop,
    marginRight,
    marginBottom,
    marginLeft,
    marginVertical,
    marginHorizontal,
    ...domProps
  } = props;

  return (
    <StyledLink
      {...domProps}
      {...toTransientMarginProps(props)}
      $ellipsis={ellipsis}
      $isExternal={isExternal}
    />
  );
});

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
