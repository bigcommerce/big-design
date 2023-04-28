// **********************************
// Auto-generated file, do NOT modify
// **********************************

'use client';

import React, { forwardRef, memo, useId } from 'react';

import { PrivateIconProps } from '../../base';
import { createStyledFlagIcon, FlagIconProps } from '../base';

const FlagIcon: React.FC<FlagIconProps & PrivateIconProps> = ({
  svgRef,
  title = 'JO flag',
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
        <clipPath id="JOFlagIcon__a">
          <path d="M-117.8 0h682.6v512h-682.6z" fillOpacity={0.7} />
        </clipPath>
      </defs>
      <g clipPath="url(#JOFlagIcon__a)" transform="translate(110.5) scale(.9375)">
        <g fillRule="evenodd" strokeWidth="1pt">
          <path d="M-117.8 0h1024v170.7h-1024z" />
          <path d="M-117.8 170.7h1024v170.6h-1024z" fill="#fff" />
          <path d="M-117.8 341.3h1024V512h-1024z" fill="#090" />
          <path d="M-117.8 512l512-256-512-256v512z" fill="red" />
          <path
            d="M24.5 289l5.7-24.9H4.7l23-11-15.9-19.9 23 11 5.6-24.8 5.7 24.9L69 233.2l-16 19.9 23 11H50.6l5.7 24.9-15.9-20z"
            fill="#fff"
          />
        </g>
      </g>
    </svg>
  );
};

const FlagIconWithForwardedRef = forwardRef<SVGSVGElement, FlagIconProps>((iconProps, ref) => (
  <FlagIcon {...iconProps} svgRef={ref} />
));

export const JOFlagIcon = memo(createStyledFlagIcon(FlagIconWithForwardedRef));

JOFlagIcon.displayName = 'JOFlagIcon';
