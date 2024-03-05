// **********************************
// Auto-generated file, do NOT modify
// **********************************
import React, { forwardRef, memo, useId } from 'react';

import { createStyledFlagIcon, FlagIconProps, PrivateIconProps } from '../base';

const FlagIcon: React.FC<FlagIconProps & PrivateIconProps> = ({
  svgRef,
  title = 'KR flag',
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
        <clipPath id="KRFlagIcon__a">
          <path d="M-95.8-.4h682.7v512H-95.8z" fillOpacity={0.7} />
        </clipPath>
      </defs>
      <g
        clipPath="url(#KRFlagIcon__a)"
        fillRule="evenodd"
        transform="translate(89.8 .4)scale(.9375)"
      >
        <path d="M-95.8-.4H587v512H-95.8Z" fill="#fff" />
        <g transform="rotate(-56.3 361.6 -101.3)scale(10.66667)">
          <g id="KRFlagIcon__c">
            <path d="M-6-26H6v2H-6Zm0 3H6v2H-6Zm0 3H6v2H-6Z" fill="#000001" id="KRFlagIcon__b" />
            <use height="100%" width="100%" xlinkHref="#KRFlagIcon__b" y={44} />
          </g>
          <path d="M0 17v10" stroke="#fff" />
          <path d="M0-12a12 12 0 0 1 0 24Z" fill="#cd2e3a" />
          <path d="M0-12a12 12 0 0 0 0 24A6 6 0 0 0 0 0Z" fill="#0047a0" />
          <circle cy={-6} fill="#cd2e3a" r={6} />
        </g>
        <g transform="rotate(-123.7 191.2 62.2)scale(10.66667)">
          <use height="100%" width="100%" xlinkHref="#KRFlagIcon__c" />
          <path d="M0-23.5v3M0 17v3.5m0 3v3" stroke="#fff" />
        </g>
      </g>
    </svg>
  );
};
const FlagIconWithForwardedRef = forwardRef<SVGSVGElement, FlagIconProps>((iconProps, ref) => (
  <FlagIcon {...iconProps} svgRef={ref} />
));

export const KRFlagIcon = memo(createStyledFlagIcon(FlagIconWithForwardedRef));
KRFlagIcon.displayName = 'KRFlagIcon';
