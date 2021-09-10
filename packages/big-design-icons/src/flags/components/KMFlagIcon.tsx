// **********************************
// Auto-generated file, do NOT modify
// **********************************
import React, { forwardRef, memo } from 'react';

import { PrivateIconProps } from '../../base';
import { useUniqueId } from '../../utils';
import { createStyledFlagIcon, FlagIconProps } from '../base';

const FlagIcon: React.FC<FlagIconProps & PrivateIconProps> = ({ svgRef, title = 'KM flag', theme, ...props }) => {
  const uniqueTitleId = useUniqueId('icon');
  const titleId = title ? props.titleId || uniqueTitleId : undefined;

  return (
    <svg viewBox="0 0 640 480" ref={svgRef} aria-labelledby={titleId} {...props}>
      {title ? <title id={titleId}>{title}</title> : null}
      <defs>
        <clipPath id="KMFlagIcon__a">
          <path fillOpacity={0.7} d="M0 0h682.7v512H0z" />
        </clipPath>
      </defs>
      <g fillRule="evenodd" clipPath="url(#KMFlagIcon__a)" transform="scale(.9375)">
        <path fill="#ff0" d="M0 0h768.8v128H0z" />
        <path fill="#fff" d="M0 128h768.8v128H0z" />
        <path fill="#be0027" d="M0 256h768.8v128H0z" />
        <path fill="#3b5aa3" d="M0 384h768.8v128H0z" />
        <path fill="#239e46" d="M0 0v512l381.9-255.3L0 0z" />
        <path
          fill="#fff"
          d="M157.2 141.4c-85-4.3-123.9 63.5-123.8 115.9-.2 62 58.6 113 112.8 110C117 353.5 81.2 314.6 81 257c-.3-52.1 29.5-97.5 76.3-115.6z"
        />
        <path
          fill="#fff"
          d="M156 197l-12-9.3-14.6 4.6 5.2-14.4-8.8-12.4 15.2.6 9-12.3 4.3 14.7 14.4 4.8-12.6 8.5zm-.3 52.1l-12-9.4-14.6 4.6 5.3-14.3-8.9-12.4 15.3.5 9-12.2 4.2 14.6 14.5 4.9-12.7 8.5zm.2 52.6l-12-9.4-14.5 4.6 5.2-14.3-8.8-12.4 15.2.5 9-12.2 4.3 14.6 14.4 4.8-12.6 8.6zm-.2 53l-12-9.3L129 350l5.3-14.4-8.9-12.4 15.3.6 9-12.3 4.2 14.7 14.5 4.8-12.7 8.5z"
        />
      </g>
    </svg>
  );
};

const FlagIconWithForwardedRef = forwardRef<SVGSVGElement, FlagIconProps>((iconProps, ref) => (
  <FlagIcon aria-hidden={iconProps.title ? undefined : true} {...iconProps} svgRef={ref} />
));

export const KMFlagIcon = memo(createStyledFlagIcon(FlagIconWithForwardedRef as React.FC<FlagIconProps>));

KMFlagIcon.displayName = 'KMFlagIcon';
