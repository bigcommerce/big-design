// **********************************
// Auto-generated file, do NOT modify
// **********************************
import React, { forwardRef, memo } from 'react';

import { PrivateIconProps } from '../../base';
import { useUniqueId } from '../../utils';
import { createStyledFlagIcon, FlagIconProps } from '../base';

const FlagIcon: React.FC<FlagIconProps & PrivateIconProps> = ({ svgRef, title = 'KW flag', theme, ...props }) => {
  const uniqueTitleId = useUniqueId('icon');
  const titleId = title ? props.titleId || uniqueTitleId : undefined;

  return (
    <svg viewBox="0 0 640 480" ref={svgRef} aria-labelledby={titleId} {...props}>
      {title ? <title id={titleId}>{title}</title> : null}
      <defs>
        <clipPath id="KWFlagIcon__a">
          <path fillOpacity={0.7} d="M0 0h682.7v512H0z" />
        </clipPath>
      </defs>
      <g fillRule="evenodd" strokeWidth="1pt" clipPath="url(#KWFlagIcon__a)" transform="scale(.9375)">
        <path fill="#fff" d="M0 170.6h1024v170.7H0z" />
        <path fill="#f31830" d="M0 341.3h1024V512H0z" />
        <path fill="#00d941" d="M0 0h1024v170.7H0z" />
        <path d="M0 0v512l255.4-170.7.6-170.8L0 0z" />
      </g>
    </svg>
  );
};

const FlagIconWithForwardedRef = forwardRef<SVGSVGElement, FlagIconProps>((iconProps, ref) => (
  <FlagIcon {...iconProps} svgRef={ref} />
));

export const KWFlagIcon = memo(createStyledFlagIcon(FlagIconWithForwardedRef as React.FC<FlagIconProps>));

KWFlagIcon.displayName = 'KWFlagIcon';
