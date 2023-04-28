// **********************************
// Auto-generated file, do NOT modify
// **********************************

'use client';

import React, { forwardRef, memo, useId } from 'react';

import { PrivateIconProps } from '../../base';
import { createStyledFlagIcon, FlagIconProps } from '../base';

const FlagIcon: React.FC<FlagIconProps & PrivateIconProps> = ({
  svgRef,
  title = 'CEFTA flag',
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
      <path d="M0 0h640v480H0z" fill="#039" />
      <circle cx={320} cy={249.8} fill="none" r={30.4} stroke="#fc0" strokeWidth={27.5} />
      <circle cx={320} cy={249.8} fill="none" r={88.3} stroke="#fc0" strokeWidth={27.5} />
      <path d="M404.7 165.1l84.7 84.7-84.7 84.7-84.7-84.7z" fill="#039" />
      <path
        d="M175.7 236.1h59.2v27.5h-59.2zm259.1 0h88.3v27.5h-88.3zM363 187.4l38.8-38.8 19.4 19.5-38.7 38.7zM306.3 48.6h27.5v107.1h-27.5z"
        fill="#fc0"
      />
      <circle cx={225.1} cy={159.6} fill="#fc0" r={13.7} />
      <circle cx={144.3} cy={249.8} fill="#fc0" r={13.7} />
      <circle cx={320} cy={381.4} fill="#fc0" r={13.7} />
      <circle cx={320} cy={425.5} fill="#fc0" r={13.7} />
      <circle cx={408.3} cy={249.8} fill="#fc0" r={13.7} />
      <path
        d="M208.3 341.5l19.5-19.4 19.4 19.4-19.4 19.5zm204.7 21l19.5-19.5 19.5 19.5-19.5 19.4z"
        fill="#fc0"
      />
    </svg>
  );
};

const FlagIconWithForwardedRef = forwardRef<SVGSVGElement, FlagIconProps>((iconProps, ref) => (
  <FlagIcon {...iconProps} svgRef={ref} />
));

export const CEFTAFlagIcon = memo(createStyledFlagIcon(FlagIconWithForwardedRef));

CEFTAFlagIcon.displayName = 'CEFTAFlagIcon';
