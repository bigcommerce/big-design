// **********************************
// Auto-generated file, do NOT modify
// **********************************
import React, { forwardRef, memo, useId } from 'react';

import { createStyledFlagIcon, FlagIconProps, PrivateIconProps } from '../base';

const FlagIcon: React.FC<FlagIconProps & PrivateIconProps> = ({
  svgRef,
  title = 'UM flag',
  theme,
  ...props
}) => {
  const uniqueTitleId = useId();
  const titleId = title ? props.titleId || uniqueTitleId : undefined;
  const ariaHidden = titleId ? undefined : true;

  return (
    <svg
      aria-hidden={ariaHidden}
      aria-labelledby={titleId}
      ref={svgRef}
      viewBox="0 0 640 480"
      {...props}
    >
      {title ? <title id={titleId}>{title}</title> : null}
      <path d="M0 0h640v480H0" fill="#bd3d44" />
      <path
        d="M0 55.3h640M0 129h640M0 203h640M0 277h640M0 351h640M0 425h640"
        stroke="#fff"
        strokeWidth={37}
      />
      <path d="M0 0h364.8v258.5H0" fill="#192f5d" />
      <marker id="UMFlagIcon__a" markerHeight={30} markerWidth={30}>
        <path d="m14 0 9 27L0 10h28L5 27z" fill="#fff" />
      </marker>
      <path
        d="m0 0 16 11h61 61 61 61 60L47 37h61 61 60 61L16 63h61 61 61 61 60L47 89h61 61 60 61L16 115h61 61 61 61 60L47 141h61 61 60 61L16 166h61 61 61 61 60L47 192h61 61 60 61L16 218h61 61 61 61 60z"
        fill="none"
        markerMid="url(#UMFlagIcon__a)"
      />
    </svg>
  );
};
const FlagIconWithForwardedRef = forwardRef<SVGSVGElement, FlagIconProps>((iconProps, ref) => (
  <FlagIcon {...iconProps} svgRef={ref} />
));

export const UMFlagIcon = memo(createStyledFlagIcon(FlagIconWithForwardedRef));
UMFlagIcon.displayName = 'UMFlagIcon';
