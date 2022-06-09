// **********************************
// Auto-generated file, do NOT modify
// **********************************
import React, { forwardRef, memo } from 'react';

import { PrivateIconProps } from '../../base';
import { useUniqueId } from '../../utils';
import { createStyledFlagIcon, FlagIconProps } from '../base';

const FlagIcon: React.FC<FlagIconProps & PrivateIconProps> = ({
  svgRef,
  title = 'DJ flag',
  theme,
  ...props
}) => {
  const uniqueTitleId = useUniqueId('icon');
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
        <clipPath id="DJFlagIcon__a">
          <path d="M-40 0h682.7v512H-40z" fillOpacity={0.7} />
        </clipPath>
      </defs>
      <g clipPath="url(#DJFlagIcon__a)" fillRule="evenodd" transform="translate(37.5) scale(.94)">
        <path d="M-40 0h768v512H-40z" fill="#0c0" />
        <path d="M-40 0h768v256H-40z" fill="#69f" />
        <path d="M-40 0l382.7 255.7L-40 511V0z" fill="#fffefe" />
        <path
          d="M119.8 292L89 270l-30.7 22.4L69.7 256l-30.6-22.5 37.9-.3 11.7-36.3 12 36.2h37.9l-30.5 22.7 11.7 36.4z"
          fill="red"
        />
      </g>
    </svg>
  );
};

const FlagIconWithForwardedRef = forwardRef<SVGSVGElement, FlagIconProps>((iconProps, ref) => (
  <FlagIcon {...iconProps} svgRef={ref} />
));

export const DJFlagIcon = memo(createStyledFlagIcon(FlagIconWithForwardedRef));

DJFlagIcon.displayName = 'DJFlagIcon';
