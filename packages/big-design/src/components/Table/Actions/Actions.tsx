import React, { useContext } from 'react';

import { FlexProps } from '../../Flex';
import { TableContext } from '../context';

import { StyledActions } from './styled';

export type TableActionsProps = FlexProps;

export const TableActions: React.FC<TableActionsProps> = ({ children, className, style, ...props }) => {
  const tableContext = useContext(TableContext);

  return (
    <StyledActions padding="small" aria-controls={tableContext.tableId} {...props}>
      {children}
    </StyledActions>
  );
};
