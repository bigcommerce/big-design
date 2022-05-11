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
      aria-hidden={ariaHidden}
      aria-labelledby={titleId}
      ref={svgRef}
      viewBox="0 0 640 480"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      {...props}
    >
      {title ? <title id={titleId}>{title}</title> : null}
      <path d="M0 0h640v480H0z" fill="#12ad2b" />
      <path d="M0 137.1h640V343H0z" fill="#ffce00" />
      <path d="M0 0v480l240-240" fill="#d21034" />
      <g id="STFlagIcon__c" transform="translate(351.6 240) scale(.34286)">
        <g id="STFlagIcon__b">
          <path d="M0-200V0h100" id="STFlagIcon__a" transform="rotate(18 0 -200)" />
          <use height="100%" transform="scale(-1 1)" width="100%" xlinkHref="#STFlagIcon__a" />
        </g>
        <use height="100%" transform="rotate(72)" width="100%" xlinkHref="#STFlagIcon__b" />
        <use height="100%" transform="rotate(144)" width="100%" xlinkHref="#STFlagIcon__b" />
        <use height="100%" transform="rotate(-144)" width="100%" xlinkHref="#STFlagIcon__b" />
        <use height="100%" transform="rotate(-72)" width="100%" xlinkHref="#STFlagIcon__b" />
      </g>
      <use height="100%" transform="translate(-523.2)" width="100%" x={700} xlinkHref="#STFlagIcon__c" />
    </svg>
  );
};

const FlagIconWithForwardedRef = forwardRef<SVGSVGElement, FlagIconProps>((iconProps, ref) => (
  <FlagIcon {...iconProps} svgRef={ref} />
));

export const STFlagIcon = memo(createStyledFlagIcon(FlagIconWithForwardedRef));

STFlagIcon.displayName = 'STFlagIcon';
