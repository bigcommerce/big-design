// **********************************
// Auto-generated file, do NOT modify
// **********************************
import React, { forwardRef, memo, useId } from 'react';

import { createStyledFlagIcon, FlagIconProps, PrivateIconProps } from '../base';

const FlagIcon: React.FC<FlagIconProps & PrivateIconProps> = ({
  svgRef,
  title = 'MY flag',
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
      <g clipPath="url(#MYFlagIcon__a)">
        <path d="M0 0h640v480H0z" fill="#C00" />
        <path d="M0 0h640v34.3H0z" fill="#C00" />
        <path d="M0 34.3h640v34.3H0z" fill="#fff" />
        <path d="M0 68.6h640v34.3H0z" fill="#C00" />
        <path d="M0 102.9h640V137H0z" fill="#fff" />
        <path d="M0 137.1h640v34.3H0z" fill="#C00" />
        <path d="M0 171.4h640v34.3H0z" fill="#fff" />
        <path d="M0 205.7h640V240H0z" fill="#C00" />
        <path d="M0 240h640v34.3H0z" fill="#fff" />
        <path d="M0 274.3h640v34.3H0z" fill="#C00" />
        <path d="M0 308.6h640v34.3H0z" fill="#fff" />
        <path d="M0 342.9h640V377H0z" fill="#C00" />
        <path d="M0 377.1h640v34.3H0z" fill="#fff" />
        <path d="M0 411.4h640v34.3H0z" fill="#C00" />
        <path d="M0 445.7h640V480H0z" fill="#fff" />
        <path d="M0 .5h320v274.3H0z" fill="#006" />
        <path
          d="m207.5 73.8 6 40.7 23-34-12.4 39.2 35.5-20.8-28.1 30 41-3.2-38.3 14.8 38.3 14.8-41-3.2 28.1 30-35.5-20.8 12.3 39.3-23-34.1-6 40.7-5.9-40.7-23 34 12.4-39.2-35.5 20.8 28-30-41 3.2 38.4-14.8-38.3-14.8 41 3.2-28.1-30 35.5 20.8-12.4-39.3 23 34.1zm-33.3 1.7a71.1 71.1 0 0 0-100 65 71.1 71.1 0 0 0 100 65 80 80 0 0 1-83.2 6.2 80 80 0 0 1-43.4-71.2 80 80 0 0 1 126.6-65"
          fill="#FC0"
        />
      </g>
      <defs>
        <clipPath id="MYFlagIcon__a">
          <path d="M0 0h640v480H0z" fill="#fff" />
        </clipPath>
      </defs>
    </svg>
  );
};
const FlagIconWithForwardedRef = forwardRef<SVGSVGElement, FlagIconProps>((iconProps, ref) => (
  <FlagIcon {...iconProps} svgRef={ref} />
));

export const MYFlagIcon = memo(createStyledFlagIcon(FlagIconWithForwardedRef));
MYFlagIcon.displayName = 'MYFlagIcon';
