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
      <g fill="none">
        <path d="M0 0h24v24H0z" />
        <path d="M0 0h24v24H0z" />
      </g>
      <path d="M9.19 6.35c-2.04 2.29-3.44 5.58-3.57 5.89l-2.26-.97c-.65-.28-.81-1.13-.31-1.63l3.01-3.01c.47-.47 1.15-.68 1.81-.55zm1.49 10.16c.3.3.74.38 1.12.2 1.16-.54 3.65-1.81 5.26-3.42 4.59-4.59 4.63-8.33 4.36-9.93a.98.98 0 0 0-.79-.79c-1.6-.27-5.34-.23-9.93 4.36-1.61 1.61-2.87 4.1-3.42 5.26-.18.38-.09.83.2 1.12zm6.97-1.7c-2.29 2.04-5.58 3.44-5.89 3.57l.97 2.26c.28.65 1.13.81 1.63.31l3.01-3.01c.47-.47.68-1.15.55-1.81zm-8.71 2.6a3 3 0 0 1-.82 2.71c-.77.77-3.16 1.34-4.71 1.64-.69.13-1.3-.48-1.17-1.17.3-1.55.86-3.94 1.64-4.71a3 3 0 0 1 2.71-.82c1.17.22 2.13 1.18 2.35 2.35M13 9c0-1.1.9-2 2-2s2 .9 2 2-.9 2-2 2-2-.9-2-2" />
    </svg>
  );
};
const IconWithForwardedRef = forwardRef<SVGSVGElement, IconProps>((iconProps, ref) => (
  <Icon {...iconProps} svgRef={ref} />
));

export const RocketLaunchIcon = memo(createStyledIcon(IconWithForwardedRef));
RocketLaunchIcon.displayName = 'RocketLaunchIcon';
