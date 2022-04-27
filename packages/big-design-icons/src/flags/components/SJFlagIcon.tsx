// **********************************
// Auto-generated file, do NOT modify
// **********************************
import React, { forwardRef, memo } from 'react';

import { PrivateIconProps } from '../../base';
import { useUniqueId } from '../../utils';
import { createStyledFlagIcon, FlagIconProps } from '../base';

const FlagIcon: React.FC<FlagIconProps & PrivateIconProps> = ({
  svgRef,
  title = 'SJ flag',
  theme,
  ...props
}) => {
  const uniqueTitleId = useUniqueId('icon');
  const titleId = title ? props.titleId || uniqueTitleId : undefined;
  const ariaHidden = titleId ? undefined : true;

  return (
    <svg aria-hidden={ariaHidden} aria-labelledby={titleId} ref={svgRef} viewBox="0 0 640 480" {...props}>
      {title ? <title id={titleId}>{title}</title> : null}
      <path d="M0 0h640v480H0z" fill="#ef2b2d" />
      <path d="M180 0h120v480H180z" fill="#fff" />
      <path d="M0 180h640v120H0z" fill="#fff" />
      <path d="M210 0h60v480h-60z" fill="#002868" />
      <path d="M0 210h640v60H0z" fill="#002868" />
    </svg>
  );
};

const FlagIconWithForwardedRef = forwardRef<SVGSVGElement, FlagIconProps>((iconProps, ref) => (
  <FlagIcon {...iconProps} svgRef={ref} />
));

export const SJFlagIcon = memo(createStyledFlagIcon(FlagIconWithForwardedRef));

SJFlagIcon.displayName = 'SJFlagIcon';
