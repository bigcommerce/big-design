// **********************************
// Auto-generated file, do NOT modify
// **********************************
import React, { forwardRef, memo } from 'react';

import { PrivateIconProps } from '../../base';
import { useUniqueId } from '../../utils';
import { createStyledFlagIcon, FlagIconProps } from '../base';

const FlagIcon: React.FC<FlagIconProps & PrivateIconProps> = ({
  svgRef,
  title = 'TZ flag',
  theme,
  ...props
}) => {
  const uniqueTitleId = useUniqueId('icon');
  const titleId = title ? props.titleId || uniqueTitleId : undefined;
  const ariaHidden = titleId ? undefined : true;

  return (
    <svg aria-hidden={ariaHidden} aria-labelledby={titleId} ref={svgRef} viewBox="0 0 640 480" {...props}>
      {title ? <title id={titleId}>{title}</title> : null}
      <defs>
        <clipPath id="TZFlagIcon__a">
          <path d="M10 0h160v120H10z" fillOpacity={0.7} />
        </clipPath>
      </defs>
      <g clipPath="url(#TZFlagIcon__a)" fillRule="evenodd" strokeWidth="1pt" transform="matrix(4 0 0 4 -40 0)">
        <path d="M0 0h180v120H0z" fill="#09f" />
        <path d="M0 0h180L0 120V0z" fill="#090" />
        <path d="M0 120h40l140-95V0h-40L0 95v25z" />
        <path d="M0 91.5L137.2 0h13.5L0 100.5v-9zM29.3 120L180 19.5v9L42.8 120H29.3z" fill="#ff0" />
      </g>
    </svg>
  );
};

const FlagIconWithForwardedRef = forwardRef<SVGSVGElement, FlagIconProps>((iconProps, ref) => (
  <FlagIcon {...iconProps} svgRef={ref} />
));

export const TZFlagIcon = memo(createStyledFlagIcon(FlagIconWithForwardedRef));

TZFlagIcon.displayName = 'TZFlagIcon';
