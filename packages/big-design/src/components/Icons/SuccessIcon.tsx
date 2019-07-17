// **********************************
// Auto-generated file, do NOT modify
// **********************************
import React from 'react';

import { Icon } from './Icon';

export class SuccessIcon extends Icon {
  render() {
    const { title, theme, ...rest } = this.props;
    const size = this.getSize();
    const style = { ...rest.style, width: size, height: size };
    const props = { ...rest, style };

    return (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" {...props}>
        <title>{title}</title>
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M12.1 22.101c5.524 0 10.001-4.477 10.001-10 0-5.524-4.477-10.001-10-10.001-5.524 0-10 4.477-10 10 0 5.524 4.476 10.001 10 10.001z"
          fill="currentColor"
        />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M10.997 13.434L8.92 11.339l-1.32 1.333 3.396 3.429L17.6 9.434 16.28 8.1l-5.283 5.334z"
          fill="#fff"
        />
      </svg>
    );
  }
}
