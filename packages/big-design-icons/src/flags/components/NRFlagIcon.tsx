// **********************************
// Auto-generated file, do NOT modify
// **********************************
import React, { forwardRef, memo } from 'react';

import { PrivateIconProps } from '../../base';
import { useUniqueId } from '../../utils';
import { createStyledFlagIcon, FlagIconProps } from '../base';

const FlagIcon: React.FC<FlagIconProps & PrivateIconProps> = ({ svgRef, title = 'NR flag', theme, ...props }) => {
  const uniqueTitleId = useUniqueId('icon');
  const titleId = title ? props.titleId || uniqueTitleId : undefined;

  return (
    <svg viewBox="0 0 640 480" ref={svgRef} aria-labelledby={titleId} {...props}>
      {title ? <title id={titleId}>{title}</title> : null}
      <defs>
        <clipPath id="NRFlagIcon__a">
          <path fillOpacity={0.7} d="M-54.7 0H628v512H-54.7z" />
        </clipPath>
      </defs>
      <g fillRule="evenodd" strokeWidth="1pt" clipPath="url(#NRFlagIcon__a)" transform="translate(51.3) scale(.9375)">
        <path fill="#002170" d="M-140 0H884v512H-140z" />
        <path fill="#ffb20d" d="M-140 234.1H884V278H-140z" />
        <path
          fill="#fff"
          d="M161.8 438l-33-33-10.5 45.4-12-45-31.9 34 12.1-45L42 407.9l33-33-45.4-10.6 45-12-34-31.8 45 12L72 288l33 33 10.6-45.4 12 45 31.8-34-12 45 44.5-13.5-33 33 45.4 10.5-45 12 34 32-45-12.2z"
        />
      </g>
    </svg>
  );
};

const FlagIconWithForwardedRef = forwardRef<SVGSVGElement, FlagIconProps>((iconProps, ref) => (
  <FlagIcon aria-hidden={iconProps.title ? undefined : true} {...iconProps} svgRef={ref} />
));

export const NRFlagIcon = memo(createStyledFlagIcon(FlagIconWithForwardedRef as React.FC<FlagIconProps>));

NRFlagIcon.displayName = 'NRFlagIcon';
