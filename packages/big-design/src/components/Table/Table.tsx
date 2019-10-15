import React, { memo, useRef } from 'react';

import { uniqueId } from '../../utils';

import { TableContext } from './context';
import { StyledTable, StyledTableFigure } from './styled';
import { TableItem, TableProps } from './types';
import { Actions } from './Actions';
import { Body } from './Body';
import { Cell } from './Cell';
import { Head } from './Head';
import { Item } from './Item';

const InternalTable = <T extends TableItem>(props: TableProps<T>): React.ReactElement<TableProps<T>> => {
  const {
    className,
    stickyHeader,
    style,
    items,
    columns,
    pagination,
    selectable,
    id,
    keyField = 'id',
    ...rest
  } = props;
  const tableIdRef = useRef(id || uniqueId('table_'));
  const isSelectable = Boolean(selectable);

  const getItemKey = (item: T, index: number): string | number => {
    if (item[keyField] !== undefined) {
      return item[keyField];
    }

    return index;
  };

  const isItemSelected = (item: T) => {
    return selectable && selectable.selectedItems.includes(item);
  };

  const onItemSelect = (item: T, isSelected: boolean) => {
    if (!selectable) {
      return;
    }

    const { selectedItems, onSelectionChange } = selectable;

    if (isSelected) {
      onSelectionChange([...selectedItems, item]);
    } else {
      onSelectionChange(selectedItems.filter(selectedItem => selectedItem !== item));
    }
  };

  const shouldRenderActions = () => {
    return Boolean(pagination) || Boolean(selectable);
  };

  const renderHeaders = () => (
    <Head>
      <Item isSelectable={isSelectable}>
        {columns.map(({ header, align, width }, index) => (
          <Cell key={index} align={align} width={width}>
            {header}
          </Cell>
        ))}
      </Item>
    </Head>
  );

  const renderItems = () => (
    <Body>
      {items.map((item: T, index) => (
        <Item
          isSelectable={isSelectable}
          key={getItemKey(item, index)}
          onItemSelect={nextValue => onItemSelect(item, nextValue)}
          selected={isItemSelected(item)}
        >
          {props.columns.map(
            ({ render: CellContent, align, verticalAlign, width, withPadding = true }, columnIndex) => (
              <Cell
                key={columnIndex}
                align={align}
                verticalAlign={verticalAlign}
                width={width}
                withPadding={withPadding}
              >
                {/* https://github.com/DefinitelyTyped/DefinitelyTyped/issues/20544 */}
                {/* 
                // @ts-ignore */}
                <CellContent {...item} />
              </Cell>
            ),
          )}
        </Item>
      ))}
    </Body>
  );

  return (
    <TableContext.Provider value={{ stickyHeader }}>
      {shouldRenderActions() && (
        <Actions pagination={pagination} selectable={selectable} items={items} tableId={tableIdRef.current} />
      )}
      <StyledTable {...rest} id={tableIdRef.current}>
        {renderHeaders()}
        {renderItems()}
      </StyledTable>
    </TableContext.Provider>
  );
};

// https://github.com/DefinitelyTyped/DefinitelyTyped/issues/37087
const typedMemo: <T>(c: T) => T = React.memo;

export const Table = typedMemo(InternalTable);
export const TableFigure: React.FC = memo(props => <StyledTableFigure {...props} />);
