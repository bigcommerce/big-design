// **********************************
// Auto-generated file, do NOT modify
// **********************************
import React, { forwardRef, memo } from 'react';

import { PrivateIconProps } from '../../base';
import { useUniqueId } from '../../utils';
import { createStyledFlagIcon, FlagIconProps } from '../base';

const FlagIcon: React.FC<FlagIconProps & PrivateIconProps> = ({ svgRef, title = 'UZ flag', theme, ...props }) => {
  const uniqueTitleId = useUniqueId('icon');
  const titleId = title ? props.titleId || uniqueTitleId : undefined;

  return (
    <svg viewBox="0 0 640 480" ref={svgRef} aria-labelledby={titleId} {...props}>
      {title ? <title id={titleId}>{title}</title> : null}
      <path fill="#1eb53a" d="M0 320h640v160H0z" />
      <path fill="#0099b5" d="M0 0h640v160H0z" />
      <path fill="#ce1126" d="M0 153.6h640v172.8H0z" />
      <path fill="#fff" d="M0 163.2h640v153.6H0z" />
      <circle cx={134.4} cy={76.8} r={57.6} fill="#fff" />
      <circle cx={153.6} cy={76.8} r={57.6} fill="#0099b5" />
      <g fill="#fff" transform="matrix(1.92 0 0 1.92 261.1 122.9)">
        <g id="UZFlagIcon__e">
          <g id="UZFlagIcon__d">
            <g id="UZFlagIcon__c">
              <g id="UZFlagIcon__b">
                <path id="UZFlagIcon__a" d="M0-6L-1.9-.3 1 .7" />
                <use width="100%" height="100%" transform="scale(-1 1)" xlinkHref="#UZFlagIcon__a" />
              </g>
              <use width="100%" height="100%" transform="rotate(72)" xlinkHref="#UZFlagIcon__b" />
            </g>
            <use width="100%" height="100%" transform="rotate(-72)" xlinkHref="#UZFlagIcon__b" />
            <use width="100%" height="100%" transform="rotate(144)" xlinkHref="#UZFlagIcon__c" />
          </g>
          <use width="100%" height="100%" y={-24} xlinkHref="#UZFlagIcon__d" />
          <use width="100%" height="100%" y={-48} xlinkHref="#UZFlagIcon__d" />
        </g>
        <use width="100%" height="100%" x={24} xlinkHref="#UZFlagIcon__e" />
        <use width="100%" height="100%" x={48} xlinkHref="#UZFlagIcon__e" />
        <use width="100%" height="100%" x={-48} xlinkHref="#UZFlagIcon__d" />
        <use width="100%" height="100%" x={-24} xlinkHref="#UZFlagIcon__d" />
        <use width="100%" height="100%" x={-24} y={-24} xlinkHref="#UZFlagIcon__d" />
      </g>
    </svg>
  );
};

const FlagIconWithForwardedRef = forwardRef<SVGSVGElement, FlagIconProps>((iconProps, ref) => (
  <FlagIcon {...iconProps} svgRef={ref} />
));

export const UZFlagIcon = memo(createStyledFlagIcon(FlagIconWithForwardedRef as React.FC<FlagIconProps>));

UZFlagIcon.displayName = 'UZFlagIcon';
