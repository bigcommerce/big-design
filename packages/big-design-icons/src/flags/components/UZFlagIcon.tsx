// **********************************
// Auto-generated file, do NOT modify
// **********************************

'use client';

import React, { forwardRef, memo, useId } from 'react';

import { PrivateIconProps } from '../../base';
import { createStyledFlagIcon, FlagIconProps } from '../base';

const FlagIcon: React.FC<FlagIconProps & PrivateIconProps> = ({
  svgRef,
  title = 'UZ flag',
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
      <path d="M0 320h640v160H0z" fill="#1eb53a" />
      <path d="M0 0h640v160H0z" fill="#0099b5" />
      <path d="M0 153.6h640v172.8H0z" fill="#ce1126" />
      <path d="M0 163.2h640v153.6H0z" fill="#fff" />
      <circle cx={134.4} cy={76.8} fill="#fff" r={57.6} />
      <circle cx={153.6} cy={76.8} fill="#0099b5" r={57.6} />
      <g fill="#fff" transform="matrix(1.92 0 0 1.92 261.1 122.9)">
        <g id="UZFlagIcon__e">
          <g id="UZFlagIcon__d">
            <g id="UZFlagIcon__c">
              <g id="UZFlagIcon__b">
                <path d="M0-6L-1.9-.3 1 .7" id="UZFlagIcon__a" />
                <use
                  height="100%"
                  transform="scale(-1 1)"
                  width="100%"
                  xlinkHref="#UZFlagIcon__a"
                />
              </g>
              <use height="100%" transform="rotate(72)" width="100%" xlinkHref="#UZFlagIcon__b" />
            </g>
            <use height="100%" transform="rotate(-72)" width="100%" xlinkHref="#UZFlagIcon__b" />
            <use height="100%" transform="rotate(144)" width="100%" xlinkHref="#UZFlagIcon__c" />
          </g>
          <use height="100%" width="100%" xlinkHref="#UZFlagIcon__d" y={-24} />
          <use height="100%" width="100%" xlinkHref="#UZFlagIcon__d" y={-48} />
        </g>
        <use height="100%" width="100%" x={24} xlinkHref="#UZFlagIcon__e" />
        <use height="100%" width="100%" x={48} xlinkHref="#UZFlagIcon__e" />
        <use height="100%" width="100%" x={-48} xlinkHref="#UZFlagIcon__d" />
        <use height="100%" width="100%" x={-24} xlinkHref="#UZFlagIcon__d" />
        <use height="100%" width="100%" x={-24} xlinkHref="#UZFlagIcon__d" y={-24} />
      </g>
    </svg>
  );
};

const FlagIconWithForwardedRef = forwardRef<SVGSVGElement, FlagIconProps>((iconProps, ref) => (
  <FlagIcon {...iconProps} svgRef={ref} />
));

export const UZFlagIcon = memo(createStyledFlagIcon(FlagIconWithForwardedRef));

UZFlagIcon.displayName = 'UZFlagIcon';
