// **********************************
// Auto-generated file, do NOT modify
// **********************************
import React, { forwardRef, memo } from 'react';

import { PrivateIconProps } from '../../base';
import { useUniqueId } from '../../utils';
import { createStyledFlagIcon, FlagIconProps } from '../base';

const FlagIcon: React.FC<FlagIconProps & PrivateIconProps> = ({ svgRef, title = 'KN flag', theme, ...props }) => {
  const uniqueTitleId = useUniqueId('icon');
  const titleId = title ? props.titleId || uniqueTitleId : undefined;

  return (
    <svg viewBox="0 0 640 480" ref={svgRef} aria-labelledby={titleId} {...props}>
      {title ? <title id={titleId}>{title}</title> : null}
      <defs>
        <clipPath id="KNFlagIcon__a">
          <path fillOpacity={0.7} d="M-80.1 0h682.7v512H-80.1z" />
        </clipPath>
      </defs>
      <g fillRule="evenodd" clipPath="url(#KNFlagIcon__a)" transform="translate(75.1) scale(.9375)">
        <path fill="#ffe900" d="M-107.8.2h737.6v511.3h-737.6z" />
        <path fill="#35a100" d="M-108.2.2l.8 368.6L466.6 0l-574.8.2z" />
        <path fill="#c70000" d="M630.7 511.5l-1.4-383.2-579 383.5 580.4-.3z" />
        <path d="M-107.9 396.6l.5 115.4 125.3-.2 611.7-410.1L629 1.4 505.2.2l-613 396.4z" />
        <path
          fill="#fff"
          d="M380.4 156.6l-9.8-42.2 33.3 27 38-24.6-17.4 41.3 33.4 27-44.2-1.5-17.3 41.3-9.9-42.2-44.1-1.5zm-275.2 179l-9.9-42.3 33.3 27 38-24.6-17.4 41.3 33.4 27-44.1-1.5-17.4 41.3-9.8-42.2-44.1-1.5z"
        />
      </g>
    </svg>
  );
};

const FlagIconWithForwardedRef = forwardRef<SVGSVGElement, FlagIconProps>((iconProps, ref) => (
  <FlagIcon aria-hidden={iconProps.title ? undefined : true} {...iconProps} svgRef={ref} />
));

export const KNFlagIcon = memo(createStyledFlagIcon(FlagIconWithForwardedRef as React.FC<FlagIconProps>));

KNFlagIcon.displayName = 'KNFlagIcon';
