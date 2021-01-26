// **********************************
// Auto-generated file, do NOT modify
// **********************************
import React, { forwardRef, memo } from 'react';

import { PrivateIconProps } from '../../base';
import { useUniqueId } from '../../utils';
import { createStyledFlagIcon, FlagIconProps } from '../base';

const FlagIcon: React.FC<FlagIconProps & PrivateIconProps> = ({ svgRef, title = 'GD flag', theme, ...props }) => {
  const uniqueTitleId = useUniqueId('icon');
  const titleId = title ? props.titleId || uniqueTitleId : undefined;

  return (
    <svg viewBox="0 0 640 480" ref={svgRef} aria-labelledby={titleId} {...props}>
      {title ? <title id={titleId}>{title}</title> : null}
      <defs>
        <g id="GDFlagIcon__c">
          <g id="GDFlagIcon__b">
            <path id="GDFlagIcon__a" fill="#fcd116" d="M0-1v1h.5" transform="rotate(18 0 -1)" />
            <use transform="scale(-1 1)" xlinkHref="#GDFlagIcon__a" />
          </g>
          <use transform="rotate(72)" xlinkHref="#GDFlagIcon__b" />
          <use transform="rotate(144)" xlinkHref="#GDFlagIcon__b" />
          <use transform="rotate(216)" xlinkHref="#GDFlagIcon__b" />
          <use transform="rotate(288)" xlinkHref="#GDFlagIcon__b" />
        </g>
      </defs>
      <path fill="#ce1126" d="M0 0h640v480H0z" />
      <path fill="#007a5e" d="M67.2 67.2h505.6v345.6H67.2z" />
      <path fill="#fcd116" d="M67.2 67.3h505.6L67.2 412.9h505.6z" />
      <circle cx={319.9} cy={240.1} r={57.6} fill="#ce1126" />
      <use width="100%" height="100%" transform="matrix(52.8 0 0 52.8 320 240)" xlinkHref="#GDFlagIcon__c" />
      <use width="100%" height="100%" x={-100} transform="translate(-30.3)" xlinkHref="#GDFlagIcon__d" />
      <use
        id="GDFlagIcon__d"
        width="100%"
        height="100%"
        transform="matrix(31.2 0 0 31.2 320 33.6)"
        xlinkHref="#GDFlagIcon__c"
      />
      <use width="100%" height="100%" x={100} transform="translate(30.3)" xlinkHref="#GDFlagIcon__d" />
      <path fill="#ce1126" d="M102.3 240.7a80.4 80.4 0 0033.5 33.2 111 111 0 00-11.3-45l-22.2 11.8z" />
      <path
        fill="#fcd116"
        d="M90.1 194.7c10.4 21.7-27.1 73.7 35.5 85.9a63.2 63.2 0 01-10.9-41.9 70 70 0 0132.5 30.8c16.4-59.5-42-55.8-57.1-74.8z"
      />
      <use width="100%" height="100%" x={-100} transform="translate(-30.3 414.6)" xlinkHref="#GDFlagIcon__d" />
      <use width="100%" height="100%" transform="matrix(31.2 0 0 31.2 320 448.2)" xlinkHref="#GDFlagIcon__c" />
      <use width="100%" height="100%" x={100} transform="translate(30.3 414.6)" xlinkHref="#GDFlagIcon__d" />
    </svg>
  );
};

const FlagIconWithForwardedRef = forwardRef<SVGSVGElement, FlagIconProps>((iconProps, ref) => (
  <FlagIcon {...iconProps} svgRef={ref} />
));

export const GDFlagIcon = memo(createStyledFlagIcon(FlagIconWithForwardedRef as React.FC<FlagIconProps>));

GDFlagIcon.displayName = 'GDFlagIcon';
