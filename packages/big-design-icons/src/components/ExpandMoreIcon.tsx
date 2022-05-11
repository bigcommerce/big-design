// **********************************
// Auto-generated file, do NOT modify
// **********************************
import React, { forwardRef, memo } from 'react';

import { createStyledIcon, IconProps, PrivateIconProps } from '../base';
import { useUniqueId } from '../utils';

const Icon: React.FC<IconProps & PrivateIconProps> = ({ svgRef, title, theme, ...props }) => {
  const uniqueTitleId = useUniqueId('icon');
  const titleId = title ? props.titleId || uniqueTitleId : undefined;
  const ariaHidden = titleId ? undefined : true;

  return (
    <svg
      aria-hidden={ariaHidden}
      aria-labelledby={titleId}
      fill="currentColor"
      height={24}
      ref={svgRef}
      stroke="currentColor"
      strokeWidth="0"
      viewBox="0 0 24 24"
      width={24}
      {...props}
    >
      {title ? <title id={titleId}>{title}</title> : null}
      <path d="M24 24H0V0h24v24z" fill="none" opacity={0.87} />
      <path d="M15.88 9.29L12 13.17 8.12 9.29a.996.996 0 10-1.41 1.41l4.59 4.59c.39.39 1.02.39 1.41 0l4.59-4.59a.996.996 0 000-1.41c-.39-.38-1.03-.39-1.42 0z" />
    </svg>
  );
};

const IconWithForwardedRef = forwardRef<SVGSVGElement, IconProps>((iconProps, ref) => (
  <Icon {...iconProps} svgRef={ref} />
));

export const ExpandMoreIcon = memo(createStyledIcon(IconWithForwardedRef));

ExpandMoreIcon.displayName = 'ExpandMoreIcon';
