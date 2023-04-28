// **********************************
// Auto-generated file, do NOT modify
// **********************************

'use client';

import React, { forwardRef, memo, useId } from 'react';

import { PrivateIconProps } from '../../base';
import { createStyledFlagIcon, FlagIconProps } from '../base';

const FlagIcon: React.FC<FlagIconProps & PrivateIconProps> = ({
  svgRef,
  title = 'IL flag',
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
        <clipPath id="ILFlagIcon__a">
          <path d="M-87.6 0H595v512H-87.6z" fillOpacity={0.7} />
        </clipPath>
      </defs>
      <g clipPath="url(#ILFlagIcon__a)" fillRule="evenodd" transform="translate(82.1) scale(.94)">
        <path d="M619.4 512H-112V0h731.4z" fill="#fff" />
        <path
          d="M619.4 115.2H-112V48h731.4zm0 350.5H-112v-67.2h731.4zm-483-275l110.1 191.6L359 191.6l-222.6-.8z"
          fill="#0038b8"
        />
        <path d="M225.8 317.8l20.9 35.5 21.4-35.3-42.4-.2z" fill="#fff" />
        <path d="M136 320.6L246.2 129l112.4 190.8-222.6.8z" fill="#0038b8" />
        <path
          d="M225.8 191.6l20.9-35.5 21.4 35.4-42.4.1zM182 271.1l-21.7 36 41-.1-19.3-36zm-21.3-66.5l41.2.3-19.8 36.3-21.4-36.6zm151.2 67l20.9 35.5-41.7-.5 20.8-35zm20.5-67l-41.2.3 19.8 36.3 21.4-36.6zm-114.3 0L189.7 256l28.8 50.3 52.8 1.2 32-51.5-29.6-52-55.6.5z"
          fill="#fff"
        />
      </g>
    </svg>
  );
};

const FlagIconWithForwardedRef = forwardRef<SVGSVGElement, FlagIconProps>((iconProps, ref) => (
  <FlagIcon {...iconProps} svgRef={ref} />
));

export const ILFlagIcon = memo(createStyledFlagIcon(FlagIconWithForwardedRef));

ILFlagIcon.displayName = 'ILFlagIcon';
