// **********************************
// Auto-generated file, do NOT modify
// **********************************
import React from 'react';

import { Icon } from './Icon';

export class ExpandMore extends Icon {
  render() {
    const { title, theme, ...rest } = this.props;
    const size = this.getSize();
    const style = { ...rest.style, width: size, height: size };
    const props = { ...rest, style };

    return (
      <svg width={size} height={size} viewBox="0 0 24 24" {...props}>
        <title>{title}</title>
        <path d="M16.59 8.59L12 13.17 7.41 8.59 6 10l6 6 6-6z" fill="currentColor" />
        <path d="M0 0h24v24H0z" fill="none" />
      </svg>
    );
  }
}
