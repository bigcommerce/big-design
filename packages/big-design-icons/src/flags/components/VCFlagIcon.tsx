// **********************************
// Auto-generated file, do NOT modify
// **********************************
import React, { forwardRef, memo } from 'react';

import { PrivateIconProps } from '../../base';
import { useUniqueId } from '../../utils';
import { createStyledFlagIcon, FlagIconProps } from '../base';

const FlagIcon: React.FC<FlagIconProps & PrivateIconProps> = ({ svgRef, title = 'VC flag', theme, ...props }) => {
  const uniqueTitleId = useUniqueId('icon');
  const titleId = title ? props.titleId || uniqueTitleId : undefined;

  return (
    <svg viewBox="0 0 640 480" ref={svgRef} aria-labelledby={titleId} {...props}>
      {title ? <title id={titleId}>{title}</title> : null}
      <g fillRule="evenodd">
        <path fill="#f4f100" d="M0 0h640v480H0z" />
        <path fill="#199a00" d="M490 0h150v480H490z" />
        <path fill="#0058aa" d="M0 0h150v480H0z" />
        <path
          fill="#199a00"
          d="M259.3 130l-46.4 71.3 44.7 74.4 43.8-73.7-42.1-72zm121.2 0l-46.3 71.3 44.7 74.4 43.8-73.7-42.2-72zm-61.2 97.3l-46.4 71.4 44.8 74.4 43.8-73.7-42.2-72z"
        />
      </g>
    </svg>
  );
};

const FlagIconWithForwardedRef = forwardRef<SVGSVGElement, FlagIconProps>((iconProps, ref) => (
  <FlagIcon {...iconProps} svgRef={ref} />
));

export const VCFlagIcon = memo(createStyledFlagIcon(FlagIconWithForwardedRef as React.FC<FlagIconProps>));

VCFlagIcon.displayName = 'VCFlagIcon';
