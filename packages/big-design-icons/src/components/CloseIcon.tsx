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
      <path d="M18.3 5.71a.996.996 0 00-1.41 0L12 10.59 7.11 5.7A.996.996 0 105.7 7.11L10.59 12 5.7 16.89a.996.996 0 101.41 1.41L12 13.41l4.89 4.89a.996.996 0 101.41-1.41L13.41 12l4.89-4.89c.38-.38.38-1.02 0-1.4z" />
    </svg>
  );
};

const IconWithForwardedRef = forwardRef<SVGSVGElement, IconProps>((iconProps, ref) => (
  <Icon aria-hidden={iconProps.title ? undefined : true} {...iconProps} svgRef={ref} />
));

export const CloseIcon = memo(createStyledIcon(IconWithForwardedRef as React.FC<IconProps>));

CloseIcon.displayName = 'CloseIcon';
