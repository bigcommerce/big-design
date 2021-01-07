// **********************************
// Auto-generated file, do NOT modify
// **********************************
import React, { forwardRef, memo } from 'react';

import { PrivateIconProps } from '../../base';
import { useUniqueId } from '../../utils';
import { createStyledFlagIcon, FlagIconProps } from '../base';

const FlagIcon: React.FC<FlagIconProps & PrivateIconProps> = ({ svgRef, title = 'SS flag', theme, ...props }) => {
  const uniqueTitleId = useUniqueId('icon');
  const titleId = title ? props.titleId || uniqueTitleId : undefined;

  return (
    <svg viewBox="0 0 640 480" ref={svgRef} aria-labelledby={titleId} {...props}>
      {title ? <title id={titleId}>{title}</title> : null}
      <path fill="#078930" d="M0 336h640v144H0z" />
      <path fill="#fff" d="M0 144h640v192H0z" />
      <path d="M0 0h640v144H0z" />
      <path fill="#da121a" d="M0 168h640v144H0z" />
      <path fill="#0f47af" d="M0 0l415.7 240L0 480z" />
      <path fill="#fcdd09" d="M200.7 194.8L61.7 240l139 45.1L114.9 167v146z" />
    </svg>
  );
};

const FlagIconWithForwardedRef = forwardRef<SVGSVGElement, FlagIconProps>((iconProps, ref) => (
  <FlagIcon {...iconProps} svgRef={ref} />
));

export const SSFlagIcon = memo(createStyledFlagIcon(FlagIconWithForwardedRef as React.FC<FlagIconProps>));

SSFlagIcon.displayName = 'SSFlagIcon';
