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
      <path d="M0 0h24v24H0z" fill="none" />
      <path d="M6 19a1 1 0 0 1-1-1v-4a1 1 0 1 1 2 0v3h3a1 1 0 1 1 0 2zm12-8a1 1 0 0 1-1-1V7h-3a1 1 0 1 1 0-2h4a1 1 0 0 1 1 1v4a1 1 0 0 1-1 1" />
    </svg>
  );
};
const IconWithForwardedRef = forwardRef<SVGSVGElement, IconProps>((iconProps, ref) => (
  <Icon {...iconProps} svgRef={ref} />
));

export const WindowExpandIcon = memo(createStyledIcon(IconWithForwardedRef));
WindowExpandIcon.displayName = 'WindowExpandIcon';
