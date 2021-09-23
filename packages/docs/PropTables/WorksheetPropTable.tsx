import React from 'react';

import { Code, NextLink, Prop, PropTable, PropTableWrapper } from '../components';

const worksheetProps: Prop[] = [
  {
    name: 'columns',
    types: ['TextColumn', 'NumberColumn', 'CheckboxColumn', 'SelectableColumn', 'ModalColumn'],
    description: (
      <>
        Columns will be of type <NextLink href="#worksheet-text-column-prop-table">TextColumn</NextLink> by default. See{' '}
        <NextLink href="#worksheet-text-column-prop-table">below</NextLink> for usage.
      </>
    ),
    required: true,
  },
  {
    name: 'expandableItems',
    types: '[key: string]: Array<string | number>;',
    description: 'Accepts an object with parent ids as keys and an array of child ids that will be hidden on render.',
  },
  {
    name: 'items',
    types: 'any[]',
    description: 'The array of items to display.',
    required: true,
  },
  {
    name: 'onChange',
    types: '(items: any[]) => void',
    description: 'Returns the items that have been updated.',
    required: true,
  },
  {
    name: 'onErrors',
    types: '(items: WorksheetError[]) => void',
    description: (
      <>
        Returns an array of <NextLink href="#worksheet-error-prop-table">Error</NextLink> when an error is present.
      </>
    ),
  },
];

const worksheetTextColumnProps: Prop[] = [
  {
    name: 'hash',
    types: 'string',
    required: true,
    description:
      'Unique identifier for the column value of each row. Used internally to identify and manage state values.',
  },
  {
    name: 'header',
    types: 'string',
    required: true,
    description: 'Header for the column.',
  },
  {
    name: 'type',
    types: 'text',
    defaultValue: 'text',
    description: 'Sets the cell type of the column.',
  },
  {
    name: 'formatting',
    types: '(value: any) => string',
    description: 'Used to format the value of a cell.',
  },
  {
    name: 'validation',
    types: '(value: any) => boolean',
    description: 'Will set a cell as invalid if it returns false.',
  },
  {
    name: 'disable',
    types: 'boolean',
    description: 'Disables cell manipulation for the entire column.',
  },
];

const worksheetNumberColumnProps: Prop[] = [
  {
    name: 'hash',
    types: 'string',
    required: true,
    description:
      'Unique identifier for the column value of each row. Used internally to identify and manage state values.',
  },
  {
    name: 'header',
    types: 'string',
    required: true,
    description: 'Header for the column.',
  },
  {
    name: 'type',
    types: 'number',
    required: true,
    description: 'Sets the cell type of the column.',
  },
  {
    name: 'formatting',
    types: '(value: any) => string',
    description: 'Used to format the value of a cell.',
  },
  {
    name: 'validation',
    types: '(value: any) => boolean',
    description: 'Function to test the validity of the cell.',
  },
  {
    name: 'disable',
    types: 'boolean',
    description: 'Disables cell manipulation for the entire column.',
  },
];

const worksheetCheckboxColumnProps: Prop[] = [
  {
    name: 'hash',
    types: 'string',
    required: true,
    description:
      'Unique identifier for the column value of each row. Used internally to identify and manage state values.',
  },
  {
    name: 'header',
    types: 'string',
    required: true,
    description: 'Header for the column.',
  },
  {
    name: 'type',
    types: 'checkbox',
    required: true,
    description: 'Sets the cell type of the column.',
  },
  {
    name: 'validation',
    types: '(value: any) => boolean',
    description: 'Function to test the validity of the cell.',
  },
  {
    name: 'disable',
    types: 'boolean',
    description: 'Disables cell manipulation for the entire column.',
  },
];

const worksheetSelectableColumnProps: Prop[] = [
  {
    name: 'hash',
    types: 'string',
    required: true,
    description:
      'Unique identifier for the column value of each row. Used internally to identify and manage state values.',
  },
  {
    name: 'header',
    types: 'string',
    required: true,
    description: 'Header for the column.',
  },
  {
    name: 'type',
    types: 'select',
    required: true,
    description: 'Sets the cell type of the column.',
  },
  {
    name: 'validation',
    types: '(value: any) => boolean',
    description: 'Function to test the validity of the cell.',
  },
  {
    name: 'config',
    types: <NextLink href="#worksheet-selectable-config-prop-table">SelectableConfig</NextLink>,
    description: (
      <>
        See <NextLink href="#worksheet-selectable-config-prop-table">below</NextLink> for usage.
      </>
    ),
  },
  {
    name: 'disable',
    types: 'boolean',
    description: 'Disables cell manipulation for the entire column.',
  },
];

