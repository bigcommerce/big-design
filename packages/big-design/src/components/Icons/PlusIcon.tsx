// **********************************
// Auto-generated file, do NOT modify
// **********************************
import React from 'react';

import { Icon } from './Icon';

export class PlusIcon extends Icon {
  render() {
    const { title, theme, ...rest } = this.props;
    const size = this.getSize();
    const style = { ...rest.style, width: size, height: size };
    const props = { ...rest, style };

    return (
      <svg width={size} height={size} viewBox="0 0 20 20" fill="none" {...props}>
        <title>{title}</title>
        <path
          d="M16 11h-5v5c0 .55-.45 1-1 1s-1-.45-1-1v-5H4c-.55 0-1-.45-1-1s.45-1 1-1h5V4c0-.55.45-1 1-1s1 .45 1 1v5h5c.55 0 1 .45 1 1s-.45 1-1 1z"
          fill="currentColor"
        />
      </svg>
    );
  }
}
