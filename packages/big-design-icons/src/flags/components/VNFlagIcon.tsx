// **********************************
// Auto-generated file, do NOT modify
// **********************************
import React, { forwardRef, memo, useId } from 'react';

import { PrivateIconProps } from '../../base';
import { createStyledFlagIcon, FlagIconProps } from '../base';

const FlagIcon: React.FC<FlagIconProps & PrivateIconProps> = ({
  svgRef,
  title = 'VN flag',
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
        <clipPath id="VNFlagIcon__a">
          <path d="M-85.3 0h682.6v512H-85.3z" fillOpacity={0.7} />
        </clipPath>
      </defs>
      <g clipPath="url(#VNFlagIcon__a)" fillRule="evenodd" transform="translate(80) scale(.9375)">
        <path d="M-128 0h768v512h-768z" fill="#da251d" />
        <path
          d="M349.6 381L260 314.3l-89 67.3L204 272l-89-67.7 110.1-1 34.2-109.4L294 203l110.1.1-88.5 68.4 33.9 109.6z"
          fill="#ff0"
        />
      </g>
    </svg>
  );
};

const FlagIconWithForwardedRef = forwardRef<SVGSVGElement, FlagIconProps>((iconProps, ref) => (
  <FlagIcon {...iconProps} svgRef={ref} />
));

export const VNFlagIcon = memo(createStyledFlagIcon(FlagIconWithForwardedRef));

VNFlagIcon.displayName = 'VNFlagIcon';
