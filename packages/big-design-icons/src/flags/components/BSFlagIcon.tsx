// **********************************
// Auto-generated file, do NOT modify
// **********************************
import React, { forwardRef, memo } from 'react';

import { PrivateIconProps } from '../../base';
import { useUniqueId } from '../../utils';
import { createStyledFlagIcon, FlagIconProps } from '../base';

const FlagIcon: React.FC<FlagIconProps & PrivateIconProps> = ({
  svgRef,
  title = 'BS flag',
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
        <clipPath id="BSFlagIcon__a">
          <path d="M-12 0h640v480H-12z" fillOpacity={0.7} />
        </clipPath>
      </defs>
      <g clipPath="url(#BSFlagIcon__a)" fillRule="evenodd" transform="translate(12)">
        <path d="M968.5 480h-979V1.8h979z" fill="#fff" />
        <path d="M968.5 344.5h-979V143.3h979z" fill="#ffe900" />
        <path d="M968.5 480h-979V320.6h979zm0-318.7h-979V2h979z" fill="#08ced6" />
        <path d="M-11 0c2.3 0 391.8 236.8 391.8 236.8L-12 479.2-10.9 0z" />
      </g>
    </svg>
  );
};

const FlagIconWithForwardedRef = forwardRef<SVGSVGElement, FlagIconProps>((iconProps, ref) => (
  <FlagIcon {...iconProps} svgRef={ref} />
));

export const BSFlagIcon = memo(createStyledFlagIcon(FlagIconWithForwardedRef));

BSFlagIcon.displayName = 'BSFlagIcon';
