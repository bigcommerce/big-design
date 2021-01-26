// **********************************
// Auto-generated file, do NOT modify
// **********************************
import React, { forwardRef, memo } from 'react';

import { PrivateIconProps } from '../../base';
import { useUniqueId } from '../../utils';
import { createStyledFlagIcon, FlagIconProps } from '../base';

const FlagIcon: React.FC<FlagIconProps & PrivateIconProps> = ({ svgRef, title = 'MM flag', theme, ...props }) => {
  const uniqueTitleId = useUniqueId('icon');
  const titleId = title ? props.titleId || uniqueTitleId : undefined;

  return (
    <svg viewBox="0 0 640 480" ref={svgRef} aria-labelledby={titleId} {...props}>
      {title ? <title id={titleId}>{title}</title> : null}
      <defs>
        <path id="MMFlagIcon__a" fill="#fff" d="M0-.5l.2.5h-.4z" transform="scale(8.844)" />
        <g id="MMFlagIcon__b">
          <use width={18} height={12} transform="rotate(-144)" xlinkHref="#MMFlagIcon__a" />
          <use width={18} height={12} transform="rotate(-72)" xlinkHref="#MMFlagIcon__a" />
          <use width={18} height={12} xlinkHref="#MMFlagIcon__a" />
          <use width={18} height={12} transform="rotate(72)" xlinkHref="#MMFlagIcon__a" />
          <use width={18} height={12} transform="rotate(144)" xlinkHref="#MMFlagIcon__a" />
        </g>
      </defs>
      <path fill="#fecb00" d="M0-.1h640V160H0z" />
      <path fill="#ea2839" d="M0 320h640v160H0z" />
      <path fill="#34b233" d="M0 160h640v160H0z" />
      <use width={18} height={12} x={9} y={6.4} transform="matrix(40 0 0 40 -40 0)" xlinkHref="#MMFlagIcon__b" />
    </svg>
  );
};

const FlagIconWithForwardedRef = forwardRef<SVGSVGElement, FlagIconProps>((iconProps, ref) => (
  <FlagIcon {...iconProps} svgRef={ref} />
));

export const MMFlagIcon = memo(createStyledFlagIcon(FlagIconWithForwardedRef as React.FC<FlagIconProps>));

MMFlagIcon.displayName = 'MMFlagIcon';
