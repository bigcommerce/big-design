// **********************************
// Auto-generated file, do NOT modify
// **********************************
import React, { forwardRef, memo, useId } from 'react';

import { createStyledFlagIcon, FlagIconProps, PrivateIconProps } from '../base';

const FlagIcon: React.FC<FlagIconProps & PrivateIconProps> = ({
  svgRef,
  title = 'SO flag',
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
        <clipPath id="SOFlagIcon__a">
          <path d="M-85.3 0h682.6v512H-85.3z" fillOpacity={0.7} />
        </clipPath>
      </defs>
      <g clipPath="url(#SOFlagIcon__a)" fillRule="evenodd" transform="translate(80)scale(.9375)">
        <path d="M-128 0h768v512h-768z" fill="#40a6ff" />
        <path
          d="M336.5 381.2 254 327.7l-82.1 54 30.5-87.7-82-54.2L222 239l31.4-87.5 32.1 87.3 101.4.1-81.5 54.7z"
          fill="#fff"
        />
      </g>
    </svg>
  );
};
const FlagIconWithForwardedRef = forwardRef<SVGSVGElement, FlagIconProps>((iconProps, ref) => (
  <FlagIcon {...iconProps} svgRef={ref} />
));

export const SOFlagIcon = memo(createStyledFlagIcon(FlagIconWithForwardedRef));
SOFlagIcon.displayName = 'SOFlagIcon';
