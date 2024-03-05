// **********************************
// Auto-generated file, do NOT modify
// **********************************
import React, { forwardRef, memo, useId } from 'react';

import { createStyledFlagIcon, FlagIconProps, PrivateIconProps } from '../base';

const FlagIcon: React.FC<FlagIconProps & PrivateIconProps> = ({
  svgRef,
  title = 'AX flag',
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
        <clipPath id="AXFlagIcon__a">
          <path d="M106.3 0h1133.3v850H106.3z" fillOpacity={0.7} />
        </clipPath>
      </defs>
      <g clipPath="url(#AXFlagIcon__a)" transform="matrix(.56472 0 0 .56482 -60 -.1)">
        <path d="M0 0h1300v850H0z" fill="#0053a5" />
        <g fill="#ffce00">
          <path d="M400 0h250v850H400z" />
          <path d="M0 300h1300v250H0z" />
        </g>
        <g fill="#d21034">
          <path d="M475 0h100v850H475z" />
          <path d="M0 375h1300v100H0z" />
        </g>
      </g>
    </svg>
  );
};
const FlagIconWithForwardedRef = forwardRef<SVGSVGElement, FlagIconProps>((iconProps, ref) => (
  <FlagIcon {...iconProps} svgRef={ref} />
));

export const AXFlagIcon = memo(createStyledFlagIcon(FlagIconWithForwardedRef));
AXFlagIcon.displayName = 'AXFlagIcon';
