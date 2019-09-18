import React from 'react';

import { FlexProps } from '../../Flex';

import { StyledActions } from './styled';

export interface TableActionsProps extends FlexProps {
  selectable?: boolean;
  tableId?: string;
}

export const TableActions: React.FC<TableActionsProps> = ({
  children,
  className,
  selectable,
  style,
  tableId,
  ...props
}) => {
  return (
    <StyledActions padding="small" aria-controls={tableId} {...props}>
      {children}
    </StyledActions>
  );
};
