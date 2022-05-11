// **********************************
// Auto-generated file, do NOT modify
// **********************************
import React, { forwardRef, memo } from 'react';

import { PrivateIconProps } from '../../base';
import { useUniqueId } from '../../utils';
import { createStyledFlagIcon, FlagIconProps } from '../base';

const FlagIcon: React.FC<FlagIconProps & PrivateIconProps> = ({ svgRef, title = 'KW flag', theme, ...props }) => {
  const uniqueTitleId = useUniqueId('icon');
  const titleId = title ? props.titleId || uniqueTitleId : undefined;
  const ariaHidden = titleId ? undefined : true;

  return (
    <svg aria-hidden={ariaHidden} aria-labelledby={titleId} ref={svgRef} viewBox="0 0 640 480" {...props}>
      {title ? <title id={titleId}>{title}</title> : null}
      <defs>
        <clipPath id="KWFlagIcon__a">
          <path d="M0 0h682.7v512H0z" fillOpacity={0.7} />
        </clipPath>
      </defs>
      <g clipPath="url(#KWFlagIcon__a)" fillRule="evenodd" strokeWidth="1pt" transform="scale(.9375)">
        <path d="M0 170.6h1024v170.7H0z" fill="#fff" />
        <path d="M0 341.3h1024V512H0z" fill="#f31830" />
        <path d="M0 0h1024v170.7H0z" fill="#00d941" />
        <path d="M0 0v512l255.4-170.7.6-170.8L0 0z" />
      </g>
    </svg>
  );
};

const FlagIconWithForwardedRef = forwardRef<SVGSVGElement, FlagIconProps>((iconProps, ref) => (
  <FlagIcon {...iconProps} svgRef={ref} />
));

export const KWFlagIcon = memo(createStyledFlagIcon(FlagIconWithForwardedRef));

KWFlagIcon.displayName = 'KWFlagIcon';
