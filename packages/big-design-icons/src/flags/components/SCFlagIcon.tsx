// **********************************
// Auto-generated file, do NOT modify
// **********************************
import React, { forwardRef, memo } from 'react';

import { PrivateIconProps } from '../../base';
import { useUniqueId } from '../../utils';
import { createStyledFlagIcon, FlagIconProps } from '../base';

const FlagIcon: React.FC<FlagIconProps & PrivateIconProps> = ({
  svgRef,
  title = 'SC flag',
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
        <clipPath id="SCFlagIcon__a">
          <path d="M0 0h682.7v512H0z" fillOpacity={0.7} />
        </clipPath>
      </defs>
      <g
        clipPath="url(#SCFlagIcon__a)"
        fillRule="evenodd"
        strokeWidth="1pt"
        transform="scale(.9375)"
      >
        <path d="M0 0h992.1v512H0z" fill="red" />
        <path d="M0 512l992.1-170.7V512H0z" fill="#090" />
        <path d="M0 512l992.1-341.3v170.6L0 512z" fill="#fff" />
        <path d="M0 512V0h330.7L0 512z" fill="#009" />
        <path d="M0 512L330.7 0h330.7L0 512z" fill="#ff0" />
      </g>
    </svg>
  );
};

const FlagIconWithForwardedRef = forwardRef<SVGSVGElement, FlagIconProps>((iconProps, ref) => (
  <FlagIcon {...iconProps} svgRef={ref} />
));

export const SCFlagIcon = memo(createStyledFlagIcon(FlagIconWithForwardedRef));

SCFlagIcon.displayName = 'SCFlagIcon';
