import {
  ArrowDownwardIcon,
  ArrowUpwardIcon,
  BaselineHelpIcon,
} from '@bigcommerce/big-design-icons';
import React, { memo, RefObject, TableHTMLAttributes, useId } from 'react';

import { useComponentSize } from '../../../hooks';
import { typedMemo } from '../../../utils';
import { Box } from '../../Box';
import { Tooltip } from '../../Tooltip';
import { TableColumnDisplayProps } from '../mixins';
import { TableColumn, TableItem } from '../types';

import { StyledFlex, StyledTableHeaderCell, StyledTableHeaderIcon } from './styled';

interface Localization {
  ascendingOrder: string;
  descendingOrder: string;
}

export interface HeaderCellProps<T>
  extends TableHTMLAttributes<HTMLTableCellElement>,
    TableColumnDisplayProps {
  readonly actionsRef: RefObject<HTMLDivElement>;
  readonly children?: React.ReactNode;
  readonly column: TableColumn<T>;
  readonly id: string;
  readonly hide?: boolean;
  readonly isSorted?: boolean;
  readonly localization: Localization;
  readonly sortDirection?: 'ASC' | 'DESC';
  readonly stickyHeader?: boolean;
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
  localization,
  onSortClick,
  sortDirection,
  stickyHeader,
}: HeaderCellProps<T>) => {
  const { align = 'left', isSortable, width, tooltip } = column;
  const actionsSize = useComponentSize(actionsRef);
  const tooltipId = useId();

  const renderSortIcon = () => {
    if (!isSorted) {
      return null;
    }

    return sortDirection === 'ASC' ? (
      <ArrowUpwardIcon data-testid="asc-icon" size="medium" title={localization.ascendingOrder} />
    ) : (
      <ArrowDownwardIcon
        data-testid="desc-icon"
        size="medium"
        title={localization.descendingOrder}
      />
    );
  };

  const renderTooltip = () => {
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
  };

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();

    if (isSortable && typeof onSortClick === 'function') {
      onSortClick(column);
    }
  };

  return (
    <StyledTableHeaderCell
      $display={display}
      $isSortable={isSortable}
      $stickyHeader={stickyHeader}
      $stickyHeight={actionsSize.height}
      id={id}
      onClick={handleClick}
      width={width}
    >
      <StyledFlex align={align} alignItems="center" flexDirection="row" hide={hide}>
        {children}
        {!hide && renderSortIcon()}
        {Boolean(tooltip) && renderTooltip()}
      </StyledFlex>
      {hide && renderSortIcon()}
    </StyledTableHeaderCell>
  );
};

export const HeaderCheckboxCell: React.FC<HeaderCheckboxCellProps> = memo(
  ({ stickyHeader, actionsRef }) => {
    const actionsSize = useComponentSize(actionsRef);

    return (
      <StyledTableHeaderIcon $stickyHeader={stickyHeader} $stickyHeight={actionsSize.height} />
    );
  },
);

export const DragIconHeaderCell: React.FC<DragIconCellProps> = memo(
  ({ actionsRef, headerCellIconRef }) => {
    const actionsSize = useComponentSize(actionsRef);

    return <StyledTableHeaderIcon $stickyHeight={actionsSize.height} ref={headerCellIconRef} />;
  },
);

export const ExpandableHeaderCell: React.FC<DragIconCellProps> = memo(({ actionsRef }) => {
  const actionsSize = useComponentSize(actionsRef);

  return <StyledTableHeaderIcon $stickyHeight={actionsSize.height} />;
});

export const HeaderCell = typedMemo(InternalHeaderCell);
