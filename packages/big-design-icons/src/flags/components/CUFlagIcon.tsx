// **********************************
// Auto-generated file, do NOT modify
// **********************************
import React, { forwardRef, memo, useId } from 'react';

import { createStyledFlagIcon, FlagIconProps, PrivateIconProps } from '../base';

const FlagIcon: React.FC<FlagIconProps & PrivateIconProps> = ({
  svgRef,
  title = 'CU flag',
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
        <clipPath id="CUFlagIcon__a">
          <path d="M-32 0h682.7v512H-32z" fillOpacity={0.7} />
        </clipPath>
      </defs>
      <g clipPath="url(#CUFlagIcon__a)" fillRule="evenodd" transform="translate(30)scale(.94)">
        <path d="M-32 0h768v512H-32z" fill="#002a8f" />
        <path d="M-32 102.4h768v102.4H-32zm0 204.8h768v102.4H-32z" fill="#fff" />
        <path d="m-32 0 440.7 255.7L-32 511z" fill="#cb1515" />
        <path
          d="M161.8 325.5 114.3 290l-47.2 35.8 17.6-58.1-47.2-36 58.3-.4 18.1-58 18.5 57.8 58.3.1-46.9 36.3z"
          fill="#fff"
        />
      </g>
    </svg>
  );
};
const FlagIconWithForwardedRef = forwardRef<SVGSVGElement, FlagIconProps>((iconProps, ref) => (
  <FlagIcon {...iconProps} svgRef={ref} />
));

export const CUFlagIcon = memo(createStyledFlagIcon(FlagIconWithForwardedRef));
CUFlagIcon.displayName = 'CUFlagIcon';
