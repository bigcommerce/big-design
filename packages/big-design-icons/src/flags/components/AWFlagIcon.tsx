// **********************************
// Auto-generated file, do NOT modify
// **********************************
import React, { forwardRef, memo, useId } from 'react';

import { PrivateIconProps } from '../../base';
import { createStyledFlagIcon, FlagIconProps } from '../base';

const FlagIcon: React.FC<FlagIconProps & PrivateIconProps> = ({
  svgRef,
  title = 'AW flag',
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
        <clipPath id="AWFlagIcon__a">
          <path d="M0 0h288v216H0z" fillOpacity={0.7} />
        </clipPath>
      </defs>
      <g clipPath="url(#AWFlagIcon__a)" transform="scale(2.2222)">
        <path d="M0 0v216h324V0z" fill="#39c" />
        <path d="M0 144v12h324v-12zm0 24v12h324v-12z" fill="#ff0" />
      </g>
      <path d="M142.7 28l2.9 3zm-3 6l3 3zm5.9 0l3 3z" fill="#9cc" />
      <path d="M139.7 37l3 2.9-3-3m5.9 0l3 3z" fill="#ccf" />
      <path d="M136.7 42.8l3 3z" fill="#6cc" />
      <path d="M142.7 42.8l2.9 3z" fill="#c66" />
      <path d="M148.6 42.8l2.9 3z" fill="#6cc" />
      <path d="M136.7 45.8l3 3zm11.9 0l2.9 3z" fill="#ccf" />
      <path d="M139.7 48.7l3 3zm5.9 0l3 3z" fill="#fcc" />
      <path d="M133.8 51.7l3 3z" fill="#6cc" />
      <path
        d="M142.2 34l-20.7 78.5L42.8 134l78.4 20.5 21 78.4 20.9-78.4 78.4-21-78.4-20.9-21-78.4z"
        fill="#c00"
        stroke="#fff"
        strokeWidth={3.7}
      />
      <path d="M151.5 51.7l3 3z" fill="#6cc" />
      <path d="M133.8 54.6l3 3zm17.7 0l3 3z" fill="#9cf" />
      <path d="M136.7 57.6l3 3zm11.9 0l2.9 3z" fill="#fcc" />
      <path d="M130.8 60.5l3 3z" fill="#69c" />
      <path d="M137.7 62.5l1 2zm11.8 0l1 2z" fill="#c33" />
      <path d="M154.5 60.5l3 3z" fill="#69c" />
      <path d="M130.8 63.5l3 3zm23.7 0l3 3z" fill="#9cf" />
      <path d="M133.8 66.4l3 3zm17.7 0l3 3z" fill="#fcc" />
      <path d="M127.9 69.4l3 3zm29.5 0l3 3z" fill="#69c" />
      <path d="M127.9 72.3l3 3zm29.5 0l3 3z" fill="#9cc" />
      <path d="M127.9 75.3l3 3zm29.5 0l3 3z" fill="#cff" />
      <path d="M125 78.3l2.9 2.9z" fill="#69c" />
      <path d="M130.8 78.3l3 2.9zm23.7 0l3 3z" fill="#fcc" />
      <path d="M160.4 78.3l3 2.9z" fill="#69c" />
      <path d="M125 81.2l2.9 3z" fill="#9cc" />
      <path d="M131.8 83.2l1 2zm23.6 0l1 2z" fill="#c33" />
      <path d="M160.4 81.2l3 3z" fill="#9cc" />
      <path d="M125 84.2l2.9 3zm35.5 0l3 3z" fill="#cff" />
      <path d="M127.9 87.1l3 3zm29.5 0l3 3z" fill="#fcc" />
      <path d="M122 90l3 3z" fill="#9cc" />
      <path d="M128.9 92l1 2zm29.5 0l1 2z" fill="#c33" />
      <path d="M163.3 90l3 3z" fill="#9cc" />
      <path d="M122 93l3 3zm41.3 0l3 3z" fill="#ccf" />
      <path d="M125 96l2.9 3zm35.5 0l3 3z" fill="#fcc" />
      <path d="M119 99l3 2.9z" fill="#9cc" />
      <path d="M126 100.9l.9 2zm35.4 0l1 2z" fill="#c33" />
      <path d="M166.3 99l3 2.9z" fill="#9cc" />
      <path d="M119 101.9l3 3zm47.3 0l3 3z" fill="#ccf" />
      <path d="M122 104.8l3 3zm41.3 0l3 3z" fill="#fcc" />
      <path d="M116 107.8l3 3z" fill="#9cc" />
      <path d="M122 107.8l3 3zm41.3 0l3 3z" fill="#c33" />
      <path d="M169.2 107.8l3 3zm-62 3l3 2.9z" fill="#9cc" />
      <path d="M110.2 110.7l3 3zm65 0l2.9 3z" fill="#ccf" />
      <path d="M178 110.7l3 3zm-79.6 3l3 3z" fill="#9cc" />
      <path d="M101.3 113.7l3 3z" fill="#ccf" />
      <path d="M113.1 113.7l3 3z" fill="#fcc" />
      <path d="M116 113.7l3 3zm53.2 0l3 3z" fill="#c33" />
      <path d="M172.2 113.7l3 3z" fill="#fcc" />
      <path d="M184 113.7l3 3z" fill="#ccf" />
      <path d="M187 113.7l2.9 3z" fill="#9cc" />
      <path d="M86.6 116.6l3 3z" fill="#69c" />
      <path d="M89.5 116.6l3 3z" fill="#9cc" />
      <path d="M92.5 116.6l3 3z" fill="#cff" />
      <path d="M104.3 116.6l3 3z" fill="#fcc" />
      <path d="M109.2 117.6l2 1zm67.9 0l2 1z" fill="#c33" />
      <path d="M181 116.6l3 3z" fill="#fcc" />
      <path d="M192.8 116.6l3 3z" fill="#cff" />
      <path d="M195.8 116.6l3 3z" fill="#9cc" />
      <path d="M198.7 116.6l3 3zm-121 3l3 3z" fill="#69c" />
      <path d="M80.7 119.6l3 3z" fill="#9cc" />
      <path d="M83.6 119.6l3 3z" fill="#cff" />
      <path d="M95.4 119.6l3 3z" fill="#fcc" />
      <path d="M100.3 120.6l2 1zm85.6 0l2 1z" fill="#c33" />
      <path d="M189.9 119.6l3 3z" fill="#fcc" />
      <path d="M201.7 119.6l3 3z" fill="#cff" />
      <path d="M204.6 119.6l3 3z" fill="#9cc" />
      <path d="M207.6 119.6l3 3zm-138.8 3l3 2.9z" fill="#69c" />
      <path d="M71.8 122.5l3 3z" fill="#9cf" />
      <path d="M86.6 122.5l3 3z" fill="#fcc" />
      <path d="M91.5 123.5l2 1zm103.3 0l2 1z" fill="#c33" />
      <path d="M198.7 122.5l3 3z" fill="#fcc" />
      <path d="M213.5 122.5l3 3z" fill="#9cf" />
      <path d="M216.4 122.5l3 3z" fill="#69c" />
      <path d="M60 125.5l3 3z" fill="#6cc" />
      <path d="M63 125.5l2.9 3z" fill="#9cf" />
      <path d="M74.8 125.5l2.9 3zm135.8 0l2.9 3z" fill="#fcc" />
      <path d="M222.3 125.5l3 3z" fill="#9cf" />
      <path d="M225.3 125.5l3 3zm-174.2 3l3 2.9z" fill="#6cc" />
      <path d="M54 128.4l3 3z" fill="#ccf" />
      <path d="M65.9 128.4l3 3z" fill="#fcc" />
      <path d="M70.8 129.4l2 1zm144.7 0l2 1z" fill="#c33" />
      <path d="M219.4 128.4l3 3z" fill="#fcc" />
      <path d="M231.2 128.4l3 3z" fill="#ccf" />
      <path d="M234.2 128.4l3 3z" fill="#6cc" />
      <path d="M42.3 131.4l3 3z" fill="#9cc" />
      <path d="M45.2 131.4l3 3z" fill="#ccf" />
      <path d="M57 131.4l3 3zm171.3 0l3 3z" fill="#fcc" />
      <path d="M240 131.4l3 3z" fill="#ccf" />
      <path d="M243 131.4l3 3zm-206.6 3l3 2.9z" fill="#9cc" />
      <path d="M51.1 134.3l3 3zm183 0l3 3z" fill="#c66" />
      <path d="M249 134.3l2.9 3zm-206.6 3l3 3z" fill="#9cc" />
      <path d="M45.2 137.3l3 3z" fill="#ccf" />
      <path d="M57 137.3l3 3zm171.3 0l3 3z" fill="#fcc" />
      <path d="M240 137.3l3 3z" fill="#ccf" />
      <path d="M243 137.3l3 3z" fill="#9cc" />
      <path d="M51.1 140.3l3 2.9z" fill="#6cc" />
      <path d="M54 140.3l3 2.9z" fill="#ccf" />
      <path d="M65.9 140.3l3 2.9z" fill="#fcc" />
      <path d="M70.8 141.2l2 1zm144.7 0l2 1z" fill="#c33" />
      <path d="M219.4 140.3l3 2.9z" fill="#fcc" />
      <path d="M231.2 140.3l3 2.9z" fill="#ccf" />
      <path d="M234.2 140.3l3 2.9zm-174.2 3l3 3z" fill="#6cc" />
      <path d="M63 143.2l2.9 3z" fill="#9cf" />
      <path d="M74.8 143.2l2.9 3zm135.8 0l2.9 3z" fill="#fcc" />
      <path d="M222.3 143.2l3 3z" fill="#9cf" />
      <path d="M225.3 143.2l3 3z" fill="#6cc" />
      <path d="M68.8 146.2l3 2.9z" fill="#69c" />
      <path d="M71.8 146.2l3 2.9z" fill="#9cf" />
      <path d="M86.6 146.2l3 2.9z" fill="#fcc" />
      <path d="M91.5 147.1l2 1zm103.3 0l2 1z" fill="#c33" />
      <path d="M198.7 146.2l3 2.9z" fill="#fcc" />
      <path d="M213.5 146.2l3 2.9z" fill="#9cf" />
      <path d="M216.4 146.2l3 2.9zm-138.7 3l3 3z" fill="#69c" />
      <path d="M80.7 149.1l3 3z" fill="#9cc" />
      <path d="M83.6 149.1l3 3z" fill="#cff" />
      <path d="M95.4 149.1l3 3z" fill="#fcc" />
      <path d="M100.3 150l2 1zm85.6 0l2 1z" fill="#c33" />
      <path d="M189.9 149.1l3 3z" fill="#fcc" />
      <path d="M201.7 149.1l3 3z" fill="#cff" />
      <path d="M204.6 149.1l3 3z" fill="#9cc" />
      <path d="M207.6 149.1l3 3zm-121 3l2.9 2.9z" fill="#69c" />
      <path d="M89.5 152l3 3z" fill="#9cc" />
      <path d="M92.5 152l3 3z" fill="#cff" />
      <path d="M104.3 152l3 3z" fill="#fcc" />
      <path d="M109.2 153l2 1zm67.9 0l2 1z" fill="#c33" />
      <path d="M181 152l3 3z" fill="#fcc" />
      <path d="M192.8 152l3 3z" fill="#cff" />
      <path d="M195.8 152l3 3z" fill="#9cc" />
      <path d="M198.7 152l3 3z" fill="#69c" />
      <path d="M98.4 155l3 3z" fill="#9cc" />
      <path d="M101.3 155l3 3z" fill="#ccf" />
      <path d="M113.1 155l3 3z" fill="#fcc" />
      <path d="M116 155l3 3zm53.2 0l3 3z" fill="#c33" />
      <path d="M172.2 155l3 3z" fill="#fcc" />
      <path d="M184 155l3 3z" fill="#ccf" />
      <path d="M187 155l2.9 3zm-79.7 3l3 3z" fill="#9cc" />
      <path d="M110.2 158l3 3zm65 0l2.9 3z" fill="#ccf" />
      <path d="M178 158l3 3zm-62 3l3 2.9z" fill="#9cc" />
      <path d="M122 161l3 2.9zm41.3 0l3 3z" fill="#c33" />
      <path d="M169.2 161l3 2.9z" fill="#9cc" />
      <path d="M122 163.9l3 3zm41.3 0l3 3z" fill="#fcc" />
      <path d="M119 166.8l3 3z" fill="#ccf" />
      <path d="M126 168.8l.9 2zm35.4 0l1 2z" fill="#c33" />
      <path d="M166.3 166.8l3 3z" fill="#ccf" />
      <path d="M119 169.8l3 3zm47.3 0l3 3z" fill="#9cc" />
      <path d="M125 172.7l2.9 3zm35.5 0l3 3z" fill="#fcc" />
      <path d="M122 175.7l3 3z" fill="#ccf" />
      <path d="M128.9 177.6l1 2zm29.5 0l1 2z" fill="#c33" />
      <path d="M163.3 175.7l3 3z" fill="#ccf" />
      <path d="M122 178.6l3 3zm41.3 0l3 3z" fill="#9cc" />
      <path d="M127.9 181.6l3 3zm29.5 0l3 3z" fill="#fcc" />
      <path d="M125 184.5l2.9 3z" fill="#cff" />
      <path d="M131.8 186.5l1 2zm23.6 0l1 2z" fill="#c33" />
      <path d="M160.4 184.5l3 3z" fill="#cff" />
      <path d="M125 187.5l2.9 3zm35.5 0l3 3z" fill="#9cc" />
      <path d="M125 190.4l2.9 3z" fill="#69c" />
      <path d="M130.8 190.4l3 3zm23.7 0l3 3z" fill="#fcc" />
      <path d="M160.4 190.4l3 3z" fill="#69c" />
      <path d="M127.9 193.4l3 3zm29.5 0l3 3z" fill="#cff" />
      <path d="M127.9 196.3l3 3zm29.5 0l3 3z" fill="#9cc" />
      <path d="M127.9 199.3l3 3zm29.5 0l3 3z" fill="#69c" />
      <path d="M133.8 202.2l3 3zm17.7 0l3 3z" fill="#fcc" />
      <path d="M130.8 205.2l3 3z" fill="#9cf" />
      <path d="M137.7 207.2l1 2zm11.8 0l1 2z" fill="#c33" />
      <path d="M154.5 205.2l3 3z" fill="#9cf" />
      <path d="M130.8 208.2l3 2.9zm23.7 0l3 3z" fill="#69c" />
      <path d="M136.7 211.1l3 3zm11.9 0l2.9 3z" fill="#fcc" />
      <path d="M133.8 214l3 3zm17.7 0l3 3z" fill="#9cf" />
      <path d="M133.8 217l3 3zm17.7 0l3 3z" fill="#6cc" />
      <path d="M139.7 220l3 3zm5.9 0l3 3z" fill="#fcc" />
      <path d="M136.7 222.9l3 3zm11.9 0l2.9 3z" fill="#ccf" />
      <path d="M136.7 225.9l3 3z" fill="#6cc" />
      <path d="M142.7 225.9l2.9 3z" fill="#c66" />
      <path d="M148.6 225.9l2.9 3z" fill="#6cc" />
      <path d="M139.7 231.8l3 3zm5.9 0l3 3z" fill="#ccf" />
      <path d="M139.7 234.7l3 3zm5.9 0l3 3zm-3 6l3 2.9z" fill="#9cc" />
    </svg>
  );
};

const FlagIconWithForwardedRef = forwardRef<SVGSVGElement, FlagIconProps>((iconProps, ref) => (
  <FlagIcon {...iconProps} svgRef={ref} />
));

export const AWFlagIcon = memo(createStyledFlagIcon(FlagIconWithForwardedRef));

AWFlagIcon.displayName = 'AWFlagIcon';
