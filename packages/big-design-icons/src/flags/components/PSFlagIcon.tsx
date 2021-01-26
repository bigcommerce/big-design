// **********************************
// Auto-generated file, do NOT modify
// **********************************
import React, { forwardRef, memo } from 'react';

import { PrivateIconProps } from '../../base';
import { useUniqueId } from '../../utils';
import { createStyledFlagIcon, FlagIconProps } from '../base';

const FlagIcon: React.FC<FlagIconProps & PrivateIconProps> = ({ svgRef, title = 'PS flag', theme, ...props }) => {
  const uniqueTitleId = useUniqueId('icon');
  const titleId = title ? props.titleId || uniqueTitleId : undefined;

  return (
    <svg viewBox="0 0 640 480" ref={svgRef} aria-labelledby={titleId} {...props}>
      {title ? <title id={titleId}>{title}</title> : null}
      <defs>
        <clipPath id="PSFlagIcon__a">
          <path fillOpacity={0.7} d="M-118 0h682.7v512H-118z" />
        </clipPath>
      </defs>
      <g clipPath="url(#PSFlagIcon__a)" transform="translate(110.6) scale(.9375)">
        <g fillRule="evenodd" strokeWidth="1pt">
          <path d="M-246 0H778v170.7H-246z" />
          <path fill="#fff" d="M-246 170.7H778v170.6H-246z" />
          <path fill="#090" d="M-246 341.3H778V512H-246z" />
          <path fill="red" d="M-246 512l512-256L-246 0v512z" />
        </g>
      </g>
    </svg>
  );
};

const FlagIconWithForwardedRef = forwardRef<SVGSVGElement, FlagIconProps>((iconProps, ref) => (
  <FlagIcon {...iconProps} svgRef={ref} />
));

export const PSFlagIcon = memo(createStyledFlagIcon(FlagIconWithForwardedRef as React.FC<FlagIconProps>));

PSFlagIcon.displayName = 'PSFlagIcon';
