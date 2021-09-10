// **********************************
// Auto-generated file, do NOT modify
// **********************************
import React, { forwardRef, memo } from 'react';

import { PrivateIconProps } from '../../base';
import { useUniqueId } from '../../utils';
import { createStyledFlagIcon, FlagIconProps } from '../base';

const FlagIcon: React.FC<FlagIconProps & PrivateIconProps> = ({ svgRef, title = 'AR flag', theme, ...props }) => {
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
      <path fill="#74acdf" d="M0 0h640v480H0z" />
      <path fill="#fff" d="M0 160h640v160H0z" />
      <g id="ARFlagIcon__c" transform="translate(-64) scale(.96)">
        <path
          id="ARFlagIcon__a"
          fill="#f6b40e"
          stroke="#85340a"
          strokeWidth={1.1}
          d="M396.8 251.3l28.5 62s.5 1.2 1.3.9c.8-.4.3-1.5.3-1.5l-23.7-64m-.7 24.1c-.4 9.4 5.4 14.6 4.7 23-.8 8.5 3.8 13.2 5 16.5 1 3.3-1.3 5.2-.3 5.7s3-2.1 2.4-6.8c-.7-4.6-4.2-6-3.4-16.3.8-10.3-4.2-12.7-3-22"
        />
        <use width="100%" height="100%" transform="rotate(22.5 400 250)" xlinkHref="#ARFlagIcon__a" />
        <use width="100%" height="100%" transform="rotate(45 400 250)" xlinkHref="#ARFlagIcon__a" />
        <use width="100%" height="100%" transform="rotate(67.5 400 250)" xlinkHref="#ARFlagIcon__a" />
        <path
          id="ARFlagIcon__b"
          fill="#85340a"
          d="M404.3 274.4c.5 9 5.6 13 4.6 21.3 2.2-6.5-3.1-11.6-2.8-21.2m-7.7-23.8l19.5 42.6-16.3-43.9"
        />
        <use width="100%" height="100%" transform="rotate(22.5 400 250)" xlinkHref="#ARFlagIcon__b" />
        <use width="100%" height="100%" transform="rotate(45 400 250)" xlinkHref="#ARFlagIcon__b" />
        <use width="100%" height="100%" transform="rotate(67.5 400 250)" xlinkHref="#ARFlagIcon__b" />
      </g>
      <use width="100%" height="100%" transform="rotate(90 320 240)" xlinkHref="#ARFlagIcon__c" />
      <use width="100%" height="100%" transform="rotate(180 320 240)" xlinkHref="#ARFlagIcon__c" />
      <use width="100%" height="100%" transform="rotate(-90 320 240)" xlinkHref="#ARFlagIcon__c" />
      <circle cx={320} cy={240} r={26.7} fill="#f6b40e" stroke="#85340a" strokeWidth={1.4} />
      <path
        id="ARFlagIcon__h"
        fill="#843511"
        d="M329.1 234.3c-1.8 0-3.6.8-4.6 2.4 2 1.9 6.6 2 9.7-.2a7 7 0 00-5.1-2.2zm0 .4c1.7 0 3.4.8 3.6 1.6-2 2.3-5.3 2-7.4.4a4.3 4.3 0 013.8-2z"
      />
      <use width="100%" height="100%" transform="matrix(-1 0 0 1 640.2 0)" xlinkHref="#ARFlagIcon__d" />
      <use width="100%" height="100%" transform="matrix(-1 0 0 1 640.2 0)" xlinkHref="#ARFlagIcon__e" />
      <use width="100%" height="100%" transform="translate(18.1)" xlinkHref="#ARFlagIcon__f" />
      <use width="100%" height="100%" transform="matrix(-1 0 0 1 640.2 0)" xlinkHref="#ARFlagIcon__g" />
      <path
        fill="#85340a"
        d="M316 243.7a1.9 1.9 0 101.8 2.9 4 4 0 002.2.6h.2a3.9 3.9 0 002.3-.6 1.9 1.9 0 101.8-3c.5.3.8.7.8 1.3 0 .6-.5 1.2-1.2 1.2a1.2 1.2 0 01-1.2-1.2 3 3 0 01-2.6 1.7 3 3 0 01-2.5-1.7 1.2 1.2 0 01-1.3 1.2c-.6 0-1.2-.6-1.2-1.2s.3-1 .8-1.2zm2 5.5c-2.1 0-3 1.8-4.8 3 1-.4 1.9-1.2 3.3-2s2.7.2 3.5.2c.8 0 2-1 3.5-.2 1.4.8 2.3 1.6 3.3 2-1.9-1.2-2.7-3-4.8-3a5.5 5.5 0 00-2 .6 5.5 5.5 0 00-2-.7z"
      />
      <path
        fill="#85340a"
        d="M317.2 251.6c-.8 0-1.8.2-3.4.6 3.7-.8 4.5.5 6.2.5 1.6 0 2.4-1.3 6.1-.5-4-1.2-4.9-.4-6.1-.4-.8 0-1.4-.3-2.8-.2z"
      />
      <path
        fill="#85340a"
        d="M314 252.2h-.8c4.3.5 2.3 3 6.8 3s2.5-2.5 6.8-3c-4.5-.4-3.1 2.3-6.8 2.3-3.5 0-2.4-2.3-6-2.3zm9.7 6.7a3.7 3.7 0 00-7.4 0 3.8 3.8 0 017.4 0z"
      />
      <path
        id="ARFlagIcon__e"
        fill="#85340a"
        d="M303.4 234.3c4.7-4.1 10.7-4.8 14-1.7a8 8 0 011.5 3.5c.4 2.3-.3 4.8-2.1 7.4l.8.4a14.6 14.6 0 001.6-9.4 13.3 13.3 0 00-.6-2.3c-4.5-3.7-10.7-4-15.2 2z"
      />
      <path
        id="ARFlagIcon__d"
        fill="#85340a"
        d="M310.8 233c2.7 0 3.3.7 4.5 1.7 1.2 1 1.9.8 2 1 .3.2 0 .8-.3.6-.5-.2-1.3-.6-2.5-1.6s-2.5-1-3.7-1c-3.7 0-5.7 3-6.2 2.8-.3-.2 2.1-3.5 6.2-3.5z"
      />
      <use width="100%" height="100%" transform="translate(-18.4)" xlinkHref="#ARFlagIcon__h" />
      <circle id="ARFlagIcon__f" cx={310.9} cy={236.3} r={1.9} fill="#85340a" />
      <path
        id="ARFlagIcon__g"
        fill="#85340a"
        d="M305.9 237.5c3.5 2.7 7 2.5 9 1.3 2-1.3 2-1.7 1.6-1.7-.4 0-.8.4-2.4 1.3-1.7.8-4.1.8-8.2-.9z"
      />
    </svg>
  );
};

const FlagIconWithForwardedRef = forwardRef<SVGSVGElement, FlagIconProps>((iconProps, ref) => (
  <FlagIcon aria-hidden={iconProps.title ? undefined : true} {...iconProps} svgRef={ref} />
));

export const ARFlagIcon = memo(createStyledFlagIcon(FlagIconWithForwardedRef as React.FC<FlagIconProps>));

ARFlagIcon.displayName = 'ARFlagIcon';
