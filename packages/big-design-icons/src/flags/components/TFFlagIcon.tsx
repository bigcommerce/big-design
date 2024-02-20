// **********************************
// Auto-generated file, do NOT modify
// **********************************
import React, { forwardRef, memo, useId } from 'react';

import { PrivateIconProps } from '../../base';
import { createStyledFlagIcon, FlagIconProps } from '../base';

const FlagIcon: React.FC<FlagIconProps & PrivateIconProps> = ({
  svgRef,
  title = 'TF flag',
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
      xmlnsXlink="http://www.w3.org/1999/xlink"
      {...props}
    >
      {title ? <title id={titleId}>{title}</title> : null}
      <defs>
        <path d="M0-21l12.3 38L-20-6.5h40L-12.3 17z" fill="#fff" id="TFFlagIcon__a" />
      </defs>
      <path d="M0 0h640v480H0z" fill="#002395" />
      <path d="M0 0h292.8v196.8H0z" fill="#fff" />
      <path d="M0 0h96v192H0z" fill="#002395" />
      <path d="M192 0h96v192h-96z" fill="#ed2939" />
      <path
        d="M426 219.6l15.4 24.6h44V330l-33-51.6-44.4 70.8h21.6l22.8-40.8 46.8 84 46.8-84 22.8 40.8h21.6L546 278.4 513 330v-47.4h19.8l14.7-23.4H513v-15h44l15.4-24.6zm51.6 105h-48v16.8h48zm91.2 0h-48v16.8h48z"
        fill="#fff"
      />
      <use
        height="100%"
        transform="scale(1.2)"
        width="100%"
        x={416}
        xlinkHref="#TFFlagIcon__a"
        y={362}
      />
      <use
        height="100%"
        transform="scale(1.2)"
        width="100%"
        x={371}
        xlinkHref="#TFFlagIcon__a"
        y={328}
      />
      <use
        height="100%"
        transform="scale(1.2)"
        width="100%"
        x={461}
        xlinkHref="#TFFlagIcon__a"
        y={328}
      />
      <use
        height="100%"
        transform="scale(1.2)"
        width="100%"
        x={333}
        xlinkHref="#TFFlagIcon__a"
        y={227}
      />
      <use
        height="100%"
        transform="scale(1.2)"
        width="100%"
        x={499}
        xlinkHref="#TFFlagIcon__a"
        y={227}
      />
    </svg>
  );
};

const FlagIconWithForwardedRef = forwardRef<SVGSVGElement, FlagIconProps>((iconProps, ref) => (
  <FlagIcon {...iconProps} svgRef={ref} />
));

export const TFFlagIcon = memo(createStyledFlagIcon(FlagIconWithForwardedRef));

TFFlagIcon.displayName = 'TFFlagIcon';
