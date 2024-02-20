// **********************************
// Auto-generated file, do NOT modify
// **********************************
import React, { forwardRef, memo, useId } from 'react';

import { PrivateIconProps } from '../../base';
import { createStyledFlagIcon, FlagIconProps } from '../base';

const FlagIcon: React.FC<FlagIconProps & PrivateIconProps> = ({
  svgRef,
  title = 'LA flag',
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
        <clipPath id="LAFlagIcon__a">
          <path d="M0 0h640v480H0z" fillOpacity={0.7} />
        </clipPath>
      </defs>
      <g clipPath="url(#LAFlagIcon__a)" fillRule="evenodd">
        <path d="M-40 0h720v480H-40z" fill="#ce1126" />
        <path d="M-40 119.3h720v241.4H-40z" fill="#002868" />
        <path d="M423.4 240a103.4 103.4 0 11-206.8 0 103.4 103.4 0 11206.8 0" fill="#fff" />
      </g>
    </svg>
  );
};

const FlagIconWithForwardedRef = forwardRef<SVGSVGElement, FlagIconProps>((iconProps, ref) => (
  <FlagIcon {...iconProps} svgRef={ref} />
));

export const LAFlagIcon = memo(createStyledFlagIcon(FlagIconWithForwardedRef));

LAFlagIcon.displayName = 'LAFlagIcon';
