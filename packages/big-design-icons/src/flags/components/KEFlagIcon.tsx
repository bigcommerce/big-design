// **********************************
// Auto-generated file, do NOT modify
// **********************************
import React, { forwardRef, memo } from 'react';

import { PrivateIconProps } from '../../base';
import { useUniqueId } from '../../utils';
import { createStyledFlagIcon, FlagIconProps } from '../base';

const FlagIcon: React.FC<FlagIconProps & PrivateIconProps> = ({ svgRef, title = 'KE flag', theme, ...props }) => {
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
      <defs>
        <path
          id="KEFlagIcon__a"
          strokeMiterlimit={10}
          d="M-28.6 47.5l1.8 1 46.7-81c2.7-.6 4.2-3.2 5.7-5.8 1-1.8 5-8.7 6.7-17.7a58 58 0 00-11.9 14.7c-1.5 2.6-3 5.2-2.3 7.9z"
        />
      </defs>
      <path fill="#fff" d="M0 0h640v480H0z" />
      <path d="M0 0h640v144H0z" />
      <path fill="#060" d="M0 336h640v144H0z" />
      <g id="KEFlagIcon__b" transform="matrix(3 0 0 3 320 240)">
        <use width="100%" height="100%" stroke="#000" xlinkHref="#KEFlagIcon__a" />
        <use width="100%" height="100%" fill="#fff" xlinkHref="#KEFlagIcon__a" />
      </g>
      <use width="100%" height="100%" transform="matrix(-1 0 0 1 640 0)" xlinkHref="#KEFlagIcon__b" />
      <path
        fill="#b00"
        d="M640.5 168H377c-9-24-39-72-57-72s-48 48-57 72H-.2v144H263c9 24 39 72 57 72s48-48 57-72h263.5V168z"
      />
      <path id="KEFlagIcon__c" d="M377 312c9-24 15-48 15-72s-6-48-15-72c-9 24-15 48-15 72s6 48 15 72" />
      <use width="100%" height="100%" transform="matrix(-1 0 0 1 640 0)" xlinkHref="#KEFlagIcon__c" />
      <g fill="#fff" transform="matrix(3 0 0 3 320 240)">
        <ellipse rx={4} ry={6} />
        <path id="KEFlagIcon__d" d="M1 5.8s4 8 4 21-4 21-4 21z" />
        <use width="100%" height="100%" transform="scale(-1)" xlinkHref="#KEFlagIcon__d" />
        <use width="100%" height="100%" transform="scale(-1 1)" xlinkHref="#KEFlagIcon__d" />
        <use width="100%" height="100%" transform="scale(1 -1)" xlinkHref="#KEFlagIcon__d" />
      </g>
    </svg>
  );
};

const FlagIconWithForwardedRef = forwardRef<SVGSVGElement, FlagIconProps>((iconProps, ref) => (
  <FlagIcon {...iconProps} svgRef={ref} />
));

export const KEFlagIcon = memo(createStyledFlagIcon(FlagIconWithForwardedRef as React.FC<FlagIconProps>));

KEFlagIcon.displayName = 'KEFlagIcon';
