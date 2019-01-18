// Auto-generated file, don't modify
import React from 'react';

import { IconWrapper } from './IconWrapper';

interface Props extends React.SVGProps<SVGSVGElement> {
  title?: string;
}

export const SvgLoadingIcon = ({ title, ...props }: Props) => (
  <svg width={16} height={16} viewBox="0 0 16 16" fill="currentColor" {...props}>
    <title>{title}</title>
    <path d="M16 8a8 8 0 1 0-8 8v-2.29A5.709 5.709 0 1 1 13.71 8H16z" />
  </svg>
);

const LoadingIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <IconWrapper width={props.width} height={props.height}>
    <SvgLoadingIcon {...props} />
  </IconWrapper>
);

export default LoadingIcon;
