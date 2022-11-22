// **********************************
// Auto-generated file, do NOT modify
// **********************************
import React, { forwardRef, memo, useId } from 'react';

import { PrivateIconProps } from '../../base';
import { createStyledFlagIcon, FlagIconProps } from '../base';

const FlagIcon: React.FC<FlagIconProps & PrivateIconProps> = ({
  svgRef,
  title = 'LC flag',
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
        <path d="M0 0h640v480H0z" fill="#65cfff" />
        <path d="M318.9 42l162.7 395.3-322.6.9L318.9 42z" fill="#fff" />
        <path d="M319 96.5l140.8 340-279 .8L319 96.5z" />
        <path d="M318.9 240.1l162.7 197.6-322.6.5 159.9-198.1z" fill="#ffce00" />
      </g>
    </svg>
  );
};

const FlagIconWithForwardedRef = forwardRef<SVGSVGElement, FlagIconProps>((iconProps, ref) => (
  <FlagIcon {...iconProps} svgRef={ref} />
));

export const LCFlagIcon = memo(createStyledFlagIcon(FlagIconWithForwardedRef));

LCFlagIcon.displayName = 'LCFlagIcon';
