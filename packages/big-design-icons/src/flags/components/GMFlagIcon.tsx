// **********************************
// Auto-generated file, do NOT modify
// **********************************
import React, { forwardRef, memo } from 'react';

import { PrivateIconProps } from '../../base';
import { useUniqueId } from '../../utils';
import { createStyledFlagIcon, FlagIconProps } from '../base';

const FlagIcon: React.FC<FlagIconProps & PrivateIconProps> = ({ svgRef, title = 'GM flag', theme, ...props }) => {
  const uniqueTitleId = useUniqueId('icon');
  const titleId = title ? props.titleId || uniqueTitleId : undefined;

  return (
    <svg viewBox="0 0 640 480" ref={svgRef} aria-labelledby={titleId} {...props}>
      {title ? <title id={titleId}>{title}</title> : null}
      <defs>
        <clipPath id="GMFlagIcon__a">
          <path fillOpacity={0.7} d="M0-48h640v480H0z" />
        </clipPath>
      </defs>
      <g fillRule="evenodd" strokeWidth="1pt" clipPath="url(#GMFlagIcon__a)" transform="translate(0 48)">
        <path fill="red" d="M0-128h640V85.3H0z" />
        <path fill="#fff" d="M0 85.3h640V121H0z" />
        <path fill="#009" d="M0 120.9h640V263H0z" />
        <path fill="#fff" d="M0 263.1h640v35.6H0z" />
        <path fill="#090" d="M0 298.7h640V512H0z" />
      </g>
    </svg>
  );
};

const FlagIconWithForwardedRef = forwardRef<SVGSVGElement, FlagIconProps>((iconProps, ref) => (
  <FlagIcon {...iconProps} svgRef={ref} />
));

export const GMFlagIcon = memo(createStyledFlagIcon(FlagIconWithForwardedRef as React.FC<FlagIconProps>));

GMFlagIcon.displayName = 'GMFlagIcon';
