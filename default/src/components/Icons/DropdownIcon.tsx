// Auto-generated file, don't modify
import React from 'react';

import { IconWrapper } from './IconWrapper';

interface Props extends React.SVGProps<SVGSVGElement> {
  title?: string;
}

export const SvgDropdownIcon = ({ title, ...props }: Props) => (
  <svg width={8} height={5} viewBox="0 0 8 5" fill="currentColor" {...props}>
    <title>{title}</title>
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M1.04 0a.5.5 0 0 0-.39.812l2.96 3.7c.2.25.58.25.78 0l2.96-3.7A.5.5 0 0 0 6.96 0H1.04z"
    />
  </svg>
);

const DropdownIcon = (props: Props) => (
  <IconWrapper width={props.width} height={props.height}>
    <SvgDropdownIcon {...props} />
  </IconWrapper>
);

export default DropdownIcon;
