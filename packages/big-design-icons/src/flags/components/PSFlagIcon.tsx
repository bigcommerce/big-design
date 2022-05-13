// **********************************
// Auto-generated file, do NOT modify
// **********************************
import React, { forwardRef, memo } from 'react';

import { PrivateIconProps } from '../../base';
import { useUniqueId } from '../../utils';
import { createStyledFlagIcon, FlagIconProps } from '../base';

const FlagIcon: React.FC<FlagIconProps & PrivateIconProps> = ({
  svgRef,
  title = 'PS flag',
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
        <clipPath id="PSFlagIcon__a">
          <path d="M-118 0h682.7v512H-118z" fillOpacity={0.7} />
        </clipPath>
      </defs>
      <g clipPath="url(#PSFlagIcon__a)" transform="translate(110.6) scale(.9375)">
        <g fillRule="evenodd" strokeWidth="1pt">
          <path d="M-246 0H778v170.7H-246z" />
          <path d="M-246 170.7H778v170.6H-246z" fill="#fff" />
          <path d="M-246 341.3H778V512H-246z" fill="#090" />
          <path d="M-246 512l512-256L-246 0v512z" fill="red" />
        </g>
      </g>
    </svg>
  );
};

const FlagIconWithForwardedRef = forwardRef<SVGSVGElement, FlagIconProps>((iconProps, ref) => (
  <FlagIcon {...iconProps} svgRef={ref} />
));

export const PSFlagIcon = memo(createStyledFlagIcon(FlagIconWithForwardedRef));

PSFlagIcon.displayName = 'PSFlagIcon';
