import React from 'react';

import { Code, NextLink, Prop, PropTable, PropTableWrapper } from '../components';

// StatelessTable Props
const statelessTableProps: Prop[] = [
  {
    name: 'children',
    types: 'React.ReactNode',
    description: 'Table content including THead, TBody, TFoot, and Caption components.',
  },
];

// TR Props
const trProps: Prop[] = [
  {
    name: 'children',
    types: 'React.ReactNode',
    description: 'Table row content, typically TH or TD components.',
  },
  {
    name: 'status',
    types: ['danger', 'success', 'warning', 'info'],
    description: 'Visual status indicator for the row.',
  },
];

// TH Props
const thProps: Prop[] = [
  {
    name: 'children',
    types: 'React.ReactNode',
    description: 'Header cell content.',
  },
  {
    name: 'align',
    types: ['left', 'center', 'right'],
    description: 'Text alignment within the cell.',
  },
  {
    name: 'width',
    types: ['number', 'string'],
    description: 'Column width. Can be a pixel value (number) or CSS width value (string).',
  },
  {
    name: 'verticalAlign',
    types: ['top', 'middle'],
    description: 'Vertical alignment of cell content.',
  },
  {
    name: 'withBorder',
    types: 'boolean',
    defaultValue: 'true',
    description: 'Whether to show cell borders.',
  },
  {
    name: 'withPadding',
    types: 'boolean',
    defaultValue: 'true',
    description: 'Whether to apply cell padding.',
  },
  {
    name: 'colSpan',
    types: 'number',
    description: 'Number of columns the cell should span.',
  },
  {
    name: 'rowSpan',
    types: 'number',
    description: 'Number of rows the cell should span.',
  },
];

// TD Props
const tdProps: Prop[] = [
  {
    name: 'children',
    types: 'React.ReactNode',
    description: 'Data cell content.',
  },
  {
    name: 'align',
    types: ['left', 'center', 'right'],
    description: 'Text alignment within the cell.',
  },
  {
    name: 'width',
    types: ['number', 'string'],
    description: 'Column width. Can be a pixel value (number) or CSS width value (string).',
  },
  {
    name: 'verticalAlign',
    types: ['top', 'middle'],
    description: 'Vertical alignment of cell content.',
  },
  {
    name: 'withBorder',
    types: 'boolean',
    defaultValue: 'true',
    description: 'Whether to show cell borders.',
  },
  {
    name: 'withPadding',
    types: 'boolean',
    defaultValue: 'true',
    description: 'Whether to apply cell padding.',
  },
  {
    name: 'colSpan',
    types: 'number',
    description: 'Number of columns the cell should span.',
  },
  {
    name: 'rowSpan',
    types: 'number',
    description: 'Number of rows the cell should span.',
  },
  {
    name: 'mobileHeader',
    types: 'string',
    description: 'Header text displayed on mobile devices when the table stacks vertically.',
  },
  {
    name: 'isCheckbox',
    types: 'boolean',
    defaultValue: 'false',
    description: 'Applies checkbox-specific styling to the cell.',
  },
  {
    name: 'isAction',
    types: 'boolean',
    defaultValue: 'false',
    description: 'Applies action-specific styling to the cell (typically for buttons).',
  },
  {
    name: 'isDraggable',
    types: 'boolean',
    defaultValue: 'false',
    description: 'Applies drag handle styling to the cell.',
  },
];

// Basic component props (for Caption, THead, TBody, TFoot)
const basicComponentProps: Prop[] = [
  {
    name: 'children',
    types: 'React.ReactNode',
    description: 'Component content.',
  },
];

export const StatelessTablePropTable: React.FC<PropTableWrapper> = (props) => (
  <PropTable propList={statelessTableProps} title="StatelessTable" {...props} />
);

export const TRPropTable: React.FC<PropTableWrapper> = (props) => (
  <PropTable propList={trProps} title="TR (Table Row)" {...props} />
);

export const THPropTable: React.FC<PropTableWrapper> = (props) => (
  <PropTable propList={thProps} title="TH (Table Header)" {...props} />
);

export const TDPropTable: React.FC<PropTableWrapper> = (props) => (
  <PropTable propList={tdProps} title="TD (Table Data)" {...props} />
);

export const BasicTableComponentPropTable: React.FC<PropTableWrapper & { title: string }> = ({ title, ...props }) => (
  <PropTable propList={basicComponentProps} title={title} {...props} />
);
