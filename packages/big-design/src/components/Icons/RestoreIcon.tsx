// **********************************
// Auto-generated file, do NOT modify
// **********************************
import React from 'react';

import { Icon } from './Icon';

export default class SvgRestoreIcon extends Icon {
  render() {
    const { title, theme, ...rest } = this.props;
    const size = this.getSize();
    const style = { ...rest.style, width: size, height: size };
    const props = { ...rest, style };

    return (
      <svg width={size} height={size} viewBox="0 0 24 24" {...props}>
        <title>{title}</title>
        <path d="M0 0h24v24H0z" fill="none" />
        <path
          d="M13 3a9 9 0 0 0-9 9H1l3.89 3.89.07.14L9 12H6c0-3.87 3.13-7 7-7s7 3.13 7 7-3.13 7-7 7c-1.93 0-3.68-.79-4.94-2.06l-1.42 1.42A8.954 8.954 0 0 0 13 21a9 9 0 0 0 0-18zm-1 5v5l4.28 2.54.72-1.21-3.5-2.08V8H12z"
          fill="currentColor"
        />
      </svg>
    );
  }
}
