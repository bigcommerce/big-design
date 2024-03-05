// **********************************
// Auto-generated file, do NOT modify
// **********************************
import React, { forwardRef, memo, useId } from 'react';

import { createStyledFlagIcon, FlagIconProps, PrivateIconProps } from '../base';

const FlagIcon: React.FC<FlagIconProps & PrivateIconProps> = ({
  svgRef,
  title = 'EU flag',
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
      <defs>
        <g id="EUFlagIcon__d">
          <g id="EUFlagIcon__b">
            <path d="m0-1-.3 1 .5.1z" id="EUFlagIcon__a" />
            <use transform="scale(-1 1)" xlinkHref="#EUFlagIcon__a" />
          </g>
          <g id="EUFlagIcon__c">
            <use transform="rotate(72)" xlinkHref="#EUFlagIcon__b" />
            <use transform="rotate(144)" xlinkHref="#EUFlagIcon__b" />
          </g>
          <use transform="scale(-1 1)" xlinkHref="#EUFlagIcon__c" />
        </g>
      </defs>
      <path d="M0 0h640v480H0z" fill="#039" />
      <g fill="#fc0" transform="translate(320 242.3)scale(23.7037)">
        <use height="100%" width="100%" xlinkHref="#EUFlagIcon__d" y={-6} />
        <use height="100%" width="100%" xlinkHref="#EUFlagIcon__d" y={6} />
        <g id="EUFlagIcon__e">
          <use height="100%" width="100%" x={-6} xlinkHref="#EUFlagIcon__d" />
          <use
            height="100%"
            transform="rotate(-144 -2.3 -2.1)"
            width="100%"
            xlinkHref="#EUFlagIcon__d"
          />
          <use
            height="100%"
            transform="rotate(144 -2.1 -2.3)"
            width="100%"
            xlinkHref="#EUFlagIcon__d"
          />
          <use
            height="100%"
            transform="rotate(72 -4.7 -2)"
            width="100%"
            xlinkHref="#EUFlagIcon__d"
          />
          <use height="100%" transform="rotate(72 -5 .5)" width="100%" xlinkHref="#EUFlagIcon__d" />
        </g>
        <use height="100%" transform="scale(-1 1)" width="100%" xlinkHref="#EUFlagIcon__e" />
      </g>
    </svg>
  );
};
const FlagIconWithForwardedRef = forwardRef<SVGSVGElement, FlagIconProps>((iconProps, ref) => (
  <FlagIcon {...iconProps} svgRef={ref} />
));

export const EUFlagIcon = memo(createStyledFlagIcon(FlagIconWithForwardedRef));
EUFlagIcon.displayName = 'EUFlagIcon';
