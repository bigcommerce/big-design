// **********************************
// Auto-generated file, do NOT modify
// **********************************

'use client';

import React, { forwardRef, memo, useId } from 'react';

import { PrivateIconProps } from '../../base';
import { createStyledFlagIcon, FlagIconProps } from '../base';

const FlagIcon: React.FC<FlagIconProps & PrivateIconProps> = ({
  svgRef,
  title = 'LT flag',
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
      {...props}
    >
      {title ? <title id={titleId}>{title}</title> : null}
      <g fillRule="evenodd" strokeWidth="1pt" transform="scale(.64143 .96773)">
        <rect
          fill="#006a44"
          height={708.7}
          rx={0}
          ry={0}
          transform="scale(.93865 .69686)"
          width={1063}
        />
        <rect
          fill="#c1272d"
          height={236.2}
          rx={0}
          ry={0}
          transform="scale(.93865 .69686)"
          width={1063}
          y={475.6}
        />
        <path d="M0 0h997.8v164.6H0z" fill="#fdb913" />
      </g>
    </svg>
  );
};

const FlagIconWithForwardedRef = forwardRef<SVGSVGElement, FlagIconProps>((iconProps, ref) => (
  <FlagIcon {...iconProps} svgRef={ref} />
));

export const LTFlagIcon = memo(createStyledFlagIcon(FlagIconWithForwardedRef));

LTFlagIcon.displayName = 'LTFlagIcon';
