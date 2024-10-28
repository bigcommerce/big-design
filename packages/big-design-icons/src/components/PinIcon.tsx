// **********************************
// Auto-generated file, do NOT modify
// **********************************
import React, { forwardRef, memo, useId } from 'react';

import { createStyledIcon, IconProps, PrivateIconProps } from '../base';

const Icon: React.FC<IconProps & PrivateIconProps> = ({ svgRef, title, theme, ...props }) => {
  const uniqueTitleId = useId();
  const titleId = title ? props.titleId || uniqueTitleId : undefined;
  const ariaHidden = titleId ? undefined : true;

  return (
    <svg
      aria-hidden={ariaHidden}
      aria-labelledby={titleId}
      fill="currentColor"
      height={24}
      ref={svgRef}
      stroke="currentColor"
      strokeWidth="0"
      viewBox="0 0 24 24"
      width={24}
      {...props}
    >
      {title ? <title id={titleId}>{title}</title> : null}
      <g clipPath="url(#a)">
        <path
          d="M13.667 5.333v4.166c0 .934.308 1.8.833 2.5h-5a4.12 4.12 0 0 0 .834-2.5V5.333zm2.5-1.667H7.834A.836.836 0 0 0 7 4.499c0 .459.375.834.834.834h.833v4.166c0 1.384-1.117 2.5-2.5 2.5v1.667h4.975v5.833l.833.834.834-.834v-5.833h5.025v-1.667a2.497 2.497 0 0 1-2.5-2.5V5.333h.833A.836.836 0 0 0 17 4.499a.836.836 0 0 0-.833-.833"
          fill="#313440"
        />
      </g>
      <defs>
        <clipPath id="a">
          <path d="M0 0h24v24H0z" fill="#fff" />
        </clipPath>
      </defs>
    </svg>
  );
};
const IconWithForwardedRef = forwardRef<SVGSVGElement, IconProps>((iconProps, ref) => (
  <Icon {...iconProps} svgRef={ref} />
));

export const PinIcon = memo(createStyledIcon(IconWithForwardedRef));
PinIcon.displayName = 'PinIcon';
