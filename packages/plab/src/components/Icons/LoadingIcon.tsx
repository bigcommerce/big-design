// **********************************
// Auto-generated file, do NOT modify
// **********************************
import React from 'react';

import { Icon } from './Icon';

export default class SvgLoadingIcon extends Icon {
  render() {
    const props = this.props;
    const { title } = props;
    const size = this.getSize();

    return (
      <svg width={size} height={size} viewBox="0 0 20 20" fill="none" {...props}>
        <title>{title}</title>
        <path d="M18 10a8 8 0 1 0-8 8v-2.29A5.709 5.709 0 1 1 15.71 10H18z" fill="currentColor" />
      </svg>
    );
  }
}
