// **********************************
// Auto-generated file, do NOT modify
// **********************************

'use client';

import React, { forwardRef, memo, useId } from 'react';

import { PrivateIconProps } from '../../base';
import { createStyledFlagIcon, FlagIconProps } from '../base';

const FlagIcon: React.FC<FlagIconProps & PrivateIconProps> = ({
  svgRef,
  title = 'JM flag',
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
        <path d="M0 0l320 240L0 480zm640 0L320 240l320 240z" />
        <path d="M0 0l320 240L640 0zm0 480l320-240 320 240z" fill="#090" />
        <path d="M640 0h-59.6L0 435.3V480h59.6L640 44.7z" fill="#fc0" />
        <path d="M0 0v44.7L580.4 480H640v-44.7L59.6 0z" fill="#fc0" />
      </g>
    </svg>
  );
};

const FlagIconWithForwardedRef = forwardRef<SVGSVGElement, FlagIconProps>((iconProps, ref) => (
  <FlagIcon {...iconProps} svgRef={ref} />
));

export const JMFlagIcon = memo(createStyledFlagIcon(FlagIconWithForwardedRef));

JMFlagIcon.displayName = 'JMFlagIcon';
