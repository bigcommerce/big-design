// **********************************
// Auto-generated file, do NOT modify
// **********************************
import React from 'react';

import { Icon } from './Icon';

export default class SvgDropdownIcon extends Icon {
  render() {
    const { title, theme, ...rest } = this.props;
    const size = this.getSize();
    const style = { ...rest.style, width: size, height: size };
    const props = { ...rest, style };

    return (
      <svg width={size} height={size} viewBox="0 0 20 20" fill="none" {...props}>
        <title>{title}</title>
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M7.04 8a.5.5 0 0 0-.39.812l2.96 3.7c.2.25.58.25.78 0l2.96-3.7A.5.5 0 0 0 12.96 8H7.04z"
          fill="currentColor"
        />
      </svg>
    );
  }
}
