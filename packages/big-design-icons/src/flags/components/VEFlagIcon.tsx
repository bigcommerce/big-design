// **********************************
// Auto-generated file, do NOT modify
// **********************************
import React, { forwardRef, memo } from 'react';

import { PrivateIconProps } from '../../base';
import { useUniqueId } from '../../utils';
import { createStyledFlagIcon, FlagIconProps } from '../base';

const FlagIcon: React.FC<FlagIconProps & PrivateIconProps> = ({ svgRef, title = 'VE flag', theme, ...props }) => {
  const uniqueTitleId = useUniqueId('icon');
  const titleId = title ? props.titleId || uniqueTitleId : undefined;

  return (
    <svg viewBox="0 0 640 480" ref={svgRef} aria-labelledby={titleId} {...props}>
      {title ? <title id={titleId}>{title}</title> : null}
      <defs>
        <g id="VEFlagIcon__d" transform="translate(0 -36)">
          <g id="VEFlagIcon__c">
            <g id="VEFlagIcon__b">
              <path id="VEFlagIcon__a" fill="#fff" d="M0-5L-1.5-.2l2.8.9z" />
              <use width={180} height={120} transform="scale(-1 1)" xlinkHref="#VEFlagIcon__a" />
            </g>
            <use width={180} height={120} transform="rotate(72)" xlinkHref="#VEFlagIcon__b" />
          </g>
          <use width={180} height={120} transform="rotate(-72)" xlinkHref="#VEFlagIcon__b" />
          <use width={180} height={120} transform="rotate(144)" xlinkHref="#VEFlagIcon__c" />
        </g>
      </defs>
      <path fill="#cf142b" d="M0 0h640v480H0z" />
      <path fill="#00247d" d="M0 0h640v320H0z" />
      <path fill="#fc0" d="M0 0h640v160H0z" />
      <g id="VEFlagIcon__f" transform="matrix(4 0 0 4 320 336)">
        <g id="VEFlagIcon__e">
          <use width={180} height={120} transform="rotate(10)" xlinkHref="#VEFlagIcon__d" />
          <use width={180} height={120} transform="rotate(30)" xlinkHref="#VEFlagIcon__d" />
        </g>
        <use width={180} height={120} transform="rotate(40)" xlinkHref="#VEFlagIcon__e" />
      </g>
      <use width={180} height={120} transform="rotate(-80 320 336)" xlinkHref="#VEFlagIcon__f" />
    </svg>
  );
};

const FlagIconWithForwardedRef = forwardRef<SVGSVGElement, FlagIconProps>((iconProps, ref) => (
  <FlagIcon {...iconProps} svgRef={ref} />
));

export const VEFlagIcon = memo(createStyledFlagIcon(FlagIconWithForwardedRef as React.FC<FlagIconProps>));

VEFlagIcon.displayName = 'VEFlagIcon';
