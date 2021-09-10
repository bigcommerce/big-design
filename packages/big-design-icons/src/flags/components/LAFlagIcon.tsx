// **********************************
// Auto-generated file, do NOT modify
// **********************************
import React, { forwardRef, memo } from 'react';

import { PrivateIconProps } from '../../base';
import { useUniqueId } from '../../utils';
import { createStyledFlagIcon, FlagIconProps } from '../base';

const FlagIcon: React.FC<FlagIconProps & PrivateIconProps> = ({ svgRef, title = 'LA flag', theme, ...props }) => {
  const uniqueTitleId = useUniqueId('icon');
  const titleId = title ? props.titleId || uniqueTitleId : undefined;

  return (
    <svg viewBox="0 0 640 480" ref={svgRef} aria-labelledby={titleId} {...props}>
      {title ? <title id={titleId}>{title}</title> : null}
      <defs>
        <clipPath id="LAFlagIcon__a">
          <path fillOpacity={0.7} d="M0 0h640v480H0z" />
        </clipPath>
      </defs>
      <g fillRule="evenodd" clipPath="url(#LAFlagIcon__a)">
        <path fill="#ce1126" d="M-40 0h720v480H-40z" />
        <path fill="#002868" d="M-40 119.3h720v241.4H-40z" />
        <path fill="#fff" d="M423.4 240a103.4 103.4 0 11-206.8 0 103.4 103.4 0 11206.8 0z" />
      </g>
    </svg>
  );
};

const FlagIconWithForwardedRef = forwardRef<SVGSVGElement, FlagIconProps>((iconProps, ref) => (
  <FlagIcon aria-hidden={iconProps.title ? undefined : true} {...iconProps} svgRef={ref} />
));

export const LAFlagIcon = memo(createStyledFlagIcon(FlagIconWithForwardedRef as React.FC<FlagIconProps>));

LAFlagIcon.displayName = 'LAFlagIcon';
