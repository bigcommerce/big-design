// **********************************
// Auto-generated file, do NOT modify
// **********************************
import React, { forwardRef, memo } from 'react';

import { PrivateIconProps } from '../../base';
import { useUniqueId } from '../../utils';
import { createStyledFlagIcon, FlagIconProps } from '../base';

const FlagIcon: React.FC<FlagIconProps & PrivateIconProps> = ({ svgRef, title = 'EU flag', theme, ...props }) => {
  const uniqueTitleId = useUniqueId('icon');
  const titleId = title ? props.titleId || uniqueTitleId : undefined;

  return (
    <svg viewBox="0 0 640 480" ref={svgRef} aria-labelledby={titleId} {...props}>
      {title ? <title id={titleId}>{title}</title> : null}
      <defs>
        <g id="EUFlagIcon__d">
          <g id="EUFlagIcon__b">
            <path id="EUFlagIcon__a" d="M0-1l-.3 1 .5.1z" />
            <use transform="scale(-1 1)" xlinkHref="#EUFlagIcon__a" />
          </g>
          <g id="EUFlagIcon__c">
            <use transform="rotate(72)" xlinkHref="#EUFlagIcon__b" />
            <use transform="rotate(144)" xlinkHref="#EUFlagIcon__b" />
          </g>
          <use transform="scale(-1 1)" xlinkHref="#EUFlagIcon__c" />
        </g>
      </defs>
      <path fill="#039" d="M0 0h640v480H0z" />
      <g fill="#fc0" transform="translate(320 242.3) scale(23.7037)">
        <use width="100%" height="100%" y={-6} xlinkHref="#EUFlagIcon__d" />
        <use width="100%" height="100%" y={6} xlinkHref="#EUFlagIcon__d" />
        <g id="EUFlagIcon__e">
          <use width="100%" height="100%" x={-6} xlinkHref="#EUFlagIcon__d" />
          <use width="100%" height="100%" transform="rotate(-144 -2.3 -2.1)" xlinkHref="#EUFlagIcon__d" />
          <use width="100%" height="100%" transform="rotate(144 -2.1 -2.3)" xlinkHref="#EUFlagIcon__d" />
          <use width="100%" height="100%" transform="rotate(72 -4.7 -2)" xlinkHref="#EUFlagIcon__d" />
          <use width="100%" height="100%" transform="rotate(72 -5 .5)" xlinkHref="#EUFlagIcon__d" />
        </g>
        <use width="100%" height="100%" transform="scale(-1 1)" xlinkHref="#EUFlagIcon__e" />
      </g>
    </svg>
  );
};

const FlagIconWithForwardedRef = forwardRef<SVGSVGElement, FlagIconProps>((iconProps, ref) => (
  <FlagIcon {...iconProps} svgRef={ref} />
));

export const EUFlagIcon = memo(createStyledFlagIcon(FlagIconWithForwardedRef as React.FC<FlagIconProps>));

EUFlagIcon.displayName = 'EUFlagIcon';
