// **********************************
// Auto-generated file, do NOT modify
// **********************************
import React, { forwardRef, memo, useId } from 'react';

import { PrivateIconProps } from '../../base';
import { createStyledFlagIcon, FlagIconProps } from '../base';

const FlagIcon: React.FC<FlagIconProps & PrivateIconProps> = ({
  svgRef,
  title = 'AG flag',
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
        <clipPath id="AGFlagIcon__a">
          <path d="M-79.7 0H603v512H-79.7z" fillOpacity={0.7} />
        </clipPath>
      </defs>
      <g clipPath="url(#AGFlagIcon__a)" fillRule="evenodd" transform="translate(74.7) scale(.9375)">
        <path d="M-79.7 0H603v512H-79.7z" fill="#fff" />
        <path d="M-79.6 0H603v204.8H-79.7z" fill="#000001" />
        <path d="M21.3 203.2h480v112h-480z" fill="#0072c6" />
        <path d="M603 .1V512H261.6L603 0zM-79.7.1V512h341.3L-79.7 0z" fill="#ce1126" />
        <path
          d="M440.4 203.3L364 184l64.9-49-79.7 11.4 41-69.5-70.7 41L332.3 37l-47.9 63.8-19.3-74-21.7 76.3-47.8-65 13.7 83.2L138.5 78l41 69.5-77.4-12.5 63.8 47.8L86 203.3z"
          fill="#fcd116"
        />
      </g>
    </svg>
  );
};

const FlagIconWithForwardedRef = forwardRef<SVGSVGElement, FlagIconProps>((iconProps, ref) => (
  <FlagIcon {...iconProps} svgRef={ref} />
));

export const AGFlagIcon = memo(createStyledFlagIcon(FlagIconWithForwardedRef));

AGFlagIcon.displayName = 'AGFlagIcon';
