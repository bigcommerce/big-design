// **********************************
// Auto-generated file, do NOT modify
// **********************************
import React, { forwardRef, memo } from 'react';

import { PrivateIconProps } from '../../base';
import { useUniqueId } from '../../utils';
import { createStyledFlagIcon, FlagIconProps } from '../base';

const FlagIcon: React.FC<FlagIconProps & PrivateIconProps> = ({
  svgRef,
  title = 'SN flag',
  theme,
  ...props
}) => {
  const uniqueTitleId = useUniqueId('icon');
  const titleId = title ? props.titleId || uniqueTitleId : undefined;
  const ariaHidden = titleId ? undefined : true;

  return (
    <svg aria-hidden={ariaHidden} aria-labelledby={titleId} ref={svgRef} viewBox="0 0 640 480" {...props}>
      {title ? <title id={titleId}>{title}</title> : null}
      <g fillRule="evenodd" strokeWidth="1pt">
        <path d="M0 0h213.3v480H0z" fill="#0b7226" />
        <path d="M213.3 0h213.3v480H213.3z" fill="#ff0" />
        <path d="M426.6 0H640v480H426.6z" fill="#bc0000" />
      </g>
      <path
        d="M342 218.8h71.8l-56.6 43.6 20.7 69.3-56.6-43.6-56.6 41.6 20.7-67.3-56.6-43.6h69.8l22.7-71.3z"
        fill="#0b7226"
      />
    </svg>
  );
};

const FlagIconWithForwardedRef = forwardRef<SVGSVGElement, FlagIconProps>((iconProps, ref) => (
  <FlagIcon {...iconProps} svgRef={ref} />
));

export const SNFlagIcon = memo(createStyledFlagIcon(FlagIconWithForwardedRef));

SNFlagIcon.displayName = 'SNFlagIcon';
