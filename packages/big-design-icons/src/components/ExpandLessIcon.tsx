// **********************************
// Auto-generated file, do NOT modify
// **********************************
import React from 'react';

import { createStyledIcon, IconProps } from '../base';

const Icon = React.memo<Partial<IconProps>>(({ title, theme, ...props }) => (
  <svg width={24} height={24} viewBox="0 0 24 24" stroke="currentColor" fill="currentColor" strokeWidth="0" {...props}>
    {title ? <title>{title}</title> : null}
    <path fill="none" d="M0 0h24v24H0V0z" />
    <path d="M11.29 8.71L6.7 13.3a.996.996 0 101.41 1.41L12 10.83l3.88 3.88a.996.996 0 101.41-1.41L12.7 8.71a.996.996 0 00-1.41 0z" />
  </svg>
));

export const ExpandLessIcon = createStyledIcon(Icon);

ExpandLessIcon.displayName = 'ExpandLessIcon';
