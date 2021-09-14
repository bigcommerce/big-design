// **********************************
// Auto-generated file, do NOT modify
// **********************************
import React, { forwardRef, memo } from 'react';

import { PrivateIconProps } from '../../base';
import { useUniqueId } from '../../utils';
import { createStyledFlagIcon, FlagIconProps } from '../base';

const FlagIcon: React.FC<FlagIconProps & PrivateIconProps> = ({ svgRef, title = 'IN flag', theme, ...props }) => {
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
      <path fill="#f93" d="M0 0h640v160H0z" />
      <path fill="#fff" d="M0 160h640v160H0z" />
      <path fill="#128807" d="M0 320h640v160H0z" />
      <g transform="matrix(3.2 0 0 3.2 320 240)">
        <circle r={20} fill="#008" />
        <circle r={17.5} fill="#fff" />
        <circle r={3.5} fill="#008" />
        <g id="INFlagIcon__d">
          <g id="INFlagIcon__c">
            <g id="INFlagIcon__b">
              <g id="INFlagIcon__a" fill="#008">
                <circle r={0.9} transform="rotate(7.5 -8.8 133.5)" />
                <path d="M0 17.5L.6 7 0 2l-.6 5L0 17.5z" />
              </g>
              <use width="100%" height="100%" transform="rotate(15)" xlinkHref="#INFlagIcon__a" />
            </g>
            <use width="100%" height="100%" transform="rotate(30)" xlinkHref="#INFlagIcon__b" />
          </g>
          <use width="100%" height="100%" transform="rotate(60)" xlinkHref="#INFlagIcon__c" />
        </g>
        <use width="100%" height="100%" transform="rotate(120)" xlinkHref="#INFlagIcon__d" />
        <use width="100%" height="100%" transform="rotate(-120)" xlinkHref="#INFlagIcon__d" />
      </g>
    </svg>
  );
};

const FlagIconWithForwardedRef = forwardRef<SVGSVGElement, FlagIconProps>((iconProps, ref) => (
  <FlagIcon {...iconProps} svgRef={ref} />
));

export const INFlagIcon = memo(createStyledFlagIcon(FlagIconWithForwardedRef as React.FC<FlagIconProps>));

INFlagIcon.displayName = 'INFlagIcon';
