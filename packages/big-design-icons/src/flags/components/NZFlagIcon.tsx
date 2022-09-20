// **********************************
// Auto-generated file, do NOT modify
// **********************************
import React, { forwardRef, memo } from 'react';

import { PrivateIconProps } from '../../base';
import { useUniqueId } from '../../utils';
import { createStyledFlagIcon, FlagIconProps } from '../base';

const FlagIcon: React.FC<FlagIconProps & PrivateIconProps> = ({
  svgRef,
  title = 'NZ flag',
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
      <defs>
        <g id="NZFlagIcon__b">
          <g id="NZFlagIcon__a">
            <path d="M0 0v.5L1 0z" transform="translate(0 -.3)" />
            <path d="M0 0v-.5L1 0z" transform="rotate(-36 .5 -.2)" />
          </g>
          <use transform="scale(-1 1)" xlinkHref="#NZFlagIcon__a" />
          <use transform="rotate(72 0 0)" xlinkHref="#NZFlagIcon__a" />
          <use transform="rotate(-72 0 0)" xlinkHref="#NZFlagIcon__a" />
          <use transform="scale(-1 1) rotate(72)" xlinkHref="#NZFlagIcon__a" />
        </g>
      </defs>
      <path d="M0 0h640v480H0z" fill="#00247d" fillRule="evenodd" />
      <g transform="translate(-111 36.1) scale(.66825)">
        <use
          fill="#fff"
          height="100%"
          transform="matrix(45.4 0 0 45.4 900 120)"
          width="100%"
          xlinkHref="#NZFlagIcon__b"
        />
        <use
          fill="#cc142b"
          height="100%"
          transform="matrix(30 0 0 30 900 120)"
          width="100%"
          xlinkHref="#NZFlagIcon__b"
        />
      </g>
      <g transform="rotate(82 525.2 114.6) scale(.66825)">
        <use
          fill="#fff"
          height="100%"
          transform="rotate(-82 519 -457.7) scale(40.4)"
          width="100%"
          xlinkHref="#NZFlagIcon__b"
        />
        <use
          fill="#cc142b"
          height="100%"
          transform="rotate(-82 519 -457.7) scale(25)"
          width="100%"
          xlinkHref="#NZFlagIcon__b"
        />
      </g>
      <g transform="rotate(82 525.2 114.6) scale(.66825)">
        <use
          fill="#fff"
          height="100%"
          transform="rotate(-82 668.6 -327.7) scale(45.4)"
          width="100%"
          xlinkHref="#NZFlagIcon__b"
        />
        <use
          fill="#cc142b"
          height="100%"
          transform="rotate(-82 668.6 -327.7) scale(30)"
          width="100%"
          xlinkHref="#NZFlagIcon__b"
        />
      </g>
      <g transform="translate(-111 36.1) scale(.66825)">
        <use
          fill="#fff"
          height="100%"
          transform="matrix(50.4 0 0 50.4 900 480)"
          width="100%"
          xlinkHref="#NZFlagIcon__b"
        />
        <use
          fill="#cc142b"
          height="100%"
          transform="matrix(35 0 0 35 900 480)"
          width="100%"
          xlinkHref="#NZFlagIcon__b"
        />
      </g>
      <path d="M0 0h320v240H0z" fill="#012169" />
      <path
        d="M37.5 0l122 90.5L281 0h39v31l-120 89.5 120 89V240h-40l-120-89.5L40.5 240H0v-30l119.5-89L0 32V0z"
        fill="#fff"
      />
      <path
        d="M212 140.5L320 220v20l-135.5-99.5zm-92 10l3 17.5-96 72H0zM320 0v1.5l-124.5 94 1-22L295 0zM0 0l119.5 88h-30L0 21z"
        fill="#c8102e"
      />
      <path d="M120.5 0v240h80V0zM0 80v80h320V80z" fill="#fff" />
      <path d="M0 96.5v48h320v-48zM136.5 0v240h48V0z" fill="#c8102e" />
    </svg>
  );
};

const FlagIconWithForwardedRef = forwardRef<SVGSVGElement, FlagIconProps>((iconProps, ref) => (
  <FlagIcon {...iconProps} svgRef={ref} />
));

export const NZFlagIcon = memo(createStyledFlagIcon(FlagIconWithForwardedRef));

NZFlagIcon.displayName = 'NZFlagIcon';
