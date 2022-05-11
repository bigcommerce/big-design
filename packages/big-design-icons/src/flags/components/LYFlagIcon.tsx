// **********************************
// Auto-generated file, do NOT modify
// **********************************
import React, { forwardRef, memo } from 'react';

import { PrivateIconProps } from '../../base';
import { useUniqueId } from '../../utils';
import { createStyledFlagIcon, FlagIconProps } from '../base';

const FlagIcon: React.FC<FlagIconProps & PrivateIconProps> = ({ svgRef, title = 'LY flag', theme, ...props }) => {
  const uniqueTitleId = useUniqueId('icon');
  const titleId = title ? props.titleId || uniqueTitleId : undefined;
  const ariaHidden = titleId ? undefined : true;

  return (
    <svg aria-hidden={ariaHidden} aria-labelledby={titleId} ref={svgRef} viewBox="0 0 640 480" {...props}>
      {title ? <title id={titleId}>{title}</title> : null}
      <defs>
        <clipPath id="LYFlagIcon__a">
          <path d="M166.7-20h666.6v500H166.7z" />
        </clipPath>
      </defs>
      <g clipPath="url(#LYFlagIcon__a)" transform="matrix(.96 0 0 .96 -160 19.2)">
        <path d="M0-20h1000v500H0z" fill="#239e46" />
        <path d="M0-20h1000v375H0z" />
        <path d="M0-20h1000v125H0z" fill="#e70013" />
        <path
          d="M544.2 185.8a54.3 54.3 0 100 88.4 62.5 62.5 0 110-88.4M530.4 230l84.1-27.3-52 71.5v-88.4l52 71.5z"
          fill="#fff"
        />
      </g>
    </svg>
  );
};

const FlagIconWithForwardedRef = forwardRef<SVGSVGElement, FlagIconProps>((iconProps, ref) => (
  <FlagIcon {...iconProps} svgRef={ref} />
));

export const LYFlagIcon = memo(createStyledFlagIcon(FlagIconWithForwardedRef));

LYFlagIcon.displayName = 'LYFlagIcon';
