// **********************************
// Auto-generated file, do NOT modify
// **********************************
import React, { forwardRef, memo } from 'react';

import { PrivateIconProps } from '../../base';
import { useUniqueId } from '../../utils';
import { createStyledFlagIcon, FlagIconProps } from '../base';

const FlagIcon: React.FC<FlagIconProps & PrivateIconProps> = ({ svgRef, title = 'CN flag', theme, ...props }) => {
  const uniqueTitleId = useUniqueId('icon');
  const titleId = title ? props.titleId || uniqueTitleId : undefined;
  const ariaHidden = titleId ? undefined : true;

  return (
    <svg
      xmlnsXlink="http://www.w3.org/1999/xlink"
      viewBox="0 0 640 480"
      aria-hidden={ariaHidden}
      ref={svgRef}
      aria-labelledby={titleId}
      {...props}
    >
      {title ? <title id={titleId}>{title}</title> : null}
      <defs>
        <path id="CNFlagIcon__a" fill="#ffde00" d="M-.6.8L0-1 .6.8-1-.3h2z" />
      </defs>
      <path fill="#de2910" d="M0 0h640v480H0z" />
      <use width={30} height={20} transform="matrix(71.9991 0 0 72 120 120)" xlinkHref="#CNFlagIcon__a" />
      <use
        width={30}
        height={20}
        transform="matrix(-12.33562 -20.5871 20.58684 -12.33577 240.3 48)"
        xlinkHref="#CNFlagIcon__a"
      />
      <use
        width={30}
        height={20}
        transform="matrix(-3.38573 -23.75998 23.75968 -3.38578 288 95.8)"
        xlinkHref="#CNFlagIcon__a"
      />
      <use
        width={30}
        height={20}
        transform="matrix(6.5991 -23.0749 23.0746 6.59919 288 168)"
        xlinkHref="#CNFlagIcon__a"
      />
      <use
        width={30}
        height={20}
        transform="matrix(14.9991 -18.73557 18.73533 14.99929 240 216)"
        xlinkHref="#CNFlagIcon__a"
      />
    </svg>
  );
};

const FlagIconWithForwardedRef = forwardRef<SVGSVGElement, FlagIconProps>((iconProps, ref) => (
  <FlagIcon {...iconProps} svgRef={ref} />
));

export const CNFlagIcon = memo(createStyledFlagIcon(FlagIconWithForwardedRef as React.FC<FlagIconProps>));

CNFlagIcon.displayName = 'CNFlagIcon';
