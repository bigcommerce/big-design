// **********************************
// Auto-generated file, do NOT modify
// **********************************
import React, { forwardRef, memo, useId } from 'react';

import { createStyledIcon, IconProps, PrivateIconProps } from '../base';

const Icon: React.FC<IconProps & PrivateIconProps> = ({ svgRef, title, theme, ...props }) => {
  const uniqueTitleId = useId();
  const titleId = title ? props.titleId || uniqueTitleId : undefined;
  const ariaHidden = titleId ? undefined : true;

  return (
    <svg
      aria-hidden={ariaHidden}
      aria-labelledby={titleId}
      fill="currentColor"
      height={24}
      ref={svgRef}
      stroke="currentColor"
      strokeWidth="0"
      width={24}
      {...props}
    >
      {title ? <title id={titleId}>{title}</title> : null}
      <path d="M11.25 19.57v-7.14L5 8.811v7.14zm1.5 0L19 15.95V8.812l-6.25 3.62zM12 11.139l6.175-3.57L12 4 5.825 7.57zm-8.5 5.698V7.164L12 2.277l8.5 4.887v9.673L12 21.723z" />
    </svg>
  );
};
const IconWithForwardedRef = forwardRef<SVGSVGElement, IconProps>((iconProps, ref) => (
  <Icon {...iconProps} svgRef={ref} />
));

export const ProductsIcon = memo(createStyledIcon(IconWithForwardedRef));
ProductsIcon.displayName = 'ProductsIcon';
