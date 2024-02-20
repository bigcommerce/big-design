// **********************************
// Auto-generated file, do NOT modify
// **********************************
import React, { forwardRef, memo, useId } from 'react';

import { PrivateIconProps } from '../../base';
import { createStyledFlagIcon, FlagIconProps } from '../base';

const FlagIcon: React.FC<FlagIconProps & PrivateIconProps> = ({
  svgRef,
  title = 'EH flag',
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
        <clipPath id="EHFlagIcon__a">
          <path d="M-158.7 0H524v512h-682.7z" fillOpacity={0.7} />
        </clipPath>
      </defs>
      <g clipPath="url(#EHFlagIcon__a)" fillRule="evenodd" transform="translate(148.8) scale(.94)">
        <path d="M-158.3 0h680.9v255.3h-680.9z" fill="#000001" />
        <path d="M-158.3 255.3h680.9v255.3h-680.9z" fill="#007a3d" />
        <path d="M-158.3 148.9h680.9v212.8h-680.9z" fill="#fff" />
        <path d="M-158.3 0l340.4 255.3-340.4 255.3z" fill="#c4111b" />
        <circle cx={352.3} cy={255.3} fill="#c4111b" r={68.1} />
        <circle cx={377.9} cy={255.3} fill="#fff" r={68.1} />
        <path
          d="M334 296.5l29.1-20.7 28.8 21-10.8-34 29-20.9-35.7-.2-11-34-11.2 33.9-35.7-.2 28.7 21.2-11.1 34z"
          fill="#c4111b"
        />
      </g>
    </svg>
  );
};

const FlagIconWithForwardedRef = forwardRef<SVGSVGElement, FlagIconProps>((iconProps, ref) => (
  <FlagIcon {...iconProps} svgRef={ref} />
));

export const EHFlagIcon = memo(createStyledFlagIcon(FlagIconWithForwardedRef));

EHFlagIcon.displayName = 'EHFlagIcon';
