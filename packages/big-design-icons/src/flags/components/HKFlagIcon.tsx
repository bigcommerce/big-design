// **********************************
// Auto-generated file, do NOT modify
// **********************************
import React, { forwardRef, memo, useId } from 'react';

import { createStyledFlagIcon, FlagIconProps, PrivateIconProps } from '../base';

const FlagIcon: React.FC<FlagIconProps & PrivateIconProps> = ({
  svgRef,
  title = 'HK flag',
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
      <path d="M0 0h640v480H0" fill="#EC1B2E" />
      <path
        d="M346.3 103.1C267 98 230.6 201.9 305.6 240.3c-26-22.4-20.6-55.3-10.1-72.4l1.9 1.1c-13.8 23.5-11.2 52.7 11.1 71-12.7-12.3-9.5-39 12.1-48.9s23.6-39.3 16.4-49.1q-14.7-25.6 9.3-38.9M307.9 164l-4.7 7.4-1.8-8.6-8.6-2.3 7.8-4.3-.6-8.9 6.5 6.1 8.3-3.3-3.7 8.1 5.6 6.8z"
        fill="#fff"
        id="HKFlagIcon__a"
      />
      <use transform="rotate(72 312.5 243.5)" xlinkHref="#HKFlagIcon__a" />
      <use transform="rotate(144 312.5 243.5)" xlinkHref="#HKFlagIcon__a" />
      <use transform="rotate(216 312.5 243.5)" xlinkHref="#HKFlagIcon__a" />
      <use transform="rotate(288 312.5 243.5)" xlinkHref="#HKFlagIcon__a" />
    </svg>
  );
};
const FlagIconWithForwardedRef = forwardRef<SVGSVGElement, FlagIconProps>((iconProps, ref) => (
  <FlagIcon {...iconProps} svgRef={ref} />
));

export const HKFlagIcon = memo(createStyledFlagIcon(FlagIconWithForwardedRef));
HKFlagIcon.displayName = 'HKFlagIcon';
