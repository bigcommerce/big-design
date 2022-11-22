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
        <path d="M-120 0h763.3v511.5H-120z" fill="#fff" />
        <path d="M-118.3.6h760.9v216.1h-761z" />
        <path d="M21.3 203.2h505V317h-505z" fill="#0061ff" />
        <path d="M642.8 1.8V512H262L642.8 1.7zm-761.5 0V512H262L-118.7 1.7z" fill="#e20000" />
        <path
          d="M440.4 203.3L364 184l64.9-49-79.7 11.4 41-69.5-70.7 41L332.3 37l-47.9 63.8-19.3-74-21.7 76.3-47.8-65 13.7 83.2L138.5 78l41 69.5-77.4-12.5 63.8 47.8L86 203.3h354.3z"
          fill="#ffd600"
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
