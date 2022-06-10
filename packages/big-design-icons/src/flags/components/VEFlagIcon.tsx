// **********************************
// Auto-generated file, do NOT modify
// **********************************
import React, { forwardRef, memo } from 'react';

import { PrivateIconProps } from '../../base';
import { useUniqueId } from '../../utils';
import { createStyledFlagIcon, FlagIconProps } from '../base';

const FlagIcon: React.FC<FlagIconProps & PrivateIconProps> = ({
  svgRef,
  title = 'VE flag',
  theme,
  ...props
}) => {
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
      <defs>
        <g id="VEFlagIcon__d" transform="translate(0 -36)">
          <g id="VEFlagIcon__c">
            <g id="VEFlagIcon__b">
              <path d="M0-5L-1.5-.2l2.8.9z" fill="#fff" id="VEFlagIcon__a" />
              <use height={120} transform="scale(-1 1)" width={180} xlinkHref="#VEFlagIcon__a" />
            </g>
            <use height={120} transform="rotate(72)" width={180} xlinkHref="#VEFlagIcon__b" />
          </g>
          <use height={120} transform="rotate(-72)" width={180} xlinkHref="#VEFlagIcon__b" />
          <use height={120} transform="rotate(144)" width={180} xlinkHref="#VEFlagIcon__c" />
        </g>
      </defs>
      <path d="M0 0h640v480H0z" fill="#cf142b" />
      <path d="M0 0h640v320H0z" fill="#00247d" />
      <path d="M0 0h640v160H0z" fill="#fc0" />
      <g id="VEFlagIcon__f" transform="matrix(4 0 0 4 320 336)">
        <g id="VEFlagIcon__e">
          <use height={120} transform="rotate(10)" width={180} xlinkHref="#VEFlagIcon__d" />
          <use height={120} transform="rotate(30)" width={180} xlinkHref="#VEFlagIcon__d" />
        </g>
        <use height={120} transform="rotate(40)" width={180} xlinkHref="#VEFlagIcon__e" />
      </g>
      <use height={120} transform="rotate(-80 320 336)" width={180} xlinkHref="#VEFlagIcon__f" />
    </svg>
  );
};

const FlagIconWithForwardedRef = forwardRef<SVGSVGElement, FlagIconProps>((iconProps, ref) => (
  <FlagIcon {...iconProps} svgRef={ref} />
));

export const VEFlagIcon = memo(createStyledFlagIcon(FlagIconWithForwardedRef));

VEFlagIcon.displayName = 'VEFlagIcon';
