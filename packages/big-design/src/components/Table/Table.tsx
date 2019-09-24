import React from 'react';

import { uniqueId } from '../../utils';

import { TableContext } from './context';
import { StyledTable, StyledTableFigure } from './styled';
import { TableActions, TableActionsProps } from './Actions';
import { TableBody, TableBodyProps } from './Body';
import { TableCell, TableCellProps } from './Cell';
import { TableFooter, TableFooterProps } from './Footer';
import { TableHead, TableHeadProps } from './Head';
import { TableRow, TableRowProps } from './Row';

export interface TableProps extends React.TableHTMLAttributes<HTMLTableElement & { children: React.ReactNode }> {
  hoverable?: boolean;
  selectable?: boolean;
  stickyHeader?: boolean;
}

interface Table extends React.FC<TableProps> {
  Actions: TableActionsProps;
  Body: TableBodyProps;
  Cell: TableCellProps;
  Footer: TableFooterProps;
  Head: TableHeadProps;
  Row: TableRowProps;
}

export function Table(this: Table, props: TableProps) {
  const { className, selectable, stickyHeader, style, ...rest } = props;
  const children = React.Children.toArray(props.children) as React.ReactElement[];

  const tableId = uniqueId('table_');

  const actions = children.filter(child => child.type === Table.Actions);
  const content = children.filter(child => child.type !== Table.Actions);

  return (
    <TableContext.Provider value={{ selectable, stickyHeader, tableId }}>
      {actions}
      <StyledTable id={tableId} {...rest}>
        {content}
      </StyledTable>
    </TableContext.Provider>
  );
}

Table.Actions = TableActions;
Table.Body = TableBody;
Table.Cell = TableCell;
Table.Footer = TableFooter;
Table.Head = TableHead;
Table.Row = TableRow;

export const TableFigure: React.FC<any> = ({ className, style, ...props }) => <StyledTableFigure {...props} />;
