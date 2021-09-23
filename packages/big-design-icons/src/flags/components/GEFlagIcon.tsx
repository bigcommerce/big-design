// **********************************
// Auto-generated file, do NOT modify
// **********************************
import React, { forwardRef, memo } from 'react';

import { PrivateIconProps } from '../../base';
import { useUniqueId } from '../../utils';
import { createStyledFlagIcon, FlagIconProps } from '../base';

const FlagIcon: React.FC<FlagIconProps & PrivateIconProps> = ({ svgRef, title = 'GE flag', theme, ...props }) => {
  const uniqueTitleId = useUniqueId('icon');
  const titleId = title ? props.titleId || uniqueTitleId : undefined;
  const ariaHidden = titleId ? undefined : true;

  return (
    <svg viewBox="0 0 640 480" aria-hidden={ariaHidden} ref={svgRef} aria-labelledby={titleId} {...props}>
      {title ? <title id={titleId}>{title}</title> : null}
      <path fill="#fff" d="M0 0h640v480H0z" />
      <path fill="red" d="M272 0h96v480h-96z" />
      <path fill="red" d="M0 192h640v96H0z" />
      <path
        style={{
          mixBlendMode: 'multiply',
        }}
        fill="red"
        fillRule="evenodd"
        d="M146.8 373.1c1-16.8 4-31.1 4-31.1s-9.8 1-14.8 1c-4.9 0-14.8-1-14.8-1s3 14.3 4 31.2c-16.9-1-31.2-4-31.2-4s1 7.4 1 14.8-1 14.8-1 14.8 14.3-3 31.2-4c-1 16.9-4 31.2-4 31.2s7.4-1 14.8-1 14.8 1 14.8 1-3-14.3-4-31.2c16.9 1 31.2 4 31.2 4s-1-9.8-1-14.8c0-4.9 1-14.8 1-14.8s-14.3 3-31.1 4zm368-288c1-16.8 4-31.1 4-31.1s-9.8 1-14.8 1c-4.9 0-14.8-1-14.8-1s3 14.3 4 31.1c-16.9-1-31.2-3.9-31.2-3.9s1 7.4 1 14.8-1 14.8-1 14.8 14.3-3 31.2-4c-1 16.9-4 31.2-4 31.2s7.4-1 14.8-1 14.8 1 14.8 1-3-14.3-4-31.1c16.9 1 31.2 4 31.2 4s-1-10-1-14.9 1-14.8 1-14.8-14.3 3-31.2 4zm-368 0c1-16.8 4-31.1 4-31.1s-9.8 1-14.8 1c-4.9 0-14.8-1-14.8-1s3 14.3 4 31.2c-16.9-1-31.2-4-31.2-4s1 7.4 1 14.8-1 14.8-1 14.8 14.3-3 31.2-4c-1 16.9-4 31.2-4 31.2s7.4-1 14.8-1 14.8 1 14.8 1-3-14.3-4-31.2c16.9 1 31.2 4 31.2 4s-1-9.8-1-14.8c0-4.9 1-14.8 1-14.8s-14.3 3-31.1 4zm368 288c1-16.8 4-31.1 4-31.1s-9.8 1-14.8 1c-4.9 0-14.8-1-14.8-1s3 14.3 4 31.2c-16.9-1-31.2-4-31.2-4s1 7.4 1 14.8-1 14.8-1 14.8 14.3-3 31.2-4c-1 16.9-4 31.2-4 31.2s7.4-1 14.8-1 14.8 1 14.8 1-3-14.3-4-31.2c16.9 1 31.2 4 31.2 4s-1-9.8-1-14.8c0-4.9 1-14.8 1-14.8s-14.3 3-31.2 4z"
      />
    </svg>
  );
};

const FlagIconWithForwardedRef = forwardRef<SVGSVGElement, FlagIconProps>((iconProps, ref) => (
  <FlagIcon {...iconProps} svgRef={ref} />
));

export const GEFlagIcon = memo(createStyledFlagIcon(FlagIconWithForwardedRef as React.FC<FlagIconProps>));

GEFlagIcon.displayName = 'GEFlagIcon';
