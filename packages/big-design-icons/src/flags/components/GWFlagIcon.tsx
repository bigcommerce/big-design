// **********************************
// Auto-generated file, do NOT modify
// **********************************

'use client';

import React, { forwardRef, memo, useId } from 'react';

import { PrivateIconProps } from '../../base';
import { createStyledFlagIcon, FlagIconProps } from '../base';

const FlagIcon: React.FC<FlagIconProps & PrivateIconProps> = ({
  svgRef,
  title = 'GW flag',
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
      <path d="M0 0h220v480H0z" fill="#ce1126" />
      <path d="M220 0h420v240H220z" fill="#fcd116" />
      <path d="M220 240h420v240H220z" fill="#009e49" />
      <g id="GWFlagIcon__b" transform="matrix(80 0 0 80 110 240)">
        <path d="M0-1v1h.5" id="GWFlagIcon__a" transform="rotate(18 0 -1)" />
        <use height="100%" transform="scale(-1 1)" width="100%" xlinkHref="#GWFlagIcon__a" />
      </g>
      <use height="100%" transform="rotate(72 110 240)" width="100%" xlinkHref="#GWFlagIcon__b" />
      <use height="100%" transform="rotate(144 110 240)" width="100%" xlinkHref="#GWFlagIcon__b" />
      <use height="100%" transform="rotate(-144 110 240)" width="100%" xlinkHref="#GWFlagIcon__b" />
      <use height="100%" transform="rotate(-72 110 240)" width="100%" xlinkHref="#GWFlagIcon__b" />
    </svg>
  );
};

const FlagIconWithForwardedRef = forwardRef<SVGSVGElement, FlagIconProps>((iconProps, ref) => (
  <FlagIcon {...iconProps} svgRef={ref} />
));

export const GWFlagIcon = memo(createStyledFlagIcon(FlagIconWithForwardedRef));

GWFlagIcon.displayName = 'GWFlagIcon';
