// **********************************
// Auto-generated file, do NOT modify
// **********************************
import React, { forwardRef, memo, useId } from 'react';

import { createStyledFlagIcon, FlagIconProps, PrivateIconProps } from '../base';

const FlagIcon: React.FC<FlagIconProps & PrivateIconProps> = ({
  svgRef,
  title = 'MM flag',
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
      xmlnsXlink="http://www.w3.org/1999/xlink"
      {...props}
    >
      {title ? <title id={titleId}>{title}</title> : null}
      <path d="M0 0h640v480H0z" fill="#fecb00" />
      <path d="M0 160h640v320H0z" fill="#34b233" />
      <path d="M0 320h640v160H0z" fill="#ea2839" />
      <g transform="translate(320 256.9)scale(176.87999)">
        <path d="m0-1 .3 1h-.6z" fill="#fff" id="MMFlagIcon__a" />
        <use height="100%" transform="rotate(-144)" width="100%" xlinkHref="#MMFlagIcon__a" />
        <use height="100%" transform="rotate(-72)" width="100%" xlinkHref="#MMFlagIcon__a" />
        <use height="100%" transform="rotate(72)" width="100%" xlinkHref="#MMFlagIcon__a" />
        <use height="100%" transform="rotate(144)" width="100%" xlinkHref="#MMFlagIcon__a" />
      </g>
    </svg>
  );
};
const FlagIconWithForwardedRef = forwardRef<SVGSVGElement, FlagIconProps>((iconProps, ref) => (
  <FlagIcon {...iconProps} svgRef={ref} />
));

export const MMFlagIcon = memo(createStyledFlagIcon(FlagIconWithForwardedRef));
MMFlagIcon.displayName = 'MMFlagIcon';
