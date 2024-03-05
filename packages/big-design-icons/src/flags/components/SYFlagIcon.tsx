// **********************************
// Auto-generated file, do NOT modify
// **********************************
import React, { forwardRef, memo, useId } from 'react';

import { createStyledFlagIcon, FlagIconProps, PrivateIconProps } from '../base';

const FlagIcon: React.FC<FlagIconProps & PrivateIconProps> = ({
  svgRef,
  title = 'SY flag',
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
      <path d="M0 0h640v480H0Z" fill="#000001" />
      <path d="M0 0h640v320H0Z" fill="#fff" />
      <path d="M0 0h640v160H0Z" fill="#ce1126" />
      <path
        d="m161 300 39-120 39 120-102-74.2h126M401 300l39-120 39 120-102-74.2h126"
        fill="#007a3d"
      />
    </svg>
  );
};
const FlagIconWithForwardedRef = forwardRef<SVGSVGElement, FlagIconProps>((iconProps, ref) => (
  <FlagIcon {...iconProps} svgRef={ref} />
));

export const SYFlagIcon = memo(createStyledFlagIcon(FlagIconWithForwardedRef));
SYFlagIcon.displayName = 'SYFlagIcon';
