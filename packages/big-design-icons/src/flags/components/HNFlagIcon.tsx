// **********************************
// Auto-generated file, do NOT modify
// **********************************
import React, { forwardRef, memo, useId } from 'react';

import { createStyledFlagIcon, FlagIconProps, PrivateIconProps } from '../base';

const FlagIcon: React.FC<FlagIconProps & PrivateIconProps> = ({
  svgRef,
  title = 'HN flag',
  theme,
  ...props
}) => {
  const uniqueTitleId = useId();
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
      <path d="M0 0h640v480H0z" fill="#18c3df" />
      <path d="M0 160h640v160H0z" fill="#fff" />
      <g fill="#18c3df" id="HNFlagIcon__c" transform="translate(320 240)scale(26.66665)">
        <g id="HNFlagIcon__b">
          <path d="m-.3 0 .5.1L0-1z" id="HNFlagIcon__a" />
          <use height="100%" transform="scale(-1 1)" width="100%" xlinkHref="#HNFlagIcon__a" />
        </g>
        <use height="100%" transform="rotate(72)" width="100%" xlinkHref="#HNFlagIcon__b" />
        <use height="100%" transform="rotate(-72)" width="100%" xlinkHref="#HNFlagIcon__b" />
        <use height="100%" transform="rotate(144)" width="100%" xlinkHref="#HNFlagIcon__b" />
        <use height="100%" transform="rotate(-144)" width="100%" xlinkHref="#HNFlagIcon__b" />
      </g>
      <use
        height="100%"
        transform="translate(133.3 -42.7)"
        width="100%"
        xlinkHref="#HNFlagIcon__c"
      />
      <use
        height="100%"
        transform="translate(133.3 37.3)"
        width="100%"
        xlinkHref="#HNFlagIcon__c"
      />
      <use
        height="100%"
        transform="translate(-133.3 -42.7)"
        width="100%"
        xlinkHref="#HNFlagIcon__c"
      />
      <use
        height="100%"
        transform="translate(-133.3 37.3)"
        width="100%"
        xlinkHref="#HNFlagIcon__c"
      />
    </svg>
  );
};
const FlagIconWithForwardedRef = forwardRef<SVGSVGElement, FlagIconProps>((iconProps, ref) => (
  <FlagIcon {...iconProps} svgRef={ref} />
));

export const HNFlagIcon = memo(createStyledFlagIcon(FlagIconWithForwardedRef));
HNFlagIcon.displayName = 'HNFlagIcon';
