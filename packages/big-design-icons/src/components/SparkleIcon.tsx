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
      viewBox="0 0 24 24"
      width={24}
      {...props}
    >
      {title ? <title id={titleId}>{title}</title> : null}
      <path d="M0 0h24v24H0z" fill="none" />
      <path d="m11.636 10.182-1.818-4-1.818 4L4 12l4 1.818 1.818 4 1.818-4 4-1.818zM18 6l-.91-2-.908 2-2 .91 2 .908.909 2 .909-2 2-.909zm0 10.182-.91-2-.908 2-2 .909 2 .909.909 2L18 18l2-.91z" />
    </svg>
  );
};
const IconWithForwardedRef = forwardRef<SVGSVGElement, IconProps>((iconProps, ref) => (
  <Icon {...iconProps} svgRef={ref} />
));

export const SparkleIcon = memo(createStyledIcon(IconWithForwardedRef));
SparkleIcon.displayName = 'SparkleIcon';
