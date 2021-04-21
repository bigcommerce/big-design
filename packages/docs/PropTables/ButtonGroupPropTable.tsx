import React from 'react';

import { Code, NextLink, Prop, PropTable, PropTableWrapper } from '../components';

import { dropdownProps } from './DropdownPropTable';

const buttonGroupProps: Prop[] = [
  {
    name: 'items',
    types: 'Array<ButtonGroupItem | ButtonGroupDropdownItem>',
    description: (
      <>
        Accepts an array of <NextLink href="#button-group-item-prop-table">ButtonGroupItem</NextLink> and{' '}
        <NextLink href="#button-group-dropdown-item-prop-table">ButtonGroupDropdownItem</NextLink>.
      </>
    ),
    required: true,
  },
];

export const ButtonGroupPropTable: React.FC<PropTableWrapper> = (props) => (
  <PropTable title="ButtonGroup" propList={buttonGroupProps} {...props} />
);

const buttonGroupItemProps: Prop[] = [
  {
    name: 'content',
    types: (
      <>
        <Code>string</Code> |{' '}
        <NextLink href="/Icons/IconsPage" as="/icons">
          Icon
        </NextLink>
      </>
    ),
    description: 'The content inside the item',
    required: true,
  },
];

export const ButtonGroupItemPropTable: React.FC<PropTableWrapper> = (props) => (
  <PropTable title="ButtonGroupItem" propList={buttonGroupItemProps} {...props} />
);

const extendedDropdownProps = dropdownProps.filter(({ name }) => name !== 'toggle');

const buttonGroupDropdownItemProps: Prop[] = [
  ...extendedDropdownProps,
  {
    name: 'items',
    types: 'Array<DropdownItem | DropdownLinkItem> | Array<DropdownItemGroup>',
    required: true,
    description: (
      <>
        Accepts an array of <NextLink href="/dropdown#dropdown-item-prop-table">DropdownItems</NextLink> and{' '}
        <NextLink href="/dropdown#dropdown-link-item-prop-table">DropdownLinkItems</NextLink>. It also accept a{' '}
        <NextLink href="/dropdown#dropdown-item-group-prop-table">DropdownItemGroup</NextLink> when you want to group
        items. See example for usage.
      </>
    ),
  },
  {
    name: 'toggle',
    types: <NextLink href="#button-group-item-prop-table">ButtonGroupItem</NextLink>,
    description: 'Element used as anchor. Toggles the dropdown.',
    required: true,
  },
];

export const ButtonGroupDropdownItemPropTable: React.FC<PropTableWrapper> = (props) => (
  <PropTable title="ButtonGroupDropdownItem" propList={buttonGroupDropdownItemProps} {...props} />
);
