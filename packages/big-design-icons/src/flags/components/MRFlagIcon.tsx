// **********************************
// Auto-generated file, do NOT modify
// **********************************
import React, { forwardRef, memo } from 'react';

import { PrivateIconProps } from '../../base';
import { useUniqueId } from '../../utils';
import { createStyledFlagIcon, FlagIconProps } from '../base';

const FlagIcon: React.FC<FlagIconProps & PrivateIconProps> = ({ svgRef, title = 'MR flag', theme, ...props }) => {
  const uniqueTitleId = useUniqueId('icon');
  const titleId = title ? props.titleId || uniqueTitleId : undefined;
  const ariaHidden = titleId ? undefined : true;

  return (
    <svg aria-hidden={ariaHidden} aria-labelledby={titleId} ref={svgRef} viewBox="0 0 640 480" {...props}>
      {title ? <title id={titleId}>{title}</title> : null}
      <path d="M0 0h640v480H0z" fill="#cd2a3e" />
      <path d="M0 72h640v336H0z" fill="#006233" />
      <path
        className="MRFlagIcon__st1"
        d="M470 154.6a150 150 0 01-300 0 154.9 154.9 0 00-5 39.2 155 155 0 10310 0 154.4 154.4 0 00-5-39.2z"
        fill="#ffc400"
      />
      <path
        d="M320 93.8l-13.5 41.5H263l35.3 25.6-13.5 41.4 35.3-25.6 35.3 25.6-13.5-41.4 35.3-25.6h-43.6z"
        fill="#ffc400"
      />
    </svg>
  );
};

const FlagIconWithForwardedRef = forwardRef<SVGSVGElement, FlagIconProps>((iconProps, ref) => (
  <FlagIcon {...iconProps} svgRef={ref} />
));

export const MRFlagIcon = memo(createStyledFlagIcon(FlagIconWithForwardedRef));

MRFlagIcon.displayName = 'MRFlagIcon';
