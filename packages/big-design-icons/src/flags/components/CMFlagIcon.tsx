// **********************************
// Auto-generated file, do NOT modify
// **********************************
import React, { forwardRef, memo } from 'react';

import { PrivateIconProps } from '../../base';
import { useUniqueId } from '../../utils';
import { createStyledFlagIcon, FlagIconProps } from '../base';

const FlagIcon: React.FC<FlagIconProps & PrivateIconProps> = ({ svgRef, title = 'CM flag', theme, ...props }) => {
  const uniqueTitleId = useUniqueId('icon');
  const titleId = title ? props.titleId || uniqueTitleId : undefined;

  return (
    <svg viewBox="0 0 640 480" ref={svgRef} aria-labelledby={titleId} {...props}>
      {title ? <title id={titleId}>{title}</title> : null}
      <path fill="#007a5e" d="M0 0h213.3v480H0z" />
      <path fill="#ce1126" d="M213.3 0h213.4v480H213.3z" />
      <path fill="#fcd116" d="M426.7 0H640v480H426.7z" />
      <g fill="#fcd116" transform="translate(320 240) scale(7.1111)">
        <g id="CMFlagIcon__b">
          <path id="CMFlagIcon__a" d="M0-8L-2.5-.4 1.3.9z" />
          <use width="100%" height="100%" transform="scale(-1 1)" xlinkHref="#CMFlagIcon__a" />
        </g>
        <use width="100%" height="100%" transform="rotate(72)" xlinkHref="#CMFlagIcon__b" />
        <use width="100%" height="100%" transform="rotate(144)" xlinkHref="#CMFlagIcon__b" />
        <use width="100%" height="100%" transform="rotate(-144)" xlinkHref="#CMFlagIcon__b" />
        <use width="100%" height="100%" transform="rotate(-72)" xlinkHref="#CMFlagIcon__b" />
      </g>
    </svg>
  );
};

const FlagIconWithForwardedRef = forwardRef<SVGSVGElement, FlagIconProps>((iconProps, ref) => (
  <FlagIcon {...iconProps} svgRef={ref} />
));

export const CMFlagIcon = memo(createStyledFlagIcon(FlagIconWithForwardedRef as React.FC<FlagIconProps>));

CMFlagIcon.displayName = 'CMFlagIcon';
