import { ArrowDownwardIcon, ArrowUpwardIcon, BaselineHelpIcon } from '@bigcommerce/big-design-icons';
import React, { memo, RefObject, TableHTMLAttributes } from 'react';

import { useComponentSize } from '../../../hooks';
import { typedMemo } from '../../../utils';
import { Box } from '../../Box';
import { Tooltip } from '../../Tooltip';
import { TableColumnDisplayProps } from '../mixins';
import { TableColumn, TableItem } from '../types';

import { StyledFlex, StyledTableHeaderCell, StyledTableHeaderCheckbox } from './styled';

export interface HeaderCellProps<T> extends TableHTMLAttributes<HTMLTableCellElement>, TableColumnDisplayProps {
  actionsRef: RefObject<HTMLDivElement>;
  column: TableColumn<T>;
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
}

const InternalHeaderCell = <T extends TableItem>({
  children,
  column,
  display,
  hide = false,
  isSorted,
  onSortClick,
  sortDirection,
  stickyHeader,
  actionsRef,
}: HeaderCellProps<T>) => {
  const { align = 'left', isSortable, width, tooltip } = column;
  const actionsSize = useComponentSize(actionsRef);

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
    if (tooltip && typeof tooltip === 'string') {
      return (
        <Tooltip
          trigger={
            <Box as="span" marginLeft="xxSmall">
              <BaselineHelpIcon size="medium" title="Tooltip icon" />
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

export const HeaderCheckboxCell: React.FC<HeaderCheckboxCellProps> = memo(({ stickyHeader, actionsRef }) => {
  const actionsSize = useComponentSize(actionsRef);

  return <StyledTableHeaderCheckbox stickyHeader={stickyHeader} stickyHeight={actionsSize.height} />;
});

export const DragIconHeaderCell: React.FC<DragIconCellProps> = memo(({ actionsRef }) => {
  const actionsSize = useComponentSize(actionsRef);

  return <StyledTableHeaderCell stickyHeight={actionsSize.height} />;
});

export const HeaderCell = typedMemo(InternalHeaderCell);
