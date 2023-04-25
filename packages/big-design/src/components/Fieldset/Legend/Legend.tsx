'use client';

import React, { memo } from 'react';

import { HeadingProps } from '../../Typography';

import { StyledFieldsetLegend } from './styled';

export const FieldsetLegend: React.FC<HeadingProps> = memo(({ className, style, ...props }) => (
  <StyledFieldsetLegend {...props} />
));
