// **********************************
// Auto-generated file, do NOT modify
// **********************************
import React, { forwardRef, memo } from 'react';

import { PrivateIconProps } from '../../base';
import { useUniqueId } from '../../utils';
import { createStyledFlagIcon, FlagIconProps } from '../base';

const FlagIcon: React.FC<FlagIconProps & PrivateIconProps> = ({
  svgRef,
  title = 'BJ flag',
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
        <clipPath id="BJFlagIcon__a">
          <path d="M67.6-154h666v666h-666z" fill="gray" />
        </clipPath>
      </defs>
      <g clipPath="url(#BJFlagIcon__a)" transform="matrix(.961 0 0 .7207 -65 111)">
        <g fillRule="evenodd" strokeWidth="1pt">
          <path d="M0-154h333v666H0z" fill="#319400" />
          <path d="M333-154h666v333H333z" fill="#ffd600" />
          <path d="M333 179h666v333H333z" fill="#de2110" />
        </g>
      </g>
    </svg>
  );
};

const FlagIconWithForwardedRef = forwardRef<SVGSVGElement, FlagIconProps>((iconProps, ref) => (
  <FlagIcon {...iconProps} svgRef={ref} />
));

export const BJFlagIcon = memo(createStyledFlagIcon(FlagIconWithForwardedRef));

BJFlagIcon.displayName = 'BJFlagIcon';
