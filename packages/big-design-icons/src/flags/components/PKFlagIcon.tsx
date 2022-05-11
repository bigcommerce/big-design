// **********************************
// Auto-generated file, do NOT modify
// **********************************
import React, { forwardRef, memo } from 'react';

import { PrivateIconProps } from '../../base';
import { useUniqueId } from '../../utils';
import { createStyledFlagIcon, FlagIconProps } from '../base';

const FlagIcon: React.FC<FlagIconProps & PrivateIconProps> = ({ svgRef, title = 'PK flag', theme, ...props }) => {
  const uniqueTitleId = useUniqueId('icon');
  const titleId = title ? props.titleId || uniqueTitleId : undefined;
  const ariaHidden = titleId ? undefined : true;

  return (
    <svg aria-hidden={ariaHidden} aria-labelledby={titleId} ref={svgRef} viewBox="0 0 640 480" {...props}>
      {title ? <title id={titleId}>{title}</title> : null}
      <defs>
        <clipPath id="PKFlagIcon__a">
          <path d="M-52.3 0h682.6v512H-52.3z" fillOpacity={0.7} />
        </clipPath>
      </defs>
      <g clipPath="url(#PKFlagIcon__a)" fillRule="evenodd" strokeWidth="1pt" transform="translate(49) scale(.9375)">
        <path d="M-95 0h768v512H-95z" fill="#0c590b" />
        <path d="M-95 0H97.5v512H-95z" fill="#fff" />
        <g fill="#fff">
          <path d="M403.7 225.4l-31.2-6.6-16.4 27.3-3.4-31.6-31-7.2 29-13-2.7-31.7 21.4 23.6 29.3-12.4-15.9 27.6 21 24z" />
          <path d="M415.4 306a121.2 121.2 0 01-161.3 59.4 122.1 122.1 0 01-59.5-162.1A118.6 118.6 0 01266 139a156.2 156.2 0 00-11.8 10.9A112.3 112.3 0 00415.5 306z" />
        </g>
      </g>
    </svg>
  );
};

const FlagIconWithForwardedRef = forwardRef<SVGSVGElement, FlagIconProps>((iconProps, ref) => (
  <FlagIcon {...iconProps} svgRef={ref} />
));

export const PKFlagIcon = memo(createStyledFlagIcon(FlagIconWithForwardedRef));

PKFlagIcon.displayName = 'PKFlagIcon';
