import React, { forwardRef } from 'react';

import { BoxProps } from '../../Box';
import { LinkProps } from '../../Link';

import { StyledBreadcrumbItem } from './styled';

interface PrivateProps {
  forwardedRef: React.Ref<HTMLDivElement>;
}

export type BreadcrumbItemProps = BoxProps & LinkProps;

const RawBreadcrumbItem: React.FC<BreadcrumbItemProps & PrivateProps> = ({
  forwardedRef,
  ...props
}) => <StyledBreadcrumbItem ref={forwardedRef} {...props} />;

export const BreadcrumbItem = forwardRef<HTMLDivElement, BreadcrumbItemProps>((props, ref) => (
  <RawBreadcrumbItem {...props} forwardedRef={ref} />
));
