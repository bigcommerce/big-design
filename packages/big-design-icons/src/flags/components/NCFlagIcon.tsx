// **********************************
// Auto-generated file, do NOT modify
// **********************************
import React, { forwardRef, memo } from 'react';

import { PrivateIconProps } from '../../base';
import { useUniqueId } from '../../utils';
import { createStyledFlagIcon, FlagIconProps } from '../base';

const FlagIcon: React.FC<FlagIconProps & PrivateIconProps> = ({ svgRef, title = 'NC flag', theme, ...props }) => {
  const uniqueTitleId = useUniqueId('icon');
  const titleId = title ? props.titleId || uniqueTitleId : undefined;

  return (
    <svg viewBox="0 0 640 480" ref={svgRef} aria-labelledby={titleId} {...props}>
      {title ? <title id={titleId}>{title}</title> : null}
      <path fill="#009543" d="M0 0h640v480H0z" />
      <path fill="#ed4135" d="M0 0h640v320H0z" />
      <path fill="#0035ad" d="M0 0h640v160H0z" />
      <circle cx={240} cy={240} r={157.3} fill="#fae600" stroke="#000" strokeWidth={5.3} />
      <path stroke="#000" strokeWidth={6.4} d="M213.3 263.5h53.3M213.3 224h53.3M240 83.2V352" />
      <path d="M176.6 384.4c64.2 26.3 124.4 1.7 124.4 1.7s-22.7-24.6-34.3-34.2c-11.4-9.4-44.8-9-56.2 0a488.7 488.7 0 00-33.9 32.5z" />
      <ellipse cx={240} cy={312.5} rx={17.6} ry={25.6} />
      <ellipse cx={240} cy={243.7} rx={21.3} ry={13.5} />
      <circle cx={240} cy={181.3} r={21.3} />
      <path d="M265.6 101.9s1.8 3-2 10c-18.6 33.5-37.3 34.2-40.8 37.1-4 3.2-5.6 3-5.6 3 .3-2.9.5-14.6.7-15.7 2.9-15.7 26.5-15.5 45-31.5 2.9-2.5 2.7-3 2.7-3zM203.2 173.867s4.268 11.947 4.8 24c1.068 19.2 19.414 19.734 32.001 19.734v-10.667c-9.493 0-17.707-1.387-24.533-15.467a122.667 122.667 0 00-12.267-17.6zm-.532 154.667s6.72-8.32 14.613-27.733c4.053-10.133 13.867-16 22.72-16v-14.933c-20.267 0-30.08 7.466-31.04 18.56-2.133 22.506-6.293 40.106-6.293 40.106z" />
      <use width="100%" height="100%" transform="matrix(-1 0 0 1 480 0)" xlinkHref="#NCFlagIcon__leaf" />
    </svg>
  );
};

const FlagIconWithForwardedRef = forwardRef<SVGSVGElement, FlagIconProps>((iconProps, ref) => (
  <FlagIcon {...iconProps} svgRef={ref} />
));

export const NCFlagIcon = memo(createStyledFlagIcon(FlagIconWithForwardedRef as React.FC<FlagIconProps>));

NCFlagIcon.displayName = 'NCFlagIcon';
