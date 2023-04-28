// **********************************
// Auto-generated file, do NOT modify
// **********************************

'use client';

import React, { forwardRef, memo, useId } from 'react';

import { PrivateIconProps } from '../../base';
import { createStyledFlagIcon, FlagIconProps } from '../base';

const FlagIcon: React.FC<FlagIconProps & PrivateIconProps> = ({
  svgRef,
  title = 'BV flag',
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
        <clipPath id="BVFlagIcon__a">
          <path d="M0 0h640v480H0z" fillOpacity={0.7} />
        </clipPath>
      </defs>
      <g clipPath="url(#BVFlagIcon__a)" fillRule="evenodd" strokeWidth="1pt">
        <path d="M-28 0h699.7v512H-28z" fill="#fff" />
        <path
          d="M-53-77.8h218.7v276.2H-53zM289.4-.6h381v199h-381zM-27.6 320h190.4v190.3H-27.6zm319.6 2.1h378.3v188.2H292z"
          fill="#d72828"
        />
        <path d="M196.7-25.4H261v535.7h-64.5z" fill="#003897" />
        <path d="M-27.6 224.8h698v63.5h-698z" fill="#003897" />
      </g>
    </svg>
  );
};

const FlagIconWithForwardedRef = forwardRef<SVGSVGElement, FlagIconProps>((iconProps, ref) => (
  <FlagIcon {...iconProps} svgRef={ref} />
));

export const BVFlagIcon = memo(createStyledFlagIcon(FlagIconWithForwardedRef));

BVFlagIcon.displayName = 'BVFlagIcon';
