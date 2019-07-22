import React from 'react';

import { PropTable } from '../../components';

export const DropdownPropTable: React.FC = () => (
  <PropTable>
    <PropTable.Prop name="maxHeight" types="number" defaults="250">
      Sets the max-height of the dropdown.
    </PropTable.Prop>
    <PropTable.Prop name="onActionClick" types="() => void">
      Callback called when an action is clicked.
    </PropTable.Prop>
    <PropTable.Prop name="onItemClick" types="(value) => void">
      Callback called with value of clicked item.
    </PropTable.Prop>
    <PropTable.Prop
      name="position"
      types={[
        'auto',
        'auto-end',
        'auto-start',
        'bottom',
        'bottom-end',
        'bottom-start',
        'left',
        'left-end',
        'left-start',
        'right',
        'right-end',
        'right-start',
        'top',
        'top-end',
        'top-start',
      ]}
      defaults="bottom-start"
    >
      Sets the position of the Dropdown relative to the anchor.
    </PropTable.Prop>
    <PropTable.Prop name="trigger" types="ReactElement" required>
      Element used as anchor.
    </PropTable.Prop>
  </PropTable>
);

export const DropdownItemPropTable: React.FC = () => (
  <PropTable>
    <PropTable.Prop name="value" types="string | string[] | number">
      Value of the item
    </PropTable.Prop>
  </PropTable>
);
