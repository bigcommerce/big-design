// **********************************
// Auto-generated file, do NOT modify
// **********************************
import React, { forwardRef, memo, useId } from 'react';

import { PrivateIconProps } from '../../base';
import { createStyledFlagIcon, FlagIconProps } from '../base';

const FlagIcon: React.FC<FlagIconProps & PrivateIconProps> = ({
  svgRef,
  title = 'FO flag',
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
      <defs>
        <clipPath id="FOFlagIcon__a">
          <path d="M-78 32h640v480H-78z" fillOpacity={0.7} />
        </clipPath>
      </defs>
      <g
        clipPath="url(#FOFlagIcon__a)"
        fillRule="evenodd"
        strokeWidth={0}
        transform="translate(78 -32)"
      >
        <path d="M-78 32h663.9v480H-78z" fill="#fff" />
        <path
          d="M-76 218.7h185.9V32H216v186.7h371.8v106.6H216V512H109.9V325.3h-186z"
          fill="#003897"
        />
        <path d="M-76 245.3h212.4V32h53.1v213.3H588v53.4H189.5V512h-53V298.7H-76z" fill="#d72828" />
      </g>
    </svg>
  );
};

const FlagIconWithForwardedRef = forwardRef<SVGSVGElement, FlagIconProps>((iconProps, ref) => (
  <FlagIcon {...iconProps} svgRef={ref} />
));

export const FOFlagIcon = memo(createStyledFlagIcon(FlagIconWithForwardedRef));

FOFlagIcon.displayName = 'FOFlagIcon';
