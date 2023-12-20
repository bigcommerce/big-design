// **********************************
// Auto-generated file, do NOT modify
// **********************************
import React, { forwardRef, memo, useId } from 'react';

import { createStyledIcon, IconProps, PrivateIconProps } from '../base';

const Icon: React.FC<IconProps & PrivateIconProps> = ({ svgRef, title, theme, ...props }) => {
  const uniqueTitleId = useId();
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
      <g fill="none">
        <path d="M0 0h24v24H0z" />
        <path d="M0 0h24v24H0z" />
      </g>
      <path d="M18.29 17.29a.996.996 0 000-1.41L14.42 12l3.88-3.88a.996.996 0 10-1.41-1.41L12.3 11.3a.996.996 0 000 1.41l4.59 4.59c.38.38 1.01.38 1.4-.01z" />
      <path d="M11.7 17.29a.996.996 0 000-1.41L7.83 12l3.88-3.88a.996.996 0 10-1.41-1.41L5.71 11.3a.996.996 0 000 1.41l4.59 4.59c.38.38 1.01.38 1.4-.01z" />
    </svg>
  );
};

const IconWithForwardedRef = forwardRef<SVGSVGElement, IconProps>((iconProps, ref) => (
  <Icon {...iconProps} svgRef={ref} />
));

export const KeyboardDoubleArrowLeftIcon = memo(createStyledIcon(IconWithForwardedRef));

KeyboardDoubleArrowLeftIcon.displayName = 'KeyboardDoubleArrowLeftIcon';
