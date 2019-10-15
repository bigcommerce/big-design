import React from 'react';

import { Code, NextLink, Prop, PropTable } from '../components';

const dropdownProps: Prop[] = [
  {
    name: 'maxHeight',
    types: 'number',
    defaultValue: '250',
    description: 'Sets the max-height of the dropdown.',
  },
  {
    name: 'placement',
    types: [
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
    ],
    defaultValue: 'bottom-start',
    description: 'Sets the placement of the Dropdown relative to the anchor.',
  },
  {
    name: 'options',
    types: 'Array<DropdownItem | DropdownLinkItem>',
    description: (
      <>
        Accepts an array of <Code>DropdownItems</Code> and <Code>DropdownLinkItems</Code>. See example for usage.
      </>
    ),
  },
  {
    name: 'trigger',
    types: 'ReactElement',
    required: true,
    description: 'Element used as anchor.',
  },
];

const dropdownItemProps: Prop[] = [
  {
    name: 'actionType',
    types: ['normal', 'destructive'],
    defaultValue: 'normal',
    description: "Indicates whether your item's action is of normal or destructive nature.",
  },
  {
    name: 'content',
    types: 'string',
    required: true,
    description: 'Sets the text content of the Dropdown Item.',
  },
  {
    name: 'disabled',
    types: 'boolean',
    description: 'Sets the item to disabled.',
  },
  {
    name: 'icon',
    types: (
      <NextLink href="/Icons/IconsPage" as="/icons">
        Icon
      </NextLink>
    ),
    description: (
      <>
        Pass in an{' '}
        <NextLink href="/Icons/IconsPage" as="/icons">
          Icon
        </NextLink>{' '}
        component to display to the left of the text.
      </>
    ),
  },
  {
    name: 'onClick',
    types: '(item: DropdownItem): void',
    description: 'Returns the item object.',
  },
  {
    name: 'type',
    types: "'string'",
    defaultValue: "'string'",
    description: 'Type of the item.',
  },
  {
    name: 'value',
    types: 'any',
    description: 'Stored value of the item.',
  },
];

const dropdownLinkProps: Prop[] = [
  {
    name: 'actionType',
    types: ['normal', 'destructive'],
    defaultValue: 'normal',
    description: "Indicates whether your item's action is of normal or destructive nature.",
  },
  {
    name: 'content',
    types: 'string',
    required: true,
    description: 'Sets the text content of the Dropdown Item.',
  },
  {
    name: 'disabled',
    types: 'boolean',
    description: 'Sets the item to disabled.',
  },
  {
    name: 'icon',
    types: (
      <NextLink href="/Icons/IconsPage" as="/icons">
        Icon
      </NextLink>
    ),
    description: (
      <>
        Pass in an{' '}
        <NextLink href="/Icons/IconsPage" as="/icons">
          Icon
        </NextLink>{' '}
        component to display to the left of the text.
      </>
    ),
  },
  {
    name: 'onClick',
    types: '(item: DropdownLinkItem): void',
    description: 'Returns the item object.',
  },
  {
    name: 'type',
    types: "'link'",
    required: true,
    description: (
      <>
        Wraps the <Code>content</Code> in a <NextLink href="/link">Link</NextLink> component.
      </>
    ),
  },
  {
    name: 'url',
    types: 'string',
    required: true,
    description: 'Valid URL of a linked resource.',
  },
  {
    name: 'target',
    types: "'_blank'",
    description: 'Indicates where to display the linked resource.',
  },
];

export const DropdownPropTable: React.FC = () => <PropTable propList={dropdownProps} />;
export const DropdownItemPropTable: React.FC = () => <PropTable propList={dropdownItemProps} />;
export const DropdownLinkItemPropTable: React.FC = () => <PropTable propList={dropdownLinkProps} />;
