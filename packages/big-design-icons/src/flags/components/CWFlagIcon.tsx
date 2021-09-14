// **********************************
// Auto-generated file, do NOT modify
// **********************************
import React, { forwardRef, memo } from 'react';

import { PrivateIconProps } from '../../base';
import { useUniqueId } from '../../utils';
import { createStyledFlagIcon, FlagIconProps } from '../base';

const FlagIcon: React.FC<FlagIconProps & PrivateIconProps> = ({ svgRef, title = 'CW flag', theme, ...props }) => {
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
        <clipPath id="CWFlagIcon__a">
          <path fillOpacity={0.7} d="M0 0h682.7v512H0z" />
        </clipPath>
        <path id="CWFlagIcon__b" d="M0-1l.2.7H1L.3 0l.2.7L0 .4l-.6.4.2-.7-.5-.4h.7z" />
      </defs>
      <g clipPath="url(#CWFlagIcon__a)" transform="scale(.94)">
        <path fill="#002b7f" d="M0 0h768v512H0z" />
        <path fill="#f9e814" d="M0 320h768v64H0z" />
        <use width={13500} height={9000} x={2} y={2} fill="#fff" transform="scale(42.67)" xlinkHref="#CWFlagIcon__b" />
        <use width={13500} height={9000} x={3} y={3} fill="#fff" transform="scale(56.9)" xlinkHref="#CWFlagIcon__b" />
      </g>
    </svg>
  );
};

const FlagIconWithForwardedRef = forwardRef<SVGSVGElement, FlagIconProps>((iconProps, ref) => (
  <FlagIcon {...iconProps} svgRef={ref} />
));

export const CWFlagIcon = memo(createStyledFlagIcon(FlagIconWithForwardedRef as React.FC<FlagIconProps>));

CWFlagIcon.displayName = 'CWFlagIcon';
