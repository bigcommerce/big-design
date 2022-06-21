import {
  ArrowDownwardIcon,
  ArrowUpwardIcon,
  BaselineHelpIcon,
} from '@bigcommerce/big-design-icons';
import React, { memo, RefObject, TableHTMLAttributes } from 'react';

import { useComponentSize, useUniqueId } from '../../../hooks';
import { typedMemo } from '../../../utils';
import { Box } from '../../Box';
import { Tooltip } from '../../Tooltip';
import { TableColumnDisplayProps } from '../mixins';
import { TableColumn, TableItem } from '../types';

import { StyledFlex, StyledTableHeaderCell, StyledTableHeaderIcon } from './styled';

export interface HeaderCellProps<T>
  extends TableHTMLAttributes<HTMLTableCellElement>,
    TableColumnDisplayProps {
  actionsRef: RefObject<HTMLDivElement>;
  children?: React.ReactNode;
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
}

export interface DragIconCellProps {
  actionsRef: RefObject<HTMLDivElement>;
  headerCellIconRef: RefObject<HTMLTableCellElement>;
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
      <ArrowUpwardIcon data-testid="asc-icon" size="medium" title="Ascending order" />
    ) : (
      <ArrowDownwardIcon data-testid="desc-icon" size="medium" title="Descending order" />
    );
  };

  const renderTooltip = () => {
    if (typeof tooltip === 'string' && tooltip.length > 0) {
      return (
        <Tooltip
          id={tooltipId}
          placement="right"
          trigger={
            <Box as="span" marginLeft="xxSmall">
              <BaselineHelpIcon
                aria-describedby={tooltipId}
                size="medium"
                title="Hover or focus for additional context."
              />
            </Box>
          }
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
      onClick={handleClick}
      stickyHeader={stickyHeader}
      stickyHeight={actionsSize.height}
      width={width}
    >
      <StyledFlex align={align} alignItems="center" flexDirection="row" hide={hide}>
        {children}
        {!hide && renderSortIcon()}
        {renderTooltip()}
      </StyledFlex>
      {hide && renderSortIcon()}
    </StyledTableHeaderCell>
  );
};

export const HeaderCheckboxCell: React.FC<HeaderCheckboxCellProps> = memo(
  ({ stickyHeader, actionsRef }) => {
    const actionsSize = useComponentSize(actionsRef);

    return <StyledTableHeaderIcon stickyHeader={stickyHeader} stickyHeight={actionsSize.height} />;
  },
);

export const DragIconHeaderCell: React.FC<DragIconCellProps> = memo(
  ({ actionsRef, headerCellIconRef }) => {
    const actionsSize = useComponentSize(actionsRef);

    return <StyledTableHeaderIcon ref={headerCellIconRef} stickyHeight={actionsSize.height} />;
  },
);

export const HeaderCell = typedMemo(InternalHeaderCell);
