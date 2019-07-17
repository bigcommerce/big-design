// **********************************
// Auto-generated file, do NOT modify
// **********************************
import React from 'react';

import { Icon } from './Icon';

export class LoadingIcon extends Icon {
  render() {
    const { title, theme, ...rest } = this.props;
    const size = this.getSize();
    const style = { ...rest.style, width: size, height: size };
    const props = { ...rest, style };

    return (
      <svg width={size} height={size} viewBox="0 0 20 20" fill="none" {...props}>
        <title>{title}</title>
        <path d="M18 10a8 8 0 10-8 8v-2.29A5.709 5.709 0 1115.71 10H18z" fill="currentColor" />
      </svg>
    );
  }
}
