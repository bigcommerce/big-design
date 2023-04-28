// **********************************
// Auto-generated file, do NOT modify
// **********************************

'use client';

import React, { forwardRef, memo, useId } from 'react';

import { PrivateIconProps } from '../../base';
import { createStyledFlagIcon, FlagIconProps } from '../base';

const FlagIcon: React.FC<FlagIconProps & PrivateIconProps> = ({
  svgRef,
  title = 'XX flag',
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
      <path
        d="M.5.5h638.9v478.9H.5z"
        fill="#fff"
        fillRule="evenodd"
        stroke="#adb5bd"
        strokeWidth={1.1}
      />
      <path d="M.5.5l639 479m0-479l-639 479" fill="none" stroke="#adb5bd" strokeWidth={1.1} />
    </svg>
  );
};

const FlagIconWithForwardedRef = forwardRef<SVGSVGElement, FlagIconProps>((iconProps, ref) => (
  <FlagIcon {...iconProps} svgRef={ref} />
));

export const XXFlagIcon = memo(createStyledFlagIcon(FlagIconWithForwardedRef));

XXFlagIcon.displayName = 'XXFlagIcon';
