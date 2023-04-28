// **********************************
// Auto-generated file, do NOT modify
// **********************************

'use client';

import React, { forwardRef, memo, useId } from 'react';

import { PrivateIconProps } from '../../base';
import { createStyledFlagIcon, FlagIconProps } from '../base';

const FlagIcon: React.FC<FlagIconProps & PrivateIconProps> = ({
  svgRef,
  title = 'JP flag',
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
        <clipPath id="JPFlagIcon__a">
          <path d="M-88 32h640v480H-88z" fillOpacity={0.7} />
        </clipPath>
      </defs>
      <g
        clipPath="url(#JPFlagIcon__a)"
        fillRule="evenodd"
        strokeWidth="1pt"
        transform="translate(88 -32)"
      >
        <path d="M-128 32h720v480h-720z" fill="#fff" />
        <circle
          cx={523.1}
          cy={344.1}
          fill="#bc002d"
          r={194.9}
          transform="translate(-168.4 8.6) scale(.76554)"
        />
      </g>
    </svg>
  );
};

const FlagIconWithForwardedRef = forwardRef<SVGSVGElement, FlagIconProps>((iconProps, ref) => (
  <FlagIcon {...iconProps} svgRef={ref} />
));

export const JPFlagIcon = memo(createStyledFlagIcon(FlagIconWithForwardedRef));

JPFlagIcon.displayName = 'JPFlagIcon';
