// **********************************
// Auto-generated file, do NOT modify
// **********************************

'use client';

import React, { forwardRef, memo, useId } from 'react';

import { PrivateIconProps } from '../../base';
import { createStyledFlagIcon, FlagIconProps } from '../base';

const FlagIcon: React.FC<FlagIconProps & PrivateIconProps> = ({
  svgRef,
  title = 'NR flag',
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
      {...props}
    >
      {title ? <title id={titleId}>{title}</title> : null}
      <defs>
        <clipPath id="NRFlagIcon__a">
          <path d="M-54.7 0H628v512H-54.7z" fillOpacity={0.7} />
        </clipPath>
      </defs>
      <g
        clipPath="url(#NRFlagIcon__a)"
        fillRule="evenodd"
        strokeWidth="1pt"
        transform="translate(51.3) scale(.9375)"
      >
        <path d="M-140 0H884v512H-140z" fill="#002170" />
        <path d="M-140 234.1H884V278H-140z" fill="#ffb20d" />
        <path
          d="M161.8 438l-33-33-10.5 45.4-12-45-31.9 34 12.1-45L42 407.9l33-33-45.4-10.6 45-12-34-31.8 45 12L72 288l33 33 10.6-45.4 12 45 31.8-34-12 45 44.5-13.5-33 33 45.4 10.5-45 12 34 32-45-12.2z"
          fill="#fff"
        />
      </g>
    </svg>
  );
};

const FlagIconWithForwardedRef = forwardRef<SVGSVGElement, FlagIconProps>((iconProps, ref) => (
  <FlagIcon {...iconProps} svgRef={ref} />
));

export const NRFlagIcon = memo(createStyledFlagIcon(FlagIconWithForwardedRef));

NRFlagIcon.displayName = 'NRFlagIcon';
