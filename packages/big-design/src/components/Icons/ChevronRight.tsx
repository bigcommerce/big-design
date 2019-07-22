// **********************************
// Auto-generated file, do NOT modify
// **********************************
import React from 'react';

import { Icon } from './Icon';

export class ChevronRight extends Icon {
  render() {
    const { title, theme, ...rest } = this.props;
    const size = this.getSize();
    const style = { ...rest.style, width: size, height: size };
    const props = { ...rest, style };

    return (
      <svg width={size} height={size} viewBox="0 0 24 24" {...props}>
        <title>{title}</title>
        <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z" fill="currentColor" />
        <path d="M0 0h24v24H0z" fill="none" />
      </svg>
    );
  }
}
