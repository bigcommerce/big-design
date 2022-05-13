// **********************************
// Auto-generated file, do NOT modify
// **********************************
import React, { forwardRef, memo } from 'react';

import { PrivateIconProps } from '../../base';
import { useUniqueId } from '../../utils';
import { createStyledFlagIcon, FlagIconProps } from '../base';

const FlagIcon: React.FC<FlagIconProps & PrivateIconProps> = ({
  svgRef,
  title = 'MM flag',
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
      xmlnsXlink="http://www.w3.org/1999/xlink"
      {...props}
    >
      {title ? <title id={titleId}>{title}</title> : null}
      <defs>
        <path d="M0-.5l.2.5h-.4z" fill="#fff" id="MMFlagIcon__a" transform="scale(8.844)" />
        <g id="MMFlagIcon__b">
          <use height={12} transform="rotate(-144)" width={18} xlinkHref="#MMFlagIcon__a" />
          <use height={12} transform="rotate(-72)" width={18} xlinkHref="#MMFlagIcon__a" />
          <use height={12} width={18} xlinkHref="#MMFlagIcon__a" />
          <use height={12} transform="rotate(72)" width={18} xlinkHref="#MMFlagIcon__a" />
          <use height={12} transform="rotate(144)" width={18} xlinkHref="#MMFlagIcon__a" />
        </g>
      </defs>
      <path d="M0-.1h640V160H0z" fill="#fecb00" />
      <path d="M0 320h640v160H0z" fill="#ea2839" />
      <path d="M0 160h640v160H0z" fill="#34b233" />
      <use
        height={12}
        transform="matrix(40 0 0 40 -40 0)"
        width={18}
        x={9}
        xlinkHref="#MMFlagIcon__b"
        y={6.4}
      />
    </svg>
  );
};

const FlagIconWithForwardedRef = forwardRef<SVGSVGElement, FlagIconProps>((iconProps, ref) => (
  <FlagIcon {...iconProps} svgRef={ref} />
));

export const MMFlagIcon = memo(createStyledFlagIcon(FlagIconWithForwardedRef));

MMFlagIcon.displayName = 'MMFlagIcon';
