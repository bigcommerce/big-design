import React from 'react';

import { Code, PropTable } from '../components';

export const SelectPropTable: React.FC = () => (
  <PropTable>
    <PropTable.Prop name="error" types="ReactChild">
      Displays a form error around the field.
    </PropTable.Prop>
    <PropTable.Prop name="label" types="ReactChild">
      Adds a label to the field.
    </PropTable.Prop>
    <PropTable.Prop name="maxHeight" types="number" defaults="250">
      Sets a <Code>max-height</Code> to the dropdown.
    </PropTable.Prop>
    <PropTable.Prop
      name="placement"
      types={[
        'auto-start',
        'auto',
        'auto-end',
        'top-start',
        'top',
        'top-end',
        'right-start',
        'right',
        'right-end',
        'bottom-end',
        'bottom',
        'bottom-start',
        'left-end',
        'left',
        'left-start',
      ]}
      defaults="bottom-start"
    >
      Determines the location in which the dropdown will be placed.
    </PropTable.Prop>
    <PropTable.Prop name="required" types="boolean">
      Sets the field as required.
    </PropTable.Prop>
    <PropTable.Prop name="value" types="string | string[] | number">
      Modifies the current selected value of the field.
    </PropTable.Prop>
    <PropTable.Prop name="onActionClick" types="(string) => void">
      Callback called with the typed text of the field.
    </PropTable.Prop>
    <PropTable.Prop name="onItemChange" types="(value) => void" required>
      Callback called with value of clicked item.
    </PropTable.Prop>
  </PropTable>
);

export const SelectOptionPropTable: React.FC = () => (
  <PropTable>
    <PropTable.Prop name="value" types="string | string[] | number">
      Value of the option
    </PropTable.Prop>
  </PropTable>
);
