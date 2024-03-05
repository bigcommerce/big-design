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
      height={48}
      ref={svgRef}
      stroke="currentColor"
      strokeWidth="0"
      viewBox="0 -960 960 960"
      width={48}
      {...props}
    >
      {title ? <title id={titleId}>{title}</title> : null}
      <path d="M220-80q-24 0-42-18t-18-42v-680q0-24 18-42t42-18h361l219 219v521q0 24-18 42t-42 18zm331-554v-186H220v680h520v-494zM220-820v186zv680z" />
    </svg>
  );
};
const IconWithForwardedRef = forwardRef<SVGSVGElement, IconProps>((iconProps, ref) => (
  <Icon {...iconProps} svgRef={ref} />
));

export const DraftIcon = memo(createStyledIcon(IconWithForwardedRef));
DraftIcon.displayName = 'DraftIcon';
