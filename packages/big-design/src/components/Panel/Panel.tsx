import React from 'react';

import { MarginProps } from '../../mixins';
import { Box } from '../Box';

export type PanelProps = React.HTMLAttributes<HTMLElement> & MarginProps;

export const Panel: React.FC<PanelProps> = ({ className, style, ...props }) => (
  <Box marginBottom="xxLarge" {...props} backgroundColor="white" elevation="floating" padding="xxLarge" />
);
