// **********************************
// Auto-generated file, do NOT modify
// **********************************
import React, { forwardRef, memo } from 'react';

import { PrivateIconProps } from '../../base';
import { useUniqueId } from '../../utils';
import { createStyledFlagIcon, FlagIconProps } from '../base';

const FlagIcon: React.FC<FlagIconProps & PrivateIconProps> = ({ svgRef, title = 'GW flag', theme, ...props }) => {
  const uniqueTitleId = useUniqueId('icon');
  const titleId = title ? props.titleId || uniqueTitleId : undefined;

  return (
    <svg viewBox="0 0 640 480" ref={svgRef} aria-labelledby={titleId} {...props}>
      {title ? <title id={titleId}>{title}</title> : null}
      <path fill="#ce1126" d="M0 0h220v480H0z" />
      <path fill="#fcd116" d="M220 0h420v240H220z" />
      <path fill="#009e49" d="M220 240h420v240H220z" />
      <g id="GWFlagIcon__b" transform="matrix(80 0 0 80 110 240)">
        <path id="GWFlagIcon__a" d="M0-1v1h.5" transform="rotate(18 0 -1)" />
        <use width="100%" height="100%" transform="scale(-1 1)" xlinkHref="#GWFlagIcon__a" />
      </g>
      <use width="100%" height="100%" transform="rotate(72 110 240)" xlinkHref="#GWFlagIcon__b" />
      <use width="100%" height="100%" transform="rotate(144 110 240)" xlinkHref="#GWFlagIcon__b" />
      <use width="100%" height="100%" transform="rotate(-144 110 240)" xlinkHref="#GWFlagIcon__b" />
      <use width="100%" height="100%" transform="rotate(-72 110 240)" xlinkHref="#GWFlagIcon__b" />
    </svg>
  );
};

const FlagIconWithForwardedRef = forwardRef<SVGSVGElement, FlagIconProps>((iconProps, ref) => (
  <FlagIcon {...iconProps} svgRef={ref} />
));

export const GWFlagIcon = memo(createStyledFlagIcon(FlagIconWithForwardedRef as React.FC<FlagIconProps>));

GWFlagIcon.displayName = 'GWFlagIcon';
