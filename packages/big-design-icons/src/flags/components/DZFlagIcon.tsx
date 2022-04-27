// **********************************
// Auto-generated file, do NOT modify
// **********************************
import React, { forwardRef, memo } from 'react';

import { PrivateIconProps } from '../../base';
import { useUniqueId } from '../../utils';
import { createStyledFlagIcon, FlagIconProps } from '../base';

const FlagIcon: React.FC<FlagIconProps & PrivateIconProps> = ({
  svgRef,
  title = 'DZ flag',
  theme,
  ...props
}) => {
  const uniqueTitleId = useUniqueId('icon');
  const titleId = title ? props.titleId || uniqueTitleId : undefined;
  const ariaHidden = titleId ? undefined : true;

  return (
    <svg aria-hidden={ariaHidden} aria-labelledby={titleId} ref={svgRef} viewBox="0 0 640 480" {...props}>
      {title ? <title id={titleId}>{title}</title> : null}
      <path d="M320 0h320v480H320z" fill="#fff" />
      <path d="M0 0h320v480H0z" fill="#006233" />
      <path d="M424 180a120 120 0 100 120 96 96 0 110-120m4 60l-108-35.2 67.2 92V183.2l-67.2 92z" fill="#d21034" />
    </svg>
  );
};

const FlagIconWithForwardedRef = forwardRef<SVGSVGElement, FlagIconProps>((iconProps, ref) => (
  <FlagIcon {...iconProps} svgRef={ref} />
));

export const DZFlagIcon = memo(createStyledFlagIcon(FlagIconWithForwardedRef));

DZFlagIcon.displayName = 'DZFlagIcon';
