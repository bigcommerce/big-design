// **********************************
// Auto-generated file, do NOT modify
// **********************************
import React, { forwardRef, memo, useId } from 'react';

import { PrivateIconProps } from '../../base';
import { createStyledFlagIcon, FlagIconProps } from '../base';

const FlagIcon: React.FC<FlagIconProps & PrivateIconProps> = ({
  svgRef,
  title = 'GM flag',
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
        <clipPath id="GMFlagIcon__a">
          <path d="M0-48h640v480H0z" fillOpacity={0.7} />
        </clipPath>
      </defs>
      <g
        clipPath="url(#GMFlagIcon__a)"
        fillRule="evenodd"
        strokeWidth="1pt"
        transform="translate(0 48)"
      >
        <path d="M0-128h640V85.3H0z" fill="red" />
        <path d="M0 85.3h640V121H0z" fill="#fff" />
        <path d="M0 120.9h640V263H0z" fill="#009" />
        <path d="M0 263.1h640v35.6H0z" fill="#fff" />
        <path d="M0 298.7h640V512H0z" fill="#090" />
      </g>
    </svg>
  );
};

const FlagIconWithForwardedRef = forwardRef<SVGSVGElement, FlagIconProps>((iconProps, ref) => (
  <FlagIcon {...iconProps} svgRef={ref} />
));

export const GMFlagIcon = memo(createStyledFlagIcon(FlagIconWithForwardedRef));

GMFlagIcon.displayName = 'GMFlagIcon';
