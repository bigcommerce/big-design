// **********************************
// Auto-generated file, do NOT modify
// **********************************
import React, { forwardRef, memo } from 'react';

import { createStyledIcon, IconProps, PrivateIconProps } from '../base';
import { useUniqueId } from '../utils';

const Icon: React.FC<IconProps & PrivateIconProps> = ({ svgRef, title, theme, ...props }) => {
  const uniqueTitleId = useUniqueId('icon');
  const titleId = title ? props.titleId || uniqueTitleId : undefined;

  return (
    <svg
      height={24}
      viewBox="0 0 24 24"
      width={24}
      stroke="currentColor"
      fill="currentColor"
      strokeWidth="0"
      ref={svgRef}
      aria-labelledby={titleId}
      {...props}
    >
      {title ? <title id={titleId}>{title}</title> : null}
      <path d="M0 0h24v24H0V0z" fill="none" />
      <path d="M8.7 15.9L4.8 12l3.9-3.9a.984.984 0 000-1.4.984.984 0 00-1.4 0l-4.59 4.59a.996.996 0 000 1.41l4.59 4.6c.39.39 1.01.39 1.4 0a.984.984 0 000-1.4zm6.6 0l3.9-3.9-3.9-3.9a.984.984 0 010-1.4.984.984 0 011.4 0l4.59 4.59c.39.39.39 1.02 0 1.41l-4.59 4.6a.984.984 0 01-1.4 0 .984.984 0 010-1.4z" />
    </svg>
  );
};

const IconWithForwardedRef = forwardRef<SVGSVGElement, IconProps>((iconProps, ref) => (
  <Icon {...iconProps} svgRef={ref} />
));

export const CodeIcon = memo(createStyledIcon(IconWithForwardedRef as React.FC<IconProps>));

CodeIcon.displayName = 'CodeIcon';
