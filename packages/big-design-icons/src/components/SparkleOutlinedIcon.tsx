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
      <path d="m11.636 10.182-1.818-4-1.818 4L4 12l4 1.818 1.818 4 1.818-4 4-1.818zm-.643 3.013-1.175 2.462-1.145-2.462L6.163 12l2.51-1.145 1.145-2.512 1.175 2.512L13.475 12zM18 6l-.91-2-.908 2-2 .91 2 .908.909 2 .909-2 2-.909zm-.66 1.169-.25.549-.234-.55-.577-.236.577-.258.235-.573.25.573.558.235zm.66 9.013-.91-2-.908 2-2 .909 2 .909.909 2L18 18l2-.91zm-.66 1.169-.25.549-.234-.55-.577-.236.577-.258.235-.573.25.573.558.235z" />
    </svg>
  );
};
const IconWithForwardedRef = forwardRef<SVGSVGElement, IconProps>((iconProps, ref) => (
  <Icon {...iconProps} svgRef={ref} />
));

export const SparkleOutlinedIcon = memo(createStyledIcon(IconWithForwardedRef));
SparkleOutlinedIcon.displayName = 'SparkleOutlinedIcon';
