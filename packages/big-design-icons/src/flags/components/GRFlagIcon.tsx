// **********************************
// Auto-generated file, do NOT modify
// **********************************
import React, { forwardRef, memo, useId } from 'react';

import { PrivateIconProps } from '../../base';
import { createStyledFlagIcon, FlagIconProps } from '../base';

const FlagIcon: React.FC<FlagIconProps & PrivateIconProps> = ({
  svgRef,
  title = 'GR flag',
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
      <path d="M0 0h640v53.3H0z" fill="#0d5eaf" fillRule="evenodd" />
      <path d="M0 53.3h640v53.4H0z" fill="#fff" fillRule="evenodd" />
      <path d="M0 106.7h640V160H0z" fill="#0d5eaf" fillRule="evenodd" />
      <path d="M0 160h640v53.3H0z" fill="#fff" fillRule="evenodd" />
      <path d="M0 0h266.7v266.7H0z" fill="#0d5eaf" />
      <path d="M0 213.3h640v53.4H0z" fill="#0d5eaf" fillRule="evenodd" />
      <path d="M0 266.7h640V320H0z" fill="#fff" fillRule="evenodd" />
      <path d="M0 320h640v53.3H0z" fill="#0d5eaf" fillRule="evenodd" />
      <path d="M0 373.3h640v53.4H0z" fill="#fff" fillRule="evenodd" />
      <g fill="#fff" fillRule="evenodd" strokeWidth={1.3}>
        <path d="M106.7 0H160v266.7h-53.3z" />
        <path d="M0 106.7h266.7V160H0z" />
      </g>
      <path d="M0 426.7h640V480H0z" fill="#0d5eaf" />
    </svg>
  );
};

const FlagIconWithForwardedRef = forwardRef<SVGSVGElement, FlagIconProps>((iconProps, ref) => (
  <FlagIcon {...iconProps} svgRef={ref} />
));

export const GRFlagIcon = memo(createStyledFlagIcon(FlagIconWithForwardedRef));

GRFlagIcon.displayName = 'GRFlagIcon';
