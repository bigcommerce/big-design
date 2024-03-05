// **********************************
// Auto-generated file, do NOT modify
// **********************************
import React, { forwardRef, memo, useId } from 'react';

import { createStyledFlagIcon, FlagIconProps, PrivateIconProps } from '../base';

const FlagIcon: React.FC<FlagIconProps & PrivateIconProps> = ({
  svgRef,
  title = 'GG flag',
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
      <path d="M0 0h640v480H0z" fill="#fff" />
      <path d="M256 0h128v480H256z" fill="#e8112d" />
      <path d="M0 176h640v128H0z" fill="#e8112d" />
      <path d="m110 286.7 23.3-23.4h210v-46.6h-210L110 193.3z" fill="#f9dd16" id="GGFlagIcon__a" />
      <use height={24} transform="rotate(90 320 240)" width={36} xlinkHref="#GGFlagIcon__a" />
      <use height={24} transform="rotate(-90 320 240)" width={36} xlinkHref="#GGFlagIcon__a" />
      <use height={24} transform="rotate(180 320 240)" width={36} xlinkHref="#GGFlagIcon__a" />
    </svg>
  );
};
const FlagIconWithForwardedRef = forwardRef<SVGSVGElement, FlagIconProps>((iconProps, ref) => (
  <FlagIcon {...iconProps} svgRef={ref} />
));

export const GGFlagIcon = memo(createStyledFlagIcon(FlagIconWithForwardedRef));
GGFlagIcon.displayName = 'GGFlagIcon';
