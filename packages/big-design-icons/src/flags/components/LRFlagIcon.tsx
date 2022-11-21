// **********************************
// Auto-generated file, do NOT modify
// **********************************
import React, { forwardRef, memo, useId } from 'react';

import { PrivateIconProps } from '../../base';
import { createStyledFlagIcon, FlagIconProps } from '../base';

const FlagIcon: React.FC<FlagIconProps & PrivateIconProps> = ({
  svgRef,
  title = 'LR flag',
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
      <defs>
        <clipPath id="LRFlagIcon__a">
          <path d="M0 0h682.7v512H0z" fillOpacity={0.7} />
        </clipPath>
      </defs>
      <g clipPath="url(#LRFlagIcon__a)" fillRule="evenodd" transform="scale(.9375)">
        <path d="M0 0h767.9v512H0z" fill="#fff" />
        <path d="M0 0h232.7v232.8H0z" fill="#006" />
        <path d="M0 464.9h767.9V512H0z" fill="#c00" />
        <path
          d="M0 465.4h767.9V512H0zm0-92.9h767.9v46.2H0zm0-93.2h766V326H0zM232.7 0h535.1v46.5H232.7zm0 186h535.1v46.8H232.7zm0-92.7h535.1v46.5H232.7z"
          fill="#c00"
        />
        <path
          d="M166.3 177.5l-50.7-31-50.4 31.3 18.7-50.9-50.3-31.4 62.3-.4 19.3-50.7L135 95h62.3l-50.1 31.7 19.1 50.8z"
          fill="#fff"
        />
      </g>
    </svg>
  );
};

const FlagIconWithForwardedRef = forwardRef<SVGSVGElement, FlagIconProps>((iconProps, ref) => (
  <FlagIcon {...iconProps} svgRef={ref} />
));

export const LRFlagIcon = memo(createStyledFlagIcon(FlagIconWithForwardedRef));

LRFlagIcon.displayName = 'LRFlagIcon';
