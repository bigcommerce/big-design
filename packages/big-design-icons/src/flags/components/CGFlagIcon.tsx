// **********************************
// Auto-generated file, do NOT modify
// **********************************
import React, { forwardRef, memo } from 'react';

import { PrivateIconProps } from '../../base';
import { useUniqueId } from '../../utils';
import { createStyledFlagIcon, FlagIconProps } from '../base';

const FlagIcon: React.FC<FlagIconProps & PrivateIconProps> = ({
  svgRef,
  title = 'CG flag',
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
        <clipPath id="CGFlagIcon__a">
          <path d="M-79.5 32h640v480h-640z" fillOpacity={0.7} />
        </clipPath>
      </defs>
      <g
        clipPath="url(#CGFlagIcon__a)"
        fillRule="evenodd"
        strokeWidth="1pt"
        transform="translate(79.5 -32)"
      >
        <path d="M-119.5 32h720v480h-720z" fill="#ff0" />
        <path d="M-119.5 32v480l480-480h-480z" fill="#00ca00" />
        <path d="M120.5 512h480V32l-480 480z" fill="red" />
      </g>
    </svg>
  );
};

const FlagIconWithForwardedRef = forwardRef<SVGSVGElement, FlagIconProps>((iconProps, ref) => (
  <FlagIcon {...iconProps} svgRef={ref} />
));

export const CGFlagIcon = memo(createStyledFlagIcon(FlagIconWithForwardedRef));

CGFlagIcon.displayName = 'CGFlagIcon';
