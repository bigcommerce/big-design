// **********************************
// Auto-generated file, do NOT modify
// **********************************
import React from 'react';

import { createStyledIcon, IconProps, PrivateIconProps } from '../base';
import { useUniqueId } from '../utils';

const Icon: React.FC<IconProps & PrivateIconProps> = ({ svgRef, title, theme, ...props }) => {
  const uniqueTitleId = useUniqueId('icon');
  const titleId = title ? props.titleId || uniqueTitleId : undefined;

  return (
    <svg
      width={24}
      height={24}
      viewBox="0 0 24 24"
      stroke="currentColor"
      fill="currentColor"
      strokeWidth="0"
      ref={svgRef}
      aria-labelledby={titleId}
      {...props}
    >
      {title ? <title id={titleId}>{title}</title> : null}
      <path fill="none" d="M0 0h24v24H0V0z" />
      <path d="M11 5v11.17l-4.88-4.88c-.39-.39-1.03-.39-1.42 0a.996.996 0 000 1.41l6.59 6.59c.39.39 1.02.39 1.41 0l6.59-6.59a.996.996 0 10-1.41-1.41L13 16.17V5c0-.55-.45-1-1-1s-1 .45-1 1z" />
    </svg>
  );
};

const IconWithForwardedRef = React.forwardRef<SVGSVGElement, IconProps>((iconProps, ref) => (
  <Icon {...iconProps} svgRef={ref} />
));

export const ArrowDownwardIcon = React.memo(createStyledIcon(IconWithForwardedRef as React.FC<IconProps>));

ArrowDownwardIcon.displayName = 'ArrowDownwardIcon';
