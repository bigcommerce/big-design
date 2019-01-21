import React from 'react';
interface Props extends React.SVGProps<SVGSVGElement> {
  title?: string;
}

const SvgErrorIcon = ({ title, ...props }: Props) => (
  <svg width={20} height={20} viewBox="0 0 20 20" fill="none" {...props}>
    <title>{title}</title>
    <circle cx={10} cy={10} r={8} fill="currentColor" />
    <path
      d="M11 14.5a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1zM11 10.5a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v5z"
      fill="#fff"
    />
  </svg>
);

export default SvgErrorIcon;
