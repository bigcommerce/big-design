// **********************************
// Auto-generated file, do NOT modify
// **********************************
import React, { forwardRef, memo, useId } from 'react';

import { PrivateIconProps } from '../../base';
import { createStyledFlagIcon, FlagIconProps } from '../base';

const FlagIcon: React.FC<FlagIconProps & PrivateIconProps> = ({
  svgRef,
  title = 'GE flag',
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
      <path d="M0 0h640v480H0z" fill="#fff" />
      <path d="M272 0h96v480h-96z" fill="red" />
      <path d="M0 192h640v96H0z" fill="red" />
      <path
        d="M146.8 373.1c1-16.8 4-31.1 4-31.1s-9.8 1-14.8 1c-4.9 0-14.8-1-14.8-1s3 14.3 4 31.2c-16.9-1-31.2-4-31.2-4s1 7.4 1 14.8-1 14.8-1 14.8 14.3-3 31.2-4c-1 16.9-4 31.2-4 31.2s7.4-1 14.8-1 14.8 1 14.8 1-3-14.3-4-31.2c16.9 1 31.2 4 31.2 4s-1-9.8-1-14.8c0-4.9 1-14.8 1-14.8s-14.3 3-31.1 4zm368-288c1-16.8 4-31.1 4-31.1s-9.8 1-14.8 1c-4.9 0-14.8-1-14.8-1s3 14.3 4 31.1c-16.9-1-31.2-3.9-31.2-3.9s1 7.4 1 14.8-1 14.8-1 14.8 14.3-3 31.2-4c-1 16.9-4 31.2-4 31.2s7.4-1 14.8-1 14.8 1 14.8 1-3-14.3-4-31.1c16.9 1 31.2 4 31.2 4s-1-10-1-14.9 1-14.8 1-14.8-14.3 3-31.2 4zm-368 0c1-16.8 4-31.1 4-31.1s-9.8 1-14.8 1c-4.9 0-14.8-1-14.8-1s3 14.3 4 31.2c-16.9-1-31.2-4-31.2-4s1 7.4 1 14.8-1 14.8-1 14.8 14.3-3 31.2-4c-1 16.9-4 31.2-4 31.2s7.4-1 14.8-1 14.8 1 14.8 1-3-14.3-4-31.2c16.9 1 31.2 4 31.2 4s-1-9.8-1-14.8c0-4.9 1-14.8 1-14.8s-14.3 3-31.1 4zm368 288c1-16.8 4-31.1 4-31.1s-9.8 1-14.8 1c-4.9 0-14.8-1-14.8-1s3 14.3 4 31.2c-16.9-1-31.2-4-31.2-4s1 7.4 1 14.8-1 14.8-1 14.8 14.3-3 31.2-4c-1 16.9-4 31.2-4 31.2s7.4-1 14.8-1 14.8 1 14.8 1-3-14.3-4-31.2c16.9 1 31.2 4 31.2 4s-1-9.8-1-14.8c0-4.9 1-14.8 1-14.8s-14.3 3-31.2 4z"
        fill="red"
        fillRule="evenodd"
      />
    </svg>
  );
};

const FlagIconWithForwardedRef = forwardRef<SVGSVGElement, FlagIconProps>((iconProps, ref) => (
  <FlagIcon {...iconProps} svgRef={ref} />
));

export const GEFlagIcon = memo(createStyledFlagIcon(FlagIconWithForwardedRef));

GEFlagIcon.displayName = 'GEFlagIcon';
