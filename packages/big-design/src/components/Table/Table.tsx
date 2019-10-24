import React, { memo, useRef } from 'react';

import { typedMemo, uniqueId } from '../../utils';
import { useEventCallback } from '../../utils/useEventCallback';

import { StyledTable, StyledTableFigure } from './styled';
import { TableColumn, TableItem, TableProps } from './types';
import { Actions } from './Actions';
import { Body } from './Body';
import { Head } from './Head';
import { HeaderCell } from './HeaderCell';
import { Row } from './Row';

const InternalTable = <T extends TableItem>(props: TableProps<T>): React.ReactElement<TableProps<T>> => {
  const {
    className,
    columns,
    id,
    itemName,
    items,
    keyField = 'id',
    pagination,
    selectable,
    sortable,
    stickyHeader,
    style,
    ...rest
  } = props;
  const tableIdRef = useRef(id || uniqueId('table_'));
  const isSelectable = Boolean(selectable);

  const onItemSelect = selectable
    ? useEventCallback(
        (item: T) => {
          if (!selectable || !item) {
            return;
          }

          const { selectedItems, onSelectionChange } = selectable;
          const nextIsSelected = !isItemSelected(item);

          if (nextIsSelected) {
            onSelectionChange([...selectedItems, item]);
          } else {
            onSelectionChange(selectedItems.filter(selectedItem => selectedItem !== item));
          }
        },
        [selectable.selectedItems],
      )
    : undefined;

  const onSortClick = (column: TableColumn<T>) => {
    if (!sortable || !column.isSortable) {
      return;
    }

    const { hash } = column;
    const sortDirection = sortable.direction === 'ASC' ? 'DESC' : 'ASC';

    if (typeof sortable.onSort === 'function') {
      sortable.onSort(hash, sortDirection, column);
    }
  };

  const shouldRenderActions = () => {
    return Boolean(pagination) || Boolean(selectable) || Boolean(itemName);
  };

  const getItemKey = (item: T, index: number): string | number => {
    if (item[keyField] !== undefined) {
      return item[keyField];
    }

    return index;
  };

  const isItemSelected = (item: T) => {
    return (selectable && selectable.selectedItems.includes(item)) || false;
  };

  const renderHeaders = () => (
    <Head>
      <tr>
        {isSelectable && <HeaderCell key="header-checkbox" stickyHeader={stickyHeader} isCheckbox={true} />}

        {columns.map((column, index) => {
          const { align, hash, header, isSortable, width } = column;
          const isSorted = isSortable && sortable && hash === sortable.columnHash;
          const sortDirection = sortable && sortable.direction;

          return (
            <HeaderCell
              align={align}
              isSortable={isSortable}
              isSorted={isSorted}
              key={index}
              onSortClick={() => onSortClick(column)}
              sortDirection={sortDirection}
              stickyHeader={stickyHeader}
              width={width}
            >
              {header}
            </HeaderCell>
          );
        })}
      </tr>
    </Head>
  );

  const renderItems = () => (
    <Body>
      {items.map((item: T, index) => {
        const key = getItemKey(item, index);
        const isSelected = isItemSelected(item);

        return (
          <Row
            columns={columns}
            isSelectable={isSelectable}
            isSelected={isSelected}
            item={item}
            key={key}
            onItemSelect={onItemSelect}
          />
        );
      })}
    </Body>
  );

  return (
    <>
      {shouldRenderActions() && (
        <Actions
          pagination={pagination}
          selectable={selectable}
          items={items}
          itemName={itemName}
          tableId={tableIdRef.current}
        />
      )}
      <StyledTable {...rest} id={tableIdRef.current}>
        {renderHeaders()}
        {renderItems()}
      </StyledTable>
    </>
  );
};

export const Table = typedMemo(InternalTable);
export const TableFigure: React.FC = memo(props => <StyledTableFigure {...props} />);
