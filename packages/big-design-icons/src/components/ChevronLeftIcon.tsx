// **********************************
// Auto-generated file, do NOT modify
// **********************************
import React from 'react';

import { createStyledIcon, IconProps } from '../base';

const Icon = React.memo<Partial<IconProps>>(({ title, theme, ...props }) => (
  <svg width={24} height={24} viewBox="0 0 24 24" stroke="currentColor" fill="currentColor" strokeWidth="0" {...props}>
    {title ? <title>{title}</title> : null}
    <path fill="none" d="M0 0h24v24H0V0z" />
    <path d="M14.71 6.71a.996.996 0 00-1.41 0L8.71 11.3a.996.996 0 000 1.41l4.59 4.59a.996.996 0 101.41-1.41L10.83 12l3.88-3.88c.39-.39.38-1.03 0-1.41z" />
  </svg>
));

export const ChevronLeftIcon = createStyledIcon(Icon);

ChevronLeftIcon.displayName = 'ChevronLeftIcon';
