// **********************************
// Auto-generated file, do NOT modify
// **********************************
import React, { forwardRef, memo, useId } from 'react';

import { PrivateIconProps } from '../../base';
import { createStyledFlagIcon, FlagIconProps } from '../base';

const FlagIcon: React.FC<FlagIconProps & PrivateIconProps> = ({
  svgRef,
  title = 'KP flag',
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
        <clipPath id="KPFlagIcon__a">
          <path d="M5 .1h682.6V512H5.1z" fillOpacity={0.7} />
        </clipPath>
      </defs>
      <g
        clipPath="url(#KPFlagIcon__a)"
        fillRule="evenodd"
        transform="translate(-4.8 -.1) scale(.93768)"
      >
        <path d="M776 511.5H-76V.5h852z" fill="#fff" stroke="#000" />
        <path d="M776 419H-76v92.5h852z" fill="#3e5698" />
        <path d="M776 397.6H-76V114.4h852z" fill="#c60000" />
        <path d="M776 .6H-76V93h852z" fill="#3e5698" />
        <path
          d="M328.5 256c0 63.5-53 115-118.6 115S91.3 319.5 91.3 256s53-114.8 118.6-114.8c65.5 0 118.6 51.4 118.6 114.9z"
          fill="#fff"
        />
        <path
          d="M175.8 270.6l-57-40.7 71-.2 22.7-66.4 21.1 66.1 71-.4-57.9 41.2 21.3 66.1-57-40.7-58 41.3z"
          fill="#c40000"
        />
      </g>
    </svg>
  );
};

const FlagIconWithForwardedRef = forwardRef<SVGSVGElement, FlagIconProps>((iconProps, ref) => (
  <FlagIcon {...iconProps} svgRef={ref} />
));

export const KPFlagIcon = memo(createStyledFlagIcon(FlagIconWithForwardedRef));

KPFlagIcon.displayName = 'KPFlagIcon';
