import { ArrowDownwardIcon, ArrowUpwardIcon, BaselineHelpIcon } from '@bigcommerce/big-design-icons';
import React, { memo, RefObject, TableHTMLAttributes } from 'react';

import { useComponentSize, useUniqueId } from '../../../hooks';
import { typedMemo } from '../../../utils';
import { Box } from '../../Box';
import { Tooltip } from '../../Tooltip';
import { TableColumnDisplayProps } from '../mixins';
import { TableColumn, TableItem } from '../types';

import { StyledFlex, StyledTableHeaderCell, StyledTableHeaderCheckbox } from './styled';

export interface HeaderCellProps<T> extends TableHTMLAttributes<HTMLTableCellElement>, TableColumnDisplayProps {
  actionsRef: RefObject<HTMLDivElement>;
  column: TableColumn<T>;
  id: string;
  hide?: boolean;
  isSorted?: boolean;
  sortDirection?: 'ASC' | 'DESC';
  stickyHeader?: boolean;
  onSortClick?(column: TableColumn<T>): void;
}

export interface HeaderCheckboxCellProps {
  actionsRef: RefObject<HTMLDivElement>;
  stickyHeader?: boolean;
  indeterminate?: boolean;
}

export interface DragIconCellProps {
  actionsRef: RefObject<HTMLDivElement>;
  headerCellIconRef: RefObject<HTMLTableCellElement>;
  width: number | string;
}

const InternalHeaderCell = <T extends TableItem>({
  actionsRef,
  children,
  column,
  display,
  hide = false,
  id,
  isSorted,
  onSortClick,
  sortDirection,
  stickyHeader,
}: HeaderCellProps<T>) => {
  const { align = 'left', isSortable, width, tooltip } = column;
  const actionsSize = useComponentSize(actionsRef);
  const tooltipId = useUniqueId('table-header-tooltip');

  const renderSortIcon = () => {
    if (!isSorted) {
      return null;
    }

    return sortDirection === 'ASC' ? (
      <ArrowUpwardIcon size="medium" data-testid="asc-icon" title="Ascending order" />
    ) : (
      <ArrowDownwardIcon size="medium" data-testid="desc-icon" title="Descending order" />
    );
  };

  const renderTooltip = () => {
    if (typeof tooltip === 'string' && tooltip.length > 0) {
      return (
        <Tooltip
          id={tooltipId}
          trigger={
            <Box as="span" marginLeft="xxSmall">
              <BaselineHelpIcon
                aria-describedby={tooltipId}
                size="medium"
                title="Hover or focus for additional context."
              />
            </Box>
          }
          placement="right"
        >
          {tooltip}
        </Tooltip>
      );
    }

    return null;
  };

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();

    if (isSortable && typeof onSortClick === 'function') {
      onSortClick(column);
    }
  };

  return (
    <StyledTableHeaderCell
      display={display}
      id={id}
      isSortable={isSortable}
      stickyHeader={stickyHeader}
      onClick={handleClick}
      width={width}
      stickyHeight={actionsSize.height}
    >
      <StyledFlex alignItems="center" flexDirection="row" hide={hide} align={align}>
        {children}
        {!hide && renderSortIcon()}
        {renderTooltip()}
      </StyledFlex>
      {hide && renderSortIcon()}
    </StyledTableHeaderCell>
  );
};

// function IndeterminateCheckbox({
//   indeterminate,
//   className = '',
//   ...rest
// }: { indeterminate?: boolean } & HTMLProps<HTMLInputElement>) {
//   const ref = React.useRef<HTMLInputElement>(null!);

//   React.useEffect(() => {
//     if (typeof indeterminate === 'boolean') {
//       ref.current.indeterminate = !rest.checked && indeterminate;
//     }
//   }, [ref, indeterminate]);

//   return <input type="checkbox" ref={ref} className={className + ' cursor-pointer'} {...rest} />;
// }

export const HeaderCheckboxCell: React.FC<HeaderCheckboxCellProps> = memo(({ stickyHeader, actionsRef }) => {
  const actionsSize = useComponentSize(actionsRef);

  return <StyledTableHeaderCheckbox stickyHeader={stickyHeader} stickyHeight={actionsSize.height} />;
});

export const DragIconHeaderCell: React.FC<DragIconCellProps> = memo(({ actionsRef, headerCellIconRef, width }) => {
  const actionsSize = useComponentSize(actionsRef);

  return <StyledTableHeaderCell stickyHeight={actionsSize.height} ref={headerCellIconRef} width={width} />;
});

export const HeaderCell = typedMemo(InternalHeaderCell);
