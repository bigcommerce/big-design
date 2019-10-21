import React, { memo, useRef } from 'react';

import { uniqueId } from '../../utils';
import { Checkbox } from '../Checkbox';

import { StyledTable, StyledTableFigure } from './styled';
import { TableColumn, TableItem, TableProps } from './types';
import { Actions } from './Actions';
import { Body } from './Body';
import { DataCell } from './DataCell';
import { Head } from './Head';
import { HeaderCell } from './HeaderCell';
import { Row } from './Row';

const InternalTable = <T extends TableItem>(props: TableProps<T>): React.ReactElement<TableProps<T>> => {
  const {
    className,
    columns,
    id,
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

  const getItemKey = (item: T, index: number): string | number => {
    if (item[keyField] !== undefined) {
      return item[keyField];
    }

    return index;
  };

  const isItemSelected = (item: T) => {
    return selectable && selectable.selectedItems.includes(item);
  };

  const onItemSelect = (item: T) => {
    const nextIsSelected = !isItemSelected(item);

    if (!selectable) {
      return;
    }

    const { selectedItems, onSelectionChange } = selectable;

    if (nextIsSelected) {
      onSelectionChange([...selectedItems, item]);
    } else {
      onSelectionChange(selectedItems.filter(selectedItem => selectedItem !== item));
    }
  };

  const shouldRenderActions = () => {
    return Boolean(pagination) || Boolean(selectable);
  };

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

  const renderHeaders = () => (
    <Head>
      <Row>
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
      </Row>
    </Head>
  );

  const renderItems = () => (
    <Body>
      {items.map((item: T, index) => {
        const key = getItemKey(item, index);
        const isSelected = isItemSelected(item);

        return (
          <Row key={key} selected={isSelected}>
            {isSelectable && (
              <DataCell key="data-checkbox" isCheckbox={true}>
                <Checkbox checked={isSelected} onChange={() => onItemSelect(item)} />
              </DataCell>
            )}

            {props.columns.map(
              ({ render: CellContent, align, verticalAlign, width, withPadding = true }, columnIndex) => (
                <DataCell
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
                </DataCell>
              ),
            )}
          </Row>
        );
      })}
    </Body>
  );

  return (
    <>
      {shouldRenderActions() && (
        <Actions pagination={pagination} selectable={selectable} items={items} tableId={tableIdRef.current} />
      )}
      <StyledTable {...rest} id={tableIdRef.current}>
        {renderHeaders()}
        {renderItems()}
      </StyledTable>
    </>
  );
};

// https://github.com/DefinitelyTyped/DefinitelyTyped/issues/37087
const typedMemo: <T>(c: T) => T = React.memo;

export const Table = typedMemo(InternalTable);
export const TableFigure: React.FC = memo(props => <StyledTableFigure {...props} />);
