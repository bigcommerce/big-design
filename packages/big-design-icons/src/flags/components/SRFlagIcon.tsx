// **********************************
// Auto-generated file, do NOT modify
// **********************************
import React, { forwardRef, memo } from 'react';

import { PrivateIconProps } from '../../base';
import { useUniqueId } from '../../utils';
import { createStyledFlagIcon, FlagIconProps } from '../base';

const FlagIcon: React.FC<FlagIconProps & PrivateIconProps> = ({
  svgRef,
  title = 'SR flag',
  theme,
  ...props
}) => {
  const uniqueTitleId = useUniqueId('icon');
  const titleId = title ? props.titleId || uniqueTitleId : undefined;
  const ariaHidden = titleId ? undefined : true;

  return (
    <svg aria-hidden={ariaHidden} aria-labelledby={titleId} ref={svgRef} viewBox="0 0 640 480" {...props}>
      {title ? <title id={titleId}>{title}</title> : null}
      <path d="M.1 0h640v480H.1z" fill="#377e3f" />
      <path d="M.1 96h640v288H.1z" fill="#fff" />
      <path d="M.1 144h640v192H.1z" fill="#b40a2d" />
      <path d="M320 153.2l56.4 173.6-147.7-107.3h182.6L263.6 326.8z" fill="#ecc81d" />
    </svg>
  );
};

const FlagIconWithForwardedRef = forwardRef<SVGSVGElement, FlagIconProps>((iconProps, ref) => (
  <FlagIcon {...iconProps} svgRef={ref} />
));

export const SRFlagIcon = memo(createStyledFlagIcon(FlagIconWithForwardedRef));

SRFlagIcon.displayName = 'SRFlagIcon';
