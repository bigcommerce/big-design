// **********************************
// Auto-generated file, do NOT modify
// **********************************
import React, { forwardRef, memo, useId } from 'react';

import { createStyledFlagIcon, FlagIconProps, PrivateIconProps } from '../base';

const FlagIcon: React.FC<FlagIconProps & PrivateIconProps> = ({
  svgRef,
  title = 'PW flag',
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
        <clipPath id="PWFlagIcon__a">
          <path d="M-70.3 0h640v480h-640z" fillOpacity={0.7} />
        </clipPath>
      </defs>
      <g
        clipPath="url(#PWFlagIcon__a)"
        fillRule="evenodd"
        strokeWidth="1pt"
        transform="translate(70.3)"
      >
        <path d="M-173.4 0h846.3v480h-846.3z" fill="#4aadd6" />
        <path d="M335.6 232.1a135.9 130.1 0 1 1-271.7 0 135.9 130.1 0 1 1 271.7 0" fill="#ffde00" />
      </g>
    </svg>
  );
};
const FlagIconWithForwardedRef = forwardRef<SVGSVGElement, FlagIconProps>((iconProps, ref) => (
  <FlagIcon {...iconProps} svgRef={ref} />
));

export const PWFlagIcon = memo(createStyledFlagIcon(FlagIconWithForwardedRef));
PWFlagIcon.displayName = 'PWFlagIcon';
