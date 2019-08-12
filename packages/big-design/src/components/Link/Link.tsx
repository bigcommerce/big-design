import React, { Ref } from 'react';

import { MarginProps } from '../../mixins';

import { StyledLink } from './styled';

export type LinkProps = React.AnchorHTMLAttributes<HTMLAnchorElement> & MarginProps;

interface PrivateProps {
  forwardedRef: Ref<HTMLAnchorElement>;
}

const StyleableLink: React.FunctionComponent<LinkProps & PrivateProps> = props => <StyledLink {...props} />;

export const Link = React.forwardRef<HTMLAnchorElement, LinkProps>(({ style, ...props }, ref) => (
  <StyleableLink {...props} forwardedRef={ref} />
));
