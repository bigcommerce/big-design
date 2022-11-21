// **********************************
// Auto-generated file, do NOT modify
// **********************************
import React, { forwardRef, memo, useId } from 'react';

import { PrivateIconProps } from '../../base';
import { createStyledFlagIcon, FlagIconProps } from '../base';

const FlagIcon: React.FC<FlagIconProps & PrivateIconProps> = ({
  svgRef,
  title = 'NA flag',
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
        <clipPath id="NAFlagIcon__a">
          <path d="M0 0h640v480H0z" fillOpacity={0.7} />
        </clipPath>
      </defs>
      <g clipPath="url(#NAFlagIcon__a)" fillRule="evenodd">
        <path d="M0 0h640v480H0z" fill="#fff" />
        <path d="M-26.4.2l.8 345.6L512.5 0-26.4.2z" fill="#3662a2" />
        <path d="M666.4 479.6L665 120.3 122.3 479.8l544-.2z" fill="#38a100" />
        <path
          d="M-26 371.8l.4 108.2 117.5-.1L665.4 95.4l-.7-94.1-116-1L-26 371.7z"
          fill="#c70000"
        />
        <path
          d="M219.6 172l-21.8-13.2-12.6 22.1-12.2-22.2-22 12.9.6-25.4-25.4.2 13.2-21.8-22.1-12.5 22.2-12.3-12.8-22 25.4.6-.1-25.5 21.7 13.2L186.3 44l12.2 22.2 22-12.9-.6 25.4 25.4-.2-13.2 21.8 22.1 12.5-22.2 12.3 12.8 22-25.4-.6z"
          fill="#ffe700"
        />
        <path
          d="M232.4 112.4c0 25.6-20.9 46.3-46.6 46.3s-46.6-20.7-46.6-46.3 20.8-46.2 46.6-46.2 46.6 20.7 46.6 46.2z"
          fill="#3662a2"
        />
        <path d="M222.3 112.4a36.5 36.5 0 11-73 0 36.5 36.5 0 0173 0z" fill="#ffe700" />
      </g>
    </svg>
  );
};

const FlagIconWithForwardedRef = forwardRef<SVGSVGElement, FlagIconProps>((iconProps, ref) => (
  <FlagIcon {...iconProps} svgRef={ref} />
));

export const NAFlagIcon = memo(createStyledFlagIcon(FlagIconWithForwardedRef));

NAFlagIcon.displayName = 'NAFlagIcon';
