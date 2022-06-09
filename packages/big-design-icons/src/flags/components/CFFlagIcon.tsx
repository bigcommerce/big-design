// **********************************
// Auto-generated file, do NOT modify
// **********************************
import React, { forwardRef, memo } from 'react';

import { PrivateIconProps } from '../../base';
import { useUniqueId } from '../../utils';
import { createStyledFlagIcon, FlagIconProps } from '../base';

const FlagIcon: React.FC<FlagIconProps & PrivateIconProps> = ({
  svgRef,
  title = 'CF flag',
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
      {...props}
    >
      {title ? <title id={titleId}>{title}</title> : null}
      <defs>
        <clipPath id="CFFlagIcon__a">
          <path d="M-12.4 32h640v480h-640z" fillOpacity={0.7} />
        </clipPath>
      </defs>
      <g clipPath="url(#CFFlagIcon__a)" fillRule="evenodd" transform="translate(12.4 -32)">
        <path d="M-52 32h719.3v119H-52z" fill="#00f" />
        <path d="M-52 391.6h719.3V512H-52z" fill="#ff0" />
        <path d="M-52 271.3h719.3v120.3H-52z" fill="#009a00" />
        <path d="M-52 151h719.3v120.3H-52z" fill="#fff" />
        <path d="M247.7 32.5h119.9V512H247.7z" fill="red" />
        <path
          d="M99.3 137.7l-31.5-21.8-31.3 22L47.4 101 16.9 78l38.2-1 12.5-36.3L80.3 77l38.1.7L88.2 101"
          fill="#ff0"
        />
      </g>
    </svg>
  );
};

const FlagIconWithForwardedRef = forwardRef<SVGSVGElement, FlagIconProps>((iconProps, ref) => (
  <FlagIcon {...iconProps} svgRef={ref} />
));

export const CFFlagIcon = memo(createStyledFlagIcon(FlagIconWithForwardedRef));

CFFlagIcon.displayName = 'CFFlagIcon';
