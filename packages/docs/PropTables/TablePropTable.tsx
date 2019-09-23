import { Text } from '@bigcommerce/big-design';
import React from 'react';

import { Code, PropTable } from '../components';

export const TablePropTable: React.FC = () => (
  <PropTable>
    <PropTable.Prop name="selectable" types="boolean">
      Determines whether table rows are selectable or not.
    </PropTable.Prop>
    <PropTable.Prop name="stickyHeader" types="boolean">
      Enables/disables the table header as sticky.
    </PropTable.Prop>
  </PropTable>
);

export const TableActionsPropTable: React.FC = () => (
  <PropTable>
    <PropTable.Prop name="tableId" types="string">
      By default, <Code primary>tableId</Code> will be generated uniquely, otherwise pass in a user-defined id.
    </PropTable.Prop>
  </PropTable>
);

export const TableBodyPropTable: React.FC = () => (
  <Text>
    Supports all native <Code>&lt;tbody&nbsp;/&gt;</Code> element attributes.
  </Text>
);

export const TableCellPropTable: React.FC = () => (
  <>
    <Text>
      <Code>Table.Cell</Code> is unique depending on the context of its location. If a cell is in a{' '}
      <Code>Table.Head</Code> section, the cell will render a <Code>&lt;th&nbsp;/&gt;</Code>, otherwise it'll render a{' '}
      <Code>&lt;td&nbsp;/&gt;</Code>.
    </Text>
    <PropTable>
      <PropTable.Prop name="align" types={['left', 'middle', 'right']}>
        Determines the alignment of text within a cell.
      </PropTable.Prop>
      <PropTable.Prop name="colSpan" types="number"></PropTable.Prop>
    </PropTable>
  </>
);
