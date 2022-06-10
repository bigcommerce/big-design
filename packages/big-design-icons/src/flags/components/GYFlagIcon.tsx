// **********************************
// Auto-generated file, do NOT modify
// **********************************
import React, { forwardRef, memo } from 'react';

import { PrivateIconProps } from '../../base';
import { useUniqueId } from '../../utils';
import { createStyledFlagIcon, FlagIconProps } from '../base';

const FlagIcon: React.FC<FlagIconProps & PrivateIconProps> = ({
  svgRef,
  title = 'GY flag',
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
      <g fillRule="evenodd">
        <path d="M2.4 0H640v480H2.4z" fill="#399408" />
        <path d="M.2 0c-.9 0 619.6 241.5 619.6 241.5L0 479.8.2 0z" fill="#fff" />
        <path d="M.3 20.2c3.4 0 559 217.9 555.9 220L1.9 463.2.3 20.3z" fill="#ffde08" />
        <path d="M1.9.8c1.8 0 290.9 240.9 290.9 240.9L1.8 477V.8z" />
        <path d="M.3 33.9c1.6-15 260.9 208.4 260.9 208.4L.2 451.7V33.9z" fill="#de2110" />
      </g>
    </svg>
  );
};

const FlagIconWithForwardedRef = forwardRef<SVGSVGElement, FlagIconProps>((iconProps, ref) => (
  <FlagIcon {...iconProps} svgRef={ref} />
));

export const GYFlagIcon = memo(createStyledFlagIcon(FlagIconWithForwardedRef));

GYFlagIcon.displayName = 'GYFlagIcon';
