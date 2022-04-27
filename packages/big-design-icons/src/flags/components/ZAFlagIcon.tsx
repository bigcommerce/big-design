// **********************************
// Auto-generated file, do NOT modify
// **********************************
import React, { forwardRef, memo } from 'react';

import { PrivateIconProps } from '../../base';
import { useUniqueId } from '../../utils';
import { createStyledFlagIcon, FlagIconProps } from '../base';

const FlagIcon: React.FC<FlagIconProps & PrivateIconProps> = ({
  svgRef,
  title = 'ZA flag',
  theme,
  ...props
}) => {
  const uniqueTitleId = useUniqueId('icon');
  const titleId = title ? props.titleId || uniqueTitleId : undefined;
  const ariaHidden = titleId ? undefined : true;

  return (
    <svg aria-hidden={ariaHidden} aria-labelledby={titleId} ref={svgRef} viewBox="0 0 640 480" {...props}>
      {title ? <title id={titleId}>{title}</title> : null}
      <defs>
        <clipPath id="ZAFlagIcon__a">
          <path d="M-71.9 0h682.7v512H-71.9z" fillOpacity={0.7} />
        </clipPath>
      </defs>
      <g clipPath="url(#ZAFlagIcon__a)" transform="translate(67.4) scale(.93748)">
        <g fillRule="evenodd" strokeWidth="1pt">
          <path d="M-71.9 407.8V104.4L154 256.1-72 407.8z" />
          <path d="M82.2 512.1l253.6-170.6H696V512H82.2z" fill="#00c" />
          <path d="M66 0h630v170.8H335.7S69.3-1.7 66 0z" fill="red" />
          <path d="M-71.9 64v40.4L154 256-72 407.8v40.3l284.5-192L-72 64z" fill="#fc0" />
          <path d="M-71.9 64V0h95l301.2 204h371.8v104.2H324.3L23 512h-94.9v-63.9l284.4-192L-71.8 64z" fill="#093" />
          <path
            d="M23 0h59.2l253.6 170.7H696V204H324.3L23 .1zm0 512.1h59.2l253.6-170.6H696v-33.2H324.3L23 512z"
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

export const ZAFlagIcon = memo(createStyledFlagIcon(FlagIconWithForwardedRef));

ZAFlagIcon.displayName = 'ZAFlagIcon';
