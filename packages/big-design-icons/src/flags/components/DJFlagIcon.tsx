// **********************************
// Auto-generated file, do NOT modify
// **********************************
import React, { forwardRef, memo } from 'react';

import { PrivateIconProps } from '../../base';
import { useUniqueId } from '../../utils';
import { createStyledFlagIcon, FlagIconProps } from '../base';

const FlagIcon: React.FC<FlagIconProps & PrivateIconProps> = ({ svgRef, title = 'DJ flag', theme, ...props }) => {
  const uniqueTitleId = useUniqueId('icon');
  const titleId = title ? props.titleId || uniqueTitleId : undefined;

  return (
    <svg viewBox="0 0 640 480" ref={svgRef} aria-labelledby={titleId} {...props}>
      {title ? <title id={titleId}>{title}</title> : null}
      <defs>
        <clipPath id="DJFlagIcon__a">
          <path fillOpacity={0.7} d="M-40 0h682.7v512H-40z" />
        </clipPath>
      </defs>
      <g fillRule="evenodd" clipPath="url(#DJFlagIcon__a)" transform="translate(37.5) scale(.94)">
        <path fill="#0c0" d="M-40 0h768v512H-40z" />
        <path fill="#69f" d="M-40 0h768v256H-40z" />
        <path fill="#fffefe" d="M-40 0l382.7 255.7L-40 511V0z" />
        <path
          fill="red"
          d="M119.8 292L89 270l-30.7 22.4L69.7 256l-30.6-22.5 37.9-.3 11.7-36.3 12 36.2h37.9l-30.5 22.7 11.7 36.4z"
        />
      </g>
    </svg>
  );
};

const FlagIconWithForwardedRef = forwardRef<SVGSVGElement, FlagIconProps>((iconProps, ref) => (
  <FlagIcon aria-hidden={iconProps.title ? undefined : true} {...iconProps} svgRef={ref} />
));

export const DJFlagIcon = memo(createStyledFlagIcon(FlagIconWithForwardedRef as React.FC<FlagIconProps>));

DJFlagIcon.displayName = 'DJFlagIcon';
