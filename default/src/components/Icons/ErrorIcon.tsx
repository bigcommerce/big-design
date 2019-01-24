// **********************************
// Auto-generated file, do NOT modify
// **********************************
import React from 'react';

import { Icon } from './Icon';

export default class SvgErrorIcon extends Icon {
  render() {
    const props = this.props;
    const { title } = props;
    const size = this.getSize();

    return (
      <svg width={size} height={size} viewBox="0 0 20 20" fill="none" {...props}>
        <title>{title}</title>
        <circle cx={10} cy={10} r={8} fill="currentColor" />
        <path
          d="M11 14.5a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1zM11 10.5a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v5z"
          fill="#fff"
        />
      </svg>
    );
  }
}
