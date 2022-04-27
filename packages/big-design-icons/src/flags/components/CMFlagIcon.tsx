// **********************************
// Auto-generated file, do NOT modify
// **********************************
import React, { forwardRef, memo } from 'react';

import { PrivateIconProps } from '../../base';
import { useUniqueId } from '../../utils';
import { createStyledFlagIcon, FlagIconProps } from '../base';

const FlagIcon: React.FC<FlagIconProps & PrivateIconProps> = ({
  svgRef,
  title = 'CM flag',
  theme,
  ...props
}) => {
  const uniqueTitleId = useUniqueId('icon');
  const titleId = title ? props.titleId || uniqueTitleId : undefined;
  const ariaHidden = titleId ? undefined : true;

  return (
    <svg
      aria-hidden={ariaHidden}
      aria-labelledby={titleId}
      ref={svgRef}
      viewBox="0 0 640 480"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      {...props}
    >
      {title ? <title id={titleId}>{title}</title> : null}
      <path d="M0 0h213.3v480H0z" fill="#007a5e" />
      <path d="M213.3 0h213.4v480H213.3z" fill="#ce1126" />
      <path d="M426.7 0H640v480H426.7z" fill="#fcd116" />
      <g fill="#fcd116" transform="translate(320 240) scale(7.1111)">
        <g id="CMFlagIcon__b">
          <path d="M0-8L-2.5-.4 1.3.9z" id="CMFlagIcon__a" />
          <use height="100%" transform="scale(-1 1)" width="100%" xlinkHref="#CMFlagIcon__a" />
        </g>
        <use height="100%" transform="rotate(72)" width="100%" xlinkHref="#CMFlagIcon__b" />
        <use height="100%" transform="rotate(144)" width="100%" xlinkHref="#CMFlagIcon__b" />
        <use height="100%" transform="rotate(-144)" width="100%" xlinkHref="#CMFlagIcon__b" />
        <use height="100%" transform="rotate(-72)" width="100%" xlinkHref="#CMFlagIcon__b" />
      </g>
    </svg>
  );
};

const FlagIconWithForwardedRef = forwardRef<SVGSVGElement, FlagIconProps>((iconProps, ref) => (
  <FlagIcon {...iconProps} svgRef={ref} />
));

export const CMFlagIcon = memo(createStyledFlagIcon(FlagIconWithForwardedRef));

CMFlagIcon.displayName = 'CMFlagIcon';
