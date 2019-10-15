import React from 'react';

import { Code, NextLink, PropTable } from '../components';

export const DropdownPropTable: React.FC = () => (
  <PropTable>
    <PropTable.Prop name="maxHeight" types="number" defaults="250">
      Sets the max-height of the dropdown.
    </PropTable.Prop>
    <PropTable.Prop
      name="placement"
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
      Sets the placement of the Dropdown relative to the anchor.
    </PropTable.Prop>
    <PropTable.Prop name="options" types="Array<DropdownItem | DropdownLinkItem>">
      Accepts an array of <Code>DropdownItems</Code> and <Code>DropdownLinkItems</Code>. See example for usage.
    </PropTable.Prop>
    <PropTable.Prop name="trigger" types="ReactElement" required>
      Element used as anchor.
    </PropTable.Prop>
  </PropTable>
);

export const DropdownItemPropTable: React.FC = () => (
  <PropTable>
    <PropTable.Prop name="content" types="string" required>
      Sets the text content of the Dropdown Item.
    </PropTable.Prop>
    <PropTable.Prop name="disabled" types="boolean">
      Sets the item to disabled.
    </PropTable.Prop>
    <PropTable.Prop name="onClick" types="(item: DropdownItem): void">
      Returns the item object.
    </PropTable.Prop>
    <PropTable.Prop name="type" types="'string'" defaults="'string'">
      Type of the item.
    </PropTable.Prop>
    <PropTable.Prop name="value" types="any">
      Stored value of the item.
    </PropTable.Prop>
  </PropTable>
);

export const DropdownLinkItemPropTable: React.FC = () => (
  <PropTable>
    <PropTable.Prop name="content" types="string" required>
      Sets the text content of the Dropdown Item.
    </PropTable.Prop>
    <PropTable.Prop name="onClick" types="(item: DropdownLinkItem): void">
      Returns the item object.
    </PropTable.Prop>
    <PropTable.Prop name="type" types="'link'" required>
      Wraps the <Code>content</Code> in a <NextLink href="/link">Link</NextLink> component.
    </PropTable.Prop>
    <PropTable.Prop name="url" types="string" required>
      Valid URL of a linked resource.
    </PropTable.Prop>
    <PropTable.Prop name="target" types="'_blank'">
      Indicates where to display the linked resource.
    </PropTable.Prop>
  </PropTable>
);
