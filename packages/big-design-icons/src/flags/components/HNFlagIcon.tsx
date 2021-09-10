// **********************************
// Auto-generated file, do NOT modify
// **********************************
import React, { forwardRef, memo } from 'react';

import { PrivateIconProps } from '../../base';
import { useUniqueId } from '../../utils';
import { createStyledFlagIcon, FlagIconProps } from '../base';

const FlagIcon: React.FC<FlagIconProps & PrivateIconProps> = ({ svgRef, title = 'HN flag', theme, ...props }) => {
  const uniqueTitleId = useUniqueId('icon');
  const titleId = title ? props.titleId || uniqueTitleId : undefined;

  return (
    <svg
      xmlnsXlink="http://www.w3.org/1999/xlink"
      viewBox="0 0 640 480"
      ref={svgRef}
      aria-labelledby={titleId}
      {...props}
    >
      {title ? <title id={titleId}>{title}</title> : null}
      <path fill="#0073cf" d="M0 0h640v480H0z" />
      <path fill="#fff" d="M0 160h640v160H0z" />
      <g id="HNFlagIcon__c" fill="#0073cf" transform="translate(320 240) scale(26.66665)">
        <g id="HNFlagIcon__b">
          <path id="HNFlagIcon__a" d="M-.3 0l.5.1L0-1z" />
          <use width="100%" height="100%" transform="scale(-1 1)" xlinkHref="#HNFlagIcon__a" />
        </g>
        <use width="100%" height="100%" transform="rotate(72)" xlinkHref="#HNFlagIcon__b" />
        <use width="100%" height="100%" transform="rotate(-72)" xlinkHref="#HNFlagIcon__b" />
        <use width="100%" height="100%" transform="rotate(144)" xlinkHref="#HNFlagIcon__b" />
        <use width="100%" height="100%" transform="rotate(-144)" xlinkHref="#HNFlagIcon__b" />
      </g>
      <use width="100%" height="100%" transform="translate(133.3 -42.7)" xlinkHref="#HNFlagIcon__c" />
      <use width="100%" height="100%" transform="translate(133.3 37.3)" xlinkHref="#HNFlagIcon__c" />
      <use width="100%" height="100%" transform="translate(-133.3 -42.7)" xlinkHref="#HNFlagIcon__c" />
      <use width="100%" height="100%" transform="translate(-133.3 37.3)" xlinkHref="#HNFlagIcon__c" />
    </svg>
  );
};

const FlagIconWithForwardedRef = forwardRef<SVGSVGElement, FlagIconProps>((iconProps, ref) => (
  <FlagIcon aria-hidden={iconProps.title ? undefined : true} {...iconProps} svgRef={ref} />
));

export const HNFlagIcon = memo(createStyledFlagIcon(FlagIconWithForwardedRef as React.FC<FlagIconProps>));

HNFlagIcon.displayName = 'HNFlagIcon';
