// Auto-generated file, don't modify
import React from 'react';

import { IconWrapper } from './IconWrapper';

interface Props extends React.SVGProps<SVGSVGElement> {
  title?: string;
}

export const SvgPlusIcon = ({ title, ...props }: Props) => (
  <svg width={14} height={14} viewBox="0 0 14 14" fill="currentColor" {...props}>
    <title>{title}</title>
    <path d="M13 8H8v5c0 .55-.45 1-1 1s-1-.45-1-1V8H1c-.55 0-1-.45-1-1s.45-1 1-1h5V1c0-.55.45-1 1-1s1 .45 1 1v5h5c.55 0 1 .45 1 1s-.45 1-1 1z" />
  </svg>
);

const PlusIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <IconWrapper width={props.width} height={props.height}>
    <SvgPlusIcon {...props} />
  </IconWrapper>
);

export default PlusIcon;