const worksheetModalColumnProps: Prop[] = [
  {
    name: 'hash',
    types: 'string',
    required: true,
    description:
      'Unique identifier for the column value of each row. Used internally to identify and manage state values.',
  },
  {
    name: 'header',
    types: 'string',
    required: true,
    description: 'Header for the column.',
  },
  {
    name: 'type',
    types: 'modal',
    required: true,
    description: 'Sets the cell type of the column.',
  },
  {
    name: 'formatting',
    types: '(value: any) => string',
    description: 'Used to format the value of a cell.',
  },
  {
    name: 'validation',
    types: '(value: any) => boolean',
    description: 'Function to test the validity of the cell.',
  },
  {
    name: 'config',
    types: <NextLink href="#worksheet-modal-config-prop-table">ModalConfig</NextLink>,
    description: (
      <>
        See <NextLink href="#worksheet-modal-config-prop-table">below</NextLink> for usage.
      </>
    ),
  },
  {
    name: 'disable',
    types: 'boolean',
    description: 'Disables cell manipulation for the entire column.',
  },
];

const worksheetSelectableConfigProps: Prop[] = [
  {
    name: 'options',
    types: 'Array<SelectOption> | Array<SelectOptionGroup>',
    required: true,
    description: (
      <>
        Accepts an array of <Code>SelectOptions</Code> or an array of <Code>SelectOptionGroups</Code>. See examples for
        usage.
      </>
    ),
  },
];

const worksheetModalConfigProps: Prop[] = [
  {
    name: 'cancelActionText',
    types: 'string',
    defaultValue: 'Cancel',
    description: 'Sets custom text for cancel action.',
  },
  {
    name: 'header',
    types: 'string',
    description: 'Header for the column.',
  },
  {
    name: 'saveActionText',
    types: 'string',
    defaultValue: 'Save',
    description: 'Sets custom text for save action.',
  },
  {
    name: 'render',
    types: 'React.ComponentType',
    required: true,
    description: 'Content to render in Modal.',
  },
];

const worksheetErrorProps: Prop[] = [
  {
    name: 'item',
    types: 'any',
    description: 'Item with errored cell.',
  },
  {
    name: 'error',
    types: 'any[]',
    description: 'Keys of cells with errors.',
  },
];

export const WorksheetPropTable: React.FC<PropTableWrapper> = (props) => (
  <PropTable title="Worksheet" propList={worksheetProps} {...props} />
);

export const WorksheetTextColumnPropTable: React.FC<PropTableWrapper> = (props) => (
  <PropTable title="Worksheet[TextColumn]" propList={worksheetTextColumnProps} {...props} />
);

export const WorksheetNumberColumnPropTable: React.FC<PropTableWrapper> = (props) => (
  <PropTable title="Worksheet[NumberColumn]" propList={worksheetNumberColumnProps} {...props} />
);

export const WorksheetCheckboxColumnPropTable: React.FC<PropTableWrapper> = (props) => (
  <PropTable title="Worksheet[CheckboxColumn]" propList={worksheetCheckboxColumnProps} {...props} />
);

export const WorksheetSelectableColumnPropTable: React.FC<PropTableWrapper> = (props) => (
  <PropTable title="Worksheet[SelectableColumn]" propList={worksheetSelectableColumnProps} {...props} />
);

export const WorksheetModalColumnPropTable: React.FC<PropTableWrapper> = (props) => (
  <PropTable title="Worksheet[ModalColumn]" propList={worksheetModalColumnProps} {...props} />
);

export const WorksheetSelectableConfigPropTable: React.FC<PropTableWrapper> = (props) => (
  <PropTable title="Worksheet[SelectableConfig]" propList={worksheetSelectableConfigProps} {...props} />
);

export const WorksheetModalConfigPropTable: React.FC<PropTableWrapper> = (props) => (
  <PropTable title="Worksheet[ModalConfig]" propList={worksheetModalConfigProps} {...props} />
);

export const WorksheetErrorPropTable: React.FC<PropTableWrapper> = (props) => (
  <PropTable title="Worksheet[Error]" propList={worksheetErrorProps} {...props} />
);
