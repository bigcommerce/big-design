// **********************************
// Auto-generated file, do NOT modify
// **********************************
import React, { forwardRef, memo, useId } from 'react';

import { PrivateIconProps } from '../../base';
import { createStyledFlagIcon, FlagIconProps } from '../base';

const FlagIcon: React.FC<FlagIconProps & PrivateIconProps> = ({
  svgRef,
  title = 'PR flag',
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
      <defs>
        <clipPath id="PRFlagIcon__a">
          <path d="M-37.3 0h682.7v512H-37.3z" fillOpacity={0.7} />
        </clipPath>
      </defs>
      <g clipPath="url(#PRFlagIcon__a)" fillRule="evenodd" transform="translate(35) scale(.9375)">
        <path d="M-37.3 0h768v512h-768z" fill="#ed0000" />
        <path d="M-37.3 102.4h768v102.4h-768zm0 204.8h768v102.4h-768z" fill="#fff" />
        <path d="M-37.3 0l440.7 255.7L-37.3 511V0z" fill="#0050f0" />
        <path
          d="M156.4 325.5L109 290l-47.2 35.8 17.6-58.1-47.2-36 58.3-.4 18.1-58 18.5 57.8 58.3.1-46.9 36.3 18 58z"
          fill="#fff"
        />
      </g>
    </svg>
  );
};

const FlagIconWithForwardedRef = forwardRef<SVGSVGElement, FlagIconProps>((iconProps, ref) => (
  <FlagIcon {...iconProps} svgRef={ref} />
));

export const PRFlagIcon = memo(createStyledFlagIcon(FlagIconWithForwardedRef));

PRFlagIcon.displayName = 'PRFlagIcon';
