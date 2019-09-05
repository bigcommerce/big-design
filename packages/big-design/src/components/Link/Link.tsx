import React, { memo, Ref } from 'react';

import { MarginProps } from '../../mixins';

import { StyledLink } from './styled';

export type LinkProps = React.AnchorHTMLAttributes<HTMLAnchorElement> & MarginProps;

interface PrivateProps {
  forwardedRef: Ref<HTMLAnchorElement>;
}

const StyleableLink: React.FC<LinkProps & PrivateProps> = memo(props => <StyledLink {...props} />);

export const Link = React.forwardRef<HTMLAnchorElement, LinkProps>((props, ref) => (
  <StyleableLink {...props} forwardedRef={ref} />
));
