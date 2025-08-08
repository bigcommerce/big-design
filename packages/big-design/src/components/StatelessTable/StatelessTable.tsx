import React from 'react';

import { StyledTableBody } from '../Table/Body/styled';
import { DataCellProps } from '../Table/DataCell';
import {
  StyledMobileHeader,
  StyledTableActionCell,
  StyledTableDataCell,
  StyledTableDataCheckbox,
} from '../Table/DataCell/styled';
import { StyledTableHead } from '../Table/Head/styled';
import { StyledTableHeaderCell, StyledFlex } from '../Table/HeaderCell/styled';
import { StyledTableRow } from '../Table/Row/styled';
import { StyledTable, StyledTableCaption } from '../Table/styled';

// TABLE
export interface StatelessTableProps {
  children?: React.ReactNode;
}

export const StatelessTable: React.FC<StatelessTableProps> = ({ children }) => {
  return <StyledTable>{children}</StyledTable>;
};

// TABLE CAPTION

export interface CaptionProps {
  children?: React.ReactNode;
}

export const Caption: React.FC<CaptionProps> = ({ children }) => {
  return <StyledTableCaption>{children}</StyledTableCaption>;
};

// TABLE HEAD
export interface THeadProps {
  children?: React.ReactNode;
}

export const THead: React.FC<THeadProps> = ({ children }) => {
  return <StyledTableHead>{children}</StyledTableHead>;
};

// TABLE HEADER CELL
export interface THProps extends DataCellProps {
  children?: React.ReactNode;
}

export const TH: React.FC<THProps> = ({ children, align = 'left', ...props }) => {
  return (
    <StyledTableHeaderCell stickyHeight={0} {...props}>
      <StyledFlex align={align} alignItems="center" flexDirection="row" hide={false}>
        {children}
      </StyledFlex>
    </StyledTableHeaderCell>
  );
};

// TABLE BODY
export interface TBodyProps {
  children?: React.ReactNode;
}

export const TBody: React.FC<TBodyProps> = ({ children }) => {
  return <StyledTableBody>{children}</StyledTableBody>;
};

// TABLE ROW
export interface TRProps {
  children?: React.ReactNode;
  status?: 'danger' | 'success' | 'warning' | 'info';
}

export const TR: React.FC<TRProps> = ({ children, status }) => {
  return (
    <StyledTableRow isDragging={false} isSelected={false} status={status}>
      {children}
    </StyledTableRow>
  );
};

// TABLE DATA CELL
export interface TDProps extends DataCellProps {
  children?: React.ReactNode;
}

export const TD: React.FC<TDProps> = ({
  children,
  isCheckbox = false,
  isAction = false,
  ...props
}) => {
  return isCheckbox ? (
    <StyledTableDataCheckbox isCheckbox={true} withBorder={true} {...props}>
      {children}
    </StyledTableDataCheckbox>
  ) : isAction ? (
    <StyledTableActionCell withBorder={true} withPadding={true} {...props}>
      {children}
    </StyledTableActionCell>
  ) : (
    <StyledTableDataCell withBorder={true} withPadding={true} {...props}>
      {props.mobileHeader ? (
        <StyledMobileHeader aria-hidden="true">{props.mobileHeader}</StyledMobileHeader>
      ) : null}
      {children}
    </StyledTableDataCell>
  );
};

// TABLE FOOT
export interface TFootProps {
  children?: React.ReactNode;
}

export const TFoot: React.FC<TFootProps> = ({ children }) => {
  return <tfoot>{children}</tfoot>;
};
