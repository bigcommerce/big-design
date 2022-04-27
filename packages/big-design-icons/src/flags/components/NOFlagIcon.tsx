// **********************************
// Auto-generated file, do NOT modify
// **********************************
import React, { forwardRef, memo } from 'react';

import { PrivateIconProps } from '../../base';
import { useUniqueId } from '../../utils';
import { createStyledFlagIcon, FlagIconProps } from '../base';

const FlagIcon: React.FC<FlagIconProps & PrivateIconProps> = ({
  svgRef,
  title = 'NO flag',
  theme,
  ...props
}) => {
  const uniqueTitleId = useUniqueId('icon');
  const titleId = title ? props.titleId || uniqueTitleId : undefined;
  const ariaHidden = titleId ? undefined : true;

  return (
    <svg aria-hidden={ariaHidden} aria-labelledby={titleId} ref={svgRef} viewBox="0 0 640 480" {...props}>
      {title ? <title id={titleId}>{title}</title> : null}
      <path d="M0 0h640v480H0z" fill="#ed2939" />
      <path d="M180 0h120v480H180z" fill="#fff" />
      <path d="M0 180h640v120H0z" fill="#fff" />
      <path d="M210 0h60v480h-60z" fill="#002664" />
      <path d="M0 210h640v60H0z" fill="#002664" />
    </svg>
  );
};

const FlagIconWithForwardedRef = forwardRef<SVGSVGElement, FlagIconProps>((iconProps, ref) => (
  <FlagIcon {...iconProps} svgRef={ref} />
));

export const NOFlagIcon = memo(createStyledFlagIcon(FlagIconWithForwardedRef));

NOFlagIcon.displayName = 'NOFlagIcon';
