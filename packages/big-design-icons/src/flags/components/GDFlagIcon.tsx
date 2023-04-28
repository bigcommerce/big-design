// **********************************
// Auto-generated file, do NOT modify
// **********************************

'use client';

import React, { forwardRef, memo, useId } from 'react';

import { PrivateIconProps } from '../../base';
import { createStyledFlagIcon, FlagIconProps } from '../base';

const FlagIcon: React.FC<FlagIconProps & PrivateIconProps> = ({
  svgRef,
  title = 'GD flag',
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
      xmlnsXlink="http://www.w3.org/1999/xlink"
      {...props}
    >
      {title ? <title id={titleId}>{title}</title> : null}
      <defs>
        <g id="GDFlagIcon__c">
          <g id="GDFlagIcon__b">
            <path d="M0-1v1h.5" fill="#fcd116" id="GDFlagIcon__a" transform="rotate(18 0 -1)" />
            <use transform="scale(-1 1)" xlinkHref="#GDFlagIcon__a" />
          </g>
          <use transform="rotate(72)" xlinkHref="#GDFlagIcon__b" />
          <use transform="rotate(144)" xlinkHref="#GDFlagIcon__b" />
          <use transform="rotate(216)" xlinkHref="#GDFlagIcon__b" />
          <use transform="rotate(288)" xlinkHref="#GDFlagIcon__b" />
        </g>
      </defs>
      <path d="M0 0h640v480H0z" fill="#ce1126" />
      <path d="M67.2 67.2h505.6v345.6H67.2z" fill="#007a5e" />
      <path d="M67.2 67.3h505.6L67.2 412.9h505.6z" fill="#fcd116" />
      <circle cx={319.9} cy={240.1} fill="#ce1126" r={57.6} />
      <use
        height="100%"
        transform="matrix(52.8 0 0 52.8 320 240)"
        width="100%"
        xlinkHref="#GDFlagIcon__c"
      />
      <use
        height="100%"
        transform="translate(-30.3)"
        width="100%"
        x={-100}
        xlinkHref="#GDFlagIcon__d"
      />
      <use
        height="100%"
        id="GDFlagIcon__d"
        transform="matrix(31.2 0 0 31.2 320 33.6)"
        width="100%"
        xlinkHref="#GDFlagIcon__c"
      />
      <use
        height="100%"
        transform="translate(30.3)"
        width="100%"
        x={100}
        xlinkHref="#GDFlagIcon__d"
      />
      <path
        d="M102.3 240.7a80.4 80.4 0 0033.5 33.2 111 111 0 00-11.3-45l-22.2 11.8z"
        fill="#ce1126"
      />
      <path
        d="M90.1 194.7c10.4 21.7-27.1 73.7 35.5 85.9a63.2 63.2 0 01-10.9-41.9 70 70 0 0132.5 30.8c16.4-59.5-42-55.8-57.1-74.8z"
        fill="#fcd116"
      />
      <use
        height="100%"
        transform="translate(-30.3 414.6)"
        width="100%"
        x={-100}
        xlinkHref="#GDFlagIcon__d"
      />
      <use
        height="100%"
        transform="matrix(31.2 0 0 31.2 320 448.2)"
        width="100%"
        xlinkHref="#GDFlagIcon__c"
      />
      <use
        height="100%"
        transform="translate(30.3 414.6)"
        width="100%"
        x={100}
        xlinkHref="#GDFlagIcon__d"
      />
    </svg>
  );
};

const FlagIconWithForwardedRef = forwardRef<SVGSVGElement, FlagIconProps>((iconProps, ref) => (
  <FlagIcon {...iconProps} svgRef={ref} />
));

export const GDFlagIcon = memo(createStyledFlagIcon(FlagIconWithForwardedRef));

GDFlagIcon.displayName = 'GDFlagIcon';
