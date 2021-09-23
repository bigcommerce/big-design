// **********************************
// Auto-generated file, do NOT modify
// **********************************
import React, { forwardRef, memo } from 'react';

import { PrivateIconProps } from '../../base';
import { useUniqueId } from '../../utils';
import { createStyledFlagIcon, FlagIconProps } from '../base';

const FlagIcon: React.FC<FlagIconProps & PrivateIconProps> = ({ svgRef, title = 'ST flag', theme, ...props }) => {
  const uniqueTitleId = useUniqueId('icon');
  const titleId = title ? props.titleId || uniqueTitleId : undefined;
  const ariaHidden = titleId ? undefined : true;

  return (
    <svg
      xmlnsXlink="http://www.w3.org/1999/xlink"
      viewBox="0 0 640 480"
      aria-hidden={ariaHidden}
      ref={svgRef}
      aria-labelledby={titleId}
      {...props}
    >
      {title ? <title id={titleId}>{title}</title> : null}
      <path fill="#12ad2b" d="M0 0h640v480H0z" />
      <path fill="#ffce00" d="M0 137.1h640V343H0z" />
      <path fill="#d21034" d="M0 0v480l240-240" />
      <g id="STFlagIcon__c" transform="translate(351.6 240) scale(.34286)">
        <g id="STFlagIcon__b">
          <path id="STFlagIcon__a" d="M0-200V0h100" transform="rotate(18 0 -200)" />
          <use width="100%" height="100%" transform="scale(-1 1)" xlinkHref="#STFlagIcon__a" />
        </g>
        <use width="100%" height="100%" transform="rotate(72)" xlinkHref="#STFlagIcon__b" />
        <use width="100%" height="100%" transform="rotate(144)" xlinkHref="#STFlagIcon__b" />
        <use width="100%" height="100%" transform="rotate(-144)" xlinkHref="#STFlagIcon__b" />
        <use width="100%" height="100%" transform="rotate(-72)" xlinkHref="#STFlagIcon__b" />
      </g>
      <use width="100%" height="100%" x={700} transform="translate(-523.2)" xlinkHref="#STFlagIcon__c" />
    </svg>
  );
};

const FlagIconWithForwardedRef = forwardRef<SVGSVGElement, FlagIconProps>((iconProps, ref) => (
  <FlagIcon {...iconProps} svgRef={ref} />
));

export const STFlagIcon = memo(createStyledFlagIcon(FlagIconWithForwardedRef as React.FC<FlagIconProps>));

STFlagIcon.displayName = 'STFlagIcon';
