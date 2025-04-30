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
      viewBox="0 -960 960 960"
      width={24}
      {...props}
    >
      {title ? <title id={titleId}>{title}</title> : null}
      <path d="M80-140v-320h320v320zm80-80h160v-160H160zm60-340 220-360 220 360zm142-80h156l-78-126zM863-42 757-148q-21 14-45.5 21t-51.5 7q-75 0-127.5-52.5T480-300t52.5-127.5T660-480t127.5 52.5T840-300q0 26-7 50.5T813-204L919-98zM660-200q42 0 71-29t29-71-29-71-71-29-71 29-29 71 29 71 71 29M440-640" />
    </svg>
  );
};
const IconWithForwardedRef = forwardRef<SVGSVGElement, IconProps>((iconProps, ref) => (
  <Icon {...iconProps} svgRef={ref} />
));

export const CategorySearchIcon = memo(createStyledIcon(IconWithForwardedRef));
CategorySearchIcon.displayName = 'CategorySearchIcon';
