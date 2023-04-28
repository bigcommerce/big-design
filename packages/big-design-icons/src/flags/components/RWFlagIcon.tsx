// **********************************
// Auto-generated file, do NOT modify
// **********************************

'use client';

import React, { forwardRef, memo, useId } from 'react';

import { PrivateIconProps } from '../../base';
import { createStyledFlagIcon, FlagIconProps } from '../base';

const FlagIcon: React.FC<FlagIconProps & PrivateIconProps> = ({
  svgRef,
  title = 'RW flag',
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
      <path d="M0 0h640v480H0z" fill="#20603d" />
      <path d="M0 0h640v360H0z" fill="#fad201" />
      <path d="M0 0h640v240H0z" fill="#00a1de" />
      <g transform="translate(511 125.4) scale(.66667)">
        <g id="RWFlagIcon__b">
          <path
            d="M116.1 0L35.7 4.7l76.4 25.4-78.8-16.3L100.6 58l-72-36.2L82 82.1 21.9 28.6l36.2 72-44.3-67.3L30 112 4.7 35.7 0 116.1-1-1z"
            fill="#e5be01"
            id="RWFlagIcon__a"
          />
          <use height="100%" transform="scale(1 -1)" width="100%" xlinkHref="#RWFlagIcon__a" />
        </g>
        <use height="100%" transform="scale(-1 1)" width="100%" xlinkHref="#RWFlagIcon__b" />
        <circle fill="#e5be01" r={34.3} stroke="#00a1de" strokeWidth={3.4} />
      </g>
    </svg>
  );
};

const FlagIconWithForwardedRef = forwardRef<SVGSVGElement, FlagIconProps>((iconProps, ref) => (
  <FlagIcon {...iconProps} svgRef={ref} />
));

export const RWFlagIcon = memo(createStyledFlagIcon(FlagIconWithForwardedRef));

RWFlagIcon.displayName = 'RWFlagIcon';
