import type { Colors } from '@bigcommerce/big-design-theme';
import React from 'react';

import { MarginProps, PaddingProps } from '../../../helpers';
import { Box } from '../../Box';
import { useCollapseContext } from '../useCollapseContext';

export interface CollapsePanelProps extends PaddingProps, MarginProps {
  children?: React.ReactNode;
  backgroundColor?: keyof Colors;
}

export const CollapsePanel: React.FC<CollapsePanelProps> = ({ children, ...boxProps }) => {
  const { isOpen, triggerId, panelId } = useCollapseContext('Collapse.Panel');

  return (
    <Box
      {...boxProps}
      aria-labelledby={triggerId}
      display={isOpen ? 'block' : 'none'}
      hidden={!isOpen}
      id={panelId}
      role="region"
    >
      {children}
    </Box>
  );
};
