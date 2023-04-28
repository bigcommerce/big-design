// **********************************
// Auto-generated file, do NOT modify
// **********************************

'use client';

import React, { forwardRef, memo, useId } from 'react';

import { PrivateIconProps } from '../../base';
import { createStyledFlagIcon, FlagIconProps } from '../base';

const FlagIcon: React.FC<FlagIconProps & PrivateIconProps> = ({
  svgRef,
  title = 'BI flag',
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
        <clipPath id="BIFlagIcon__a">
          <path d="M-90.5 0H592v512H-90.5z" fillOpacity={0.7} />
        </clipPath>
      </defs>
      <g clipPath="url(#BIFlagIcon__a)" fillRule="evenodd" transform="translate(84.9) scale(.9375)">
        <path d="M-178 0l428.8 256L-178 512zm857.6 0L250.8 256l428.8 256z" fill="#18b637" />
        <path d="M-178 0l428.8 256L679.6 0zm0 512l428.8-256 428.8 256z" fill="#cf0921" />
        <path d="M679.6 0h-79.9L-178 464.3V512h79.9L679.6 47.7z" fill="#fff" />
        <path d="M398.9 256a148 148 0 11-296.1 0 148 148 0 01296 0z" fill="#fff" />
        <path d="M-178 0v47.7L599.7 512h79.9v-47.7L-98.1 0z" fill="#fff" />
        <path
          d="M280 200.2l-19.3.3-10 16.4-9.9-16.4-19.2-.4 9.3-16.9-9.2-16.8 19.2-.4 10-16.4 9.9 16.5 19.2.4-9.3 16.8zm-64.6 111.6l-19.2.3-10 16.4-9.9-16.4-19.2-.4 9.3-16.9-9.2-16.8 19.2-.4 10-16.4 9.9 16.5 19.2.4-9.3 16.8zm130.6 0l-19.2.3-10 16.4-10-16.4-19.1-.4 9.3-16.9-9.3-16.8 19.2-.4 10-16.4 10 16.5 19.2.4-9.4 16.8z"
          fill="#cf0921"
          stroke="#18b637"
          strokeWidth={3.9}
        />
      </g>
    </svg>
  );
};

const FlagIconWithForwardedRef = forwardRef<SVGSVGElement, FlagIconProps>((iconProps, ref) => (
  <FlagIcon {...iconProps} svgRef={ref} />
));

export const BIFlagIcon = memo(createStyledFlagIcon(FlagIconWithForwardedRef));

BIFlagIcon.displayName = 'BIFlagIcon';
