// **********************************
// Auto-generated file, do NOT modify
// **********************************
import React, { forwardRef, memo, useId } from 'react';

import { createStyledFlagIcon, FlagIconProps, PrivateIconProps } from '../base';

const FlagIcon: React.FC<FlagIconProps & PrivateIconProps> = ({
  svgRef,
  title = 'IN flag',
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
      <path d="M0 0h640v160H0z" fill="#f93" />
      <path d="M0 160h640v160H0z" fill="#fff" />
      <path d="M0 320h640v160H0z" fill="#128807" />
      <g transform="matrix(3.2 0 0 3.2 320 240)">
        <circle fill="#008" r={20} />
        <circle fill="#fff" r={17.5} />
        <circle fill="#008" r={3.5} />
        <g id="INFlagIcon__d">
          <g id="INFlagIcon__c">
            <g id="INFlagIcon__b">
              <g fill="#008" id="INFlagIcon__a">
                <circle r={0.9} transform="rotate(7.5 -8.8 133.5)" />
                <path d="M0 17.5.6 7 0 2l-.6 5z" />
              </g>
              <use height="100%" transform="rotate(15)" width="100%" xlinkHref="#INFlagIcon__a" />
            </g>
            <use height="100%" transform="rotate(30)" width="100%" xlinkHref="#INFlagIcon__b" />
          </g>
          <use height="100%" transform="rotate(60)" width="100%" xlinkHref="#INFlagIcon__c" />
        </g>
        <use height="100%" transform="rotate(120)" width="100%" xlinkHref="#INFlagIcon__d" />
        <use height="100%" transform="rotate(-120)" width="100%" xlinkHref="#INFlagIcon__d" />
      </g>
    </svg>
  );
};
const FlagIconWithForwardedRef = forwardRef<SVGSVGElement, FlagIconProps>((iconProps, ref) => (
  <FlagIcon {...iconProps} svgRef={ref} />
));

export const INFlagIcon = memo(createStyledFlagIcon(FlagIconWithForwardedRef));
INFlagIcon.displayName = 'INFlagIcon';
