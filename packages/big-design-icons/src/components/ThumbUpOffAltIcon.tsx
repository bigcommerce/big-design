// **********************************
// Auto-generated file, do NOT modify
// **********************************
import React, { forwardRef, memo, useId } from 'react';

import { createStyledIcon, type IconProps, type PrivateIconProps } from '../base';

const Icon: React.FC<IconProps & PrivateIconProps> = ({
  svgRef,
  title,
  theme,
  color,
  size,
  ...props
}) => {
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
      <path d="M9.01 21H18c.8 0 1.52-.48 1.83-1.21l3.26-7.61c.85-1.98-.6-4.18-2.75-4.18h-5.65l.95-4.58c.1-.5-.05-1.01-.41-1.37-.29-.29-.67-.43-1.05-.43s-.77.15-1.06.44L7.59 7.6c-.37.37-.58.88-.58 1.41V19c0 1.1.9 2 2 2m4.33-16.33-.61 2.92-.5 2.41h8.11c.47 0 .72.28.83.45s.27.51.08.95L18 19H9.01V9.01zM3 21c1.1 0 2-.9 2-2v-8c0-1.1-.9-2-2-2s-2 .9-2 2v8c0 1.1.9 2 2 2" />
    </svg>
  );
};
const IconWithForwardedRef = forwardRef<SVGSVGElement, IconProps>((iconProps, ref) => (
  <Icon {...iconProps} svgRef={ref} />
));

export const ThumbUpOffAltIcon = memo(createStyledIcon(IconWithForwardedRef));
ThumbUpOffAltIcon.displayName = 'ThumbUpOffAltIcon';
