// **********************************
// Auto-generated file, do NOT modify
// **********************************
import React, { forwardRef, memo } from 'react';

import { PrivateIconProps } from '../../base';
import { useUniqueId } from '../../utils';
import { createStyledFlagIcon, FlagIconProps } from '../base';

const FlagIcon: React.FC<FlagIconProps & PrivateIconProps> = ({ svgRef, title = 'BI flag', theme, ...props }) => {
  const uniqueTitleId = useUniqueId('icon');
  const titleId = title ? props.titleId || uniqueTitleId : undefined;
  const ariaHidden = titleId ? undefined : true;

  return (
    <svg viewBox="0 0 640 480" aria-hidden={ariaHidden} ref={svgRef} aria-labelledby={titleId} {...props}>
      {title ? <title id={titleId}>{title}</title> : null}
      <defs>
        <clipPath id="BIFlagIcon__a">
          <path fillOpacity={0.7} d="M-90.5 0H592v512H-90.5z" />
        </clipPath>
      </defs>
      <g fillRule="evenodd" clipPath="url(#BIFlagIcon__a)" transform="translate(84.9) scale(.9375)">
        <path fill="#00cf00" d="M-178 0l428.8 256L-178 512zm857.6 0L250.8 256l428.8 256z" />
        <path fill="red" d="M-178 0l428.8 256L679.6 0zm0 512l428.8-256 428.8 256z" />
        <path fill="#fff" d="M679.6 0h-79.9L-178 464.3V512h79.9L679.6 47.7z" />
        <path fill="#fff" d="M398.9 256a148 148 0 11-296.1 0 148 148 0 01296 0z" />
        <path fill="#fff" d="M-178 0v47.7L599.7 512h79.9v-47.7L-98.1 0z" />
        <path
          fill="red"
          stroke="#00de00"
          strokeWidth={3.9}
          d="M280 200.2l-19.3.3-10 16.4-9.9-16.4-19.2-.4 9.3-16.9-9.2-16.8 19.2-.4 10-16.4 9.9 16.5 19.2.4-9.3 16.8zm-64.6 111.6l-19.2.3-10 16.4-9.9-16.4-19.2-.4 9.3-16.9-9.2-16.8 19.2-.4 10-16.4 9.9 16.5 19.2.4-9.3 16.8zm130.6 0l-19.2.3-10 16.4-10-16.4-19.1-.4 9.3-16.9-9.3-16.8 19.2-.4 10-16.4 10 16.5 19.2.4-9.4 16.8z"
        />
      </g>
    </svg>
  );
};

const FlagIconWithForwardedRef = forwardRef<SVGSVGElement, FlagIconProps>((iconProps, ref) => (
  <FlagIcon {...iconProps} svgRef={ref} />
));

export const BIFlagIcon = memo(createStyledFlagIcon(FlagIconWithForwardedRef as React.FC<FlagIconProps>));

BIFlagIcon.displayName = 'BIFlagIcon';
