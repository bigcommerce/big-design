// **********************************
// Auto-generated file, do NOT modify
// **********************************
import React, { forwardRef, memo, useId } from 'react';

import { PrivateIconProps } from '../../base';
import { createStyledFlagIcon, FlagIconProps } from '../base';

const FlagIcon: React.FC<FlagIconProps & PrivateIconProps> = ({
  svgRef,
  title = 'ESPV flag',
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
      {...props}
    >
      {title ? <title id={titleId}>{title}</title> : null}
      <path d="M0 0h640v480H0z" fill="#D52B1E" />
      <path
        d="M0 0h53.1l133.4 100.1 133.5 100L586.9 0H640v39.9l-133.4 100L373.2 240 640 440.2V480h-53.1L453.5 380A69411.7 69411.7 0 00320 279.9L53.1 480H0v-39.8l133.4-100.1L266.8 240 0 39.9v-20z"
        fill="#009B48"
      />
      <path
        d="M288.1 0h63.8v208.1H640v63.8H351.9V480h-63.8V271.9H0v-63.8h288.1v-104z"
        fill="#FFF"
      />
    </svg>
  );
};

const FlagIconWithForwardedRef = forwardRef<SVGSVGElement, FlagIconProps>((iconProps, ref) => (
  <FlagIcon {...iconProps} svgRef={ref} />
));

export const ESPVFlagIcon = memo(createStyledFlagIcon(FlagIconWithForwardedRef));

ESPVFlagIcon.displayName = 'ESPVFlagIcon';
