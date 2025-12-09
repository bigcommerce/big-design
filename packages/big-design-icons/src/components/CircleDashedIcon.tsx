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
      <path d="M11 3.23c0-.64-.59-1.13-1.21-.99-1.12.26-2.18.7-3.12 1.3-.53.34-.61 1.1-.16 1.55.32.32.83.4 1.21.16.77-.49 1.62-.85 2.54-1.05.44-.1.74-.51.74-.97m6.33.32c-.94-.6-2-1.04-3.12-1.3a.998.998 0 0 0-1.21.98c0 .45.3.87.74.96.91.2 1.77.57 2.53 1.05.39.24.89.17 1.21-.16a.972.972 0 0 0-.15-1.53M20.77 11c.64 0 1.13-.59.99-1.21-.26-1.12-.7-2.18-1.3-3.12-.34-.53-1.1-.61-1.55-.16-.32.32-.4.83-.16 1.21.49.77.85 1.62 1.05 2.53.1.45.51.75.97.75M5.1 6.51c-.46-.45-1.21-.38-1.55.16-.6.94-1.04 2-1.3 3.12-.14.62.34 1.21.98 1.21.45 0 .87-.3.96-.74.2-.91.57-1.77 1.05-2.53.26-.39.18-.9-.14-1.22M3.23 13c-.64 0-1.13.59-.99 1.21.26 1.12.7 2.17 1.3 3.12.34.54 1.1.61 1.55.16.32-.32.4-.83.15-1.21-.49-.76-.85-1.61-1.05-2.53-.09-.45-.5-.75-.96-.75m15.67 4.49c.45.45 1.21.38 1.55-.15.6-.94 1.04-2 1.3-3.11.14-.62-.35-1.21-.98-1.21-.45 0-.87.3-.96.74-.2.91-.57 1.76-1.05 2.53-.26.37-.18.88.14 1.2M13 20.77c0 .64.59 1.13 1.21.99 1.12-.26 2.17-.7 3.12-1.3.54-.34.61-1.1.16-1.55-.32-.32-.83-.4-1.21-.15-.76.49-1.61.85-2.53 1.05-.45.09-.75.5-.75.96m-6.33-.32c.95.6 2 1.04 3.12 1.3.62.14 1.21-.35 1.21-.98 0-.45-.3-.87-.74-.96a8 8 0 0 1-2.53-1.05.97.97 0 0 0-1.21.16.972.972 0 0 0 .15 1.53" />
    </svg>
  );
};
const IconWithForwardedRef = forwardRef<SVGSVGElement, IconProps>((iconProps, ref) => (
  <Icon {...iconProps} svgRef={ref} />
));

export const CircleDashedIcon = memo(createStyledIcon(IconWithForwardedRef));
CircleDashedIcon.displayName = 'CircleDashedIcon';
