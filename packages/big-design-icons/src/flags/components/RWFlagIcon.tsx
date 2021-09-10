// **********************************
// Auto-generated file, do NOT modify
// **********************************
import React, { forwardRef, memo } from 'react';

import { PrivateIconProps } from '../../base';
import { useUniqueId } from '../../utils';
import { createStyledFlagIcon, FlagIconProps } from '../base';

const FlagIcon: React.FC<FlagIconProps & PrivateIconProps> = ({ svgRef, title = 'RW flag', theme, ...props }) => {
  const uniqueTitleId = useUniqueId('icon');
  const titleId = title ? props.titleId || uniqueTitleId : undefined;

  return (
    <svg
      xmlnsXlink="http://www.w3.org/1999/xlink"
      viewBox="0 0 640 480"
      ref={svgRef}
      aria-labelledby={titleId}
      {...props}
    >
      {title ? <title id={titleId}>{title}</title> : null}
      <path fill="#20603d" d="M0 0h640v480H0z" />
      <path fill="#fad201" d="M0 0h640v360H0z" />
      <path fill="#00a1de" d="M0 0h640v240H0z" />
      <g transform="translate(511 125.4) scale(.66667)">
        <g id="RWFlagIcon__b">
          <path
            id="RWFlagIcon__a"
            fill="#e5be01"
            d="M116.1 0L35.7 4.7l76.4 25.4-78.8-16.3L100.6 58l-72-36.2L82 82.1 21.9 28.6l36.2 72-44.3-67.3L30 112 4.7 35.7 0 116.1-1-1z"
          />
          <use width="100%" height="100%" transform="scale(1 -1)" xlinkHref="#RWFlagIcon__a" />
        </g>
        <use width="100%" height="100%" transform="scale(-1 1)" xlinkHref="#RWFlagIcon__b" />
        <circle r={34.3} fill="#e5be01" stroke="#00a1de" strokeWidth={3.4} />
      </g>
    </svg>
  );
};

const FlagIconWithForwardedRef = forwardRef<SVGSVGElement, FlagIconProps>((iconProps, ref) => (
  <FlagIcon aria-hidden={iconProps.title ? undefined : true} {...iconProps} svgRef={ref} />
));

export const RWFlagIcon = memo(createStyledFlagIcon(FlagIconWithForwardedRef as React.FC<FlagIconProps>));

RWFlagIcon.displayName = 'RWFlagIcon';
