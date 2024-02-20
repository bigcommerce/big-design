// **********************************
// Auto-generated file, do NOT modify
// **********************************
import React, { forwardRef, memo, useId } from 'react';

import { PrivateIconProps } from '../../base';
import { createStyledFlagIcon, FlagIconProps } from '../base';

const FlagIcon: React.FC<FlagIconProps & PrivateIconProps> = ({
  svgRef,
  title = 'KE flag',
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
      <defs>
        <path
          d="M-28.6 47.5l1.8 1 46.7-81c2.7-.6 4.2-3.2 5.7-5.8 1-1.8 5-8.7 6.7-17.7a58 58 0 00-11.9 14.7c-1.5 2.6-3 5.2-2.3 7.9z"
          id="KEFlagIcon__a"
          strokeMiterlimit={10}
        />
      </defs>
      <path d="M0 0h640v480H0z" fill="#fff" />
      <path d="M0 0h640v144H0z" fill="#000001" />
      <path d="M0 336h640v144H0z" fill="#060" />
      <g id="KEFlagIcon__b" transform="matrix(3 0 0 3 320 240)">
        <use height="100%" stroke="#000" width="100%" xlinkHref="#KEFlagIcon__a" />
        <use fill="#fff" height="100%" width="100%" xlinkHref="#KEFlagIcon__a" />
      </g>
      <use
        height="100%"
        transform="matrix(-1 0 0 1 640 0)"
        width="100%"
        xlinkHref="#KEFlagIcon__b"
      />
      <path
        d="M640.5 168H377c-9-24-39-72-57-72s-48 48-57 72H-.2v144H263c9 24 39 72 57 72s48-48 57-72h263.5z"
        fill="#b00"
      />
      <path
        d="M377 312c9-24 15-48 15-72s-6-48-15-72c-9 24-15 48-15 72s6 48 15 72"
        id="KEFlagIcon__c"
      />
      <use
        height="100%"
        transform="matrix(-1 0 0 1 640 0)"
        width="100%"
        xlinkHref="#KEFlagIcon__c"
      />
      <g fill="#fff" transform="matrix(3 0 0 3 320 240)">
        <ellipse rx={4} ry={6} />
        <path d="M1 5.8s4 8 4 21-4 21-4 21z" id="KEFlagIcon__d" />
        <use height="100%" transform="scale(-1)" width="100%" xlinkHref="#KEFlagIcon__d" />
        <use height="100%" transform="scale(-1 1)" width="100%" xlinkHref="#KEFlagIcon__d" />
        <use height="100%" transform="scale(1 -1)" width="100%" xlinkHref="#KEFlagIcon__d" />
      </g>
    </svg>
  );
};

const FlagIconWithForwardedRef = forwardRef<SVGSVGElement, FlagIconProps>((iconProps, ref) => (
  <FlagIcon {...iconProps} svgRef={ref} />
));

export const KEFlagIcon = memo(createStyledFlagIcon(FlagIconWithForwardedRef));

KEFlagIcon.displayName = 'KEFlagIcon';
