// **********************************
// Auto-generated file, do NOT modify
// **********************************
import React, { forwardRef, memo, useId } from 'react';

import { PrivateIconProps } from '../../base';
import { createStyledFlagIcon, FlagIconProps } from '../base';

const FlagIcon: React.FC<FlagIconProps & PrivateIconProps> = ({
  svgRef,
  title = 'VC flag',
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
      <g fillRule="evenodd">
        <path d="M0 0h640v480H0z" fill="#f4f100" />
        <path d="M490 0h150v480H490z" fill="#199a00" />
        <path d="M0 0h150v480H0z" fill="#0058aa" />
        <path
          d="M259.3 130l-46.4 71.3 44.7 74.4 43.8-73.7zm121.2 0l-46.3 71.3 44.7 74.4 43.8-73.7zm-61.2 97.3l-46.4 71.4 44.8 74.4 43.8-73.7-42.2-72z"
          fill="#199a00"
        />
      </g>
    </svg>
  );
};

const FlagIconWithForwardedRef = forwardRef<SVGSVGElement, FlagIconProps>((iconProps, ref) => (
  <FlagIcon {...iconProps} svgRef={ref} />
));

export const VCFlagIcon = memo(createStyledFlagIcon(FlagIconWithForwardedRef));

VCFlagIcon.displayName = 'VCFlagIcon';
