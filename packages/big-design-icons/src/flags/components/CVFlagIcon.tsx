// **********************************
// Auto-generated file, do NOT modify
// **********************************
import React, { forwardRef, memo, useId } from 'react';

import { createStyledFlagIcon, FlagIconProps, PrivateIconProps } from '../base';

const FlagIcon: React.FC<FlagIconProps & PrivateIconProps> = ({
  svgRef,
  title = 'CV flag',
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
        <clipPath id="CVFlagIcon__a">
          <path d="M-123.4 0h682.6v512h-682.6z" fillOpacity={0.7} />
        </clipPath>
      </defs>
      <g clipPath="url(#CVFlagIcon__a)" fillRule="evenodd" transform="translate(115.7)scale(.94)">
        <path d="M-123.4 233H723v206h-846.5z" fill="#fff" />
        <path d="M-122.8 0h846v256.6h-846zm.3 385.9h852.1V512h-852.1z" fill="#081873" />
        <path d="M-122.5 302.6h846v39.6h-846z" fill="#de3929" />
        <path
          d="m131 399.2 6.6 20.4H159l-17.4 12.7 6.6 20.5L131 440l-17.4 12.7 6.7-20.5-17.4-12.7h21.5M317 250.4l6.7 20.5H345l-17.4 12.6 6.6 20.5-17.4-12.7-17.4 12.7 6.6-20.5-17.4-12.6h21.6m-222 64.4 6.6 20.5h21.5L99 368.6l6.7 20.4-17.4-12.6L70.9 389l6.6-20.4-17.4-12.7h21.5M317 329.5l6.7 20.4H345l-17.4 12.7 6.6 20.4-17.4-12.6-17.4 12.7 6.6-20.5-17.4-12.7h21.6m-40.5-161.7 6.7 20.4H298l-17.4 12.7 6.6 20.5-17.4-12.7-17.4 12.7 6.7-20.5-17.5-12.7h21.6m-64.5-45.2 6.7 20.5h21.5l-17.4 12.6 6.6 20.5-17.4-12.6-17.4 12.6 6.7-20.5-17.4-12.6H192m-64.5 2.9 6.7 20.5h21.5l-17.4 12.6 6.7 20.5-17.5-12.7-17.4 12.7 6.7-20.5-17.4-12.6H121m-34.8 43.2 6.6 20.5h21.6l-17.5 12.6 6.7 20.5-17.4-12.7-17.4 12.7 6.6-20.5L58 271h21.5m119.2 149.4 6.7 20.5h21.5l-17.4 12.6 6.7 20.5-17.5-12.7-17.4 12.7 6.7-20.5-17.4-12.6H192m82.2-41.7 6.6 20.4h21.5L285 432.3l6.7 20.5-17.4-12.7-17.5 12.7 6.7-20.5-17.4-12.7h21.5"
          fill="#ffce08"
        />
      </g>
    </svg>
  );
};
const FlagIconWithForwardedRef = forwardRef<SVGSVGElement, FlagIconProps>((iconProps, ref) => (
  <FlagIcon {...iconProps} svgRef={ref} />
));

export const CVFlagIcon = memo(createStyledFlagIcon(FlagIconWithForwardedRef));
CVFlagIcon.displayName = 'CVFlagIcon';
