// **********************************
// Auto-generated file, do NOT modify
// **********************************
import React, { forwardRef, memo } from 'react';

import { PrivateIconProps } from '../../base';
import { useUniqueId } from '../../utils';
import { createStyledFlagIcon, FlagIconProps } from '../base';

const FlagIcon: React.FC<FlagIconProps & PrivateIconProps> = ({
  svgRef,
  title = 'CW flag',
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
        <clipPath id="CWFlagIcon__a">
          <path d="M0 0h682.7v512H0z" fillOpacity={0.7} />
        </clipPath>
        <path d="M0-1l.2.7H1L.3 0l.2.7L0 .4l-.6.4.2-.7-.5-.4h.7z" id="CWFlagIcon__b" />
      </defs>
      <g clipPath="url(#CWFlagIcon__a)" transform="scale(.94)">
        <path d="M0 0h768v512H0z" fill="#002b7f" />
        <path d="M0 320h768v64H0z" fill="#f9e814" />
        <use
          fill="#fff"
          height={9000}
          transform="scale(42.67)"
          width={13500}
          x={2}
          xlinkHref="#CWFlagIcon__b"
          y={2}
        />
        <use
          fill="#fff"
          height={9000}
          transform="scale(56.9)"
          width={13500}
          x={3}
          xlinkHref="#CWFlagIcon__b"
          y={3}
        />
      </g>
    </svg>
  );
};

const FlagIconWithForwardedRef = forwardRef<SVGSVGElement, FlagIconProps>((iconProps, ref) => (
  <FlagIcon {...iconProps} svgRef={ref} />
));

export const CWFlagIcon = memo(createStyledFlagIcon(FlagIconWithForwardedRef));

CWFlagIcon.displayName = 'CWFlagIcon';
