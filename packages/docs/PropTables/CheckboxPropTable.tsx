import React from 'react';

import { Code, NextLink, Prop, PropTable, PropTableWrapper } from '../components';

import { messagingLinkItemProps } from './shared';

const checkboxProps: Prop[] = [
  {
    name: 'label',
    types: ['string', 'CheckboxLabel'],
    required: true,
    description: (
      <>
        Label to display next to a <Code primary>Checkbox</Code> component.
      </>
    ),
  },
  {
    name: 'hiddenLabel',
    types: 'boolean',
    description: (
      <>
        Renders <Code primary>Checkbox</Code> with a visually hidden label, retains accessibility for screen readers.
      </>
    ),
  },
  {
    name: 'isIndeterminate',
    types: 'boolean',
    description: (
      <>
        Styles and sets the checkbox into a indeterminate state. Note that the <Code primary>checked</Code> prop will
        take precedence over <Code primary>isIndeterminate</Code>.
      </>
    ),
  },
  {
    name: 'description',
    types: [
      'string',
      <NextLink
        key="checkbox-description"
        href={{ hash: 'checkbox-description-prop-table', query: { props: 'checkbox-description' } }}
      >
        CheckboxDescription
      </NextLink>,
    ],
    description: (
      <>
        See{' '}
        <NextLink href={{ hash: 'checkbox-description-prop-table', query: { props: 'checkbox-description' } }}>
          CheckboxDescription
        </NextLink>{' '}
        for usage.
      </>
    ),
  },
];

const checkboxDescriptionProps: Prop[] = [
  {
    name: 'text',
    types: ['string'],
    required: true,
    description: (
      <>
        Description to display below <Code primary>Label</Code>
      </>
    ),
  },
  {
    name: 'link',
    types: (
      <NextLink href={{ hash: 'checkbox-description-link-prop-table', query: { props: 'checkbox-description-link' } }}>
        CheckboxDescriptionLink
      </NextLink>
    ),
    description: (
      <>
        See{' '}
        <NextLink
          href={{ hash: 'checkbox-description-link-prop-table', query: { props: 'checkbox-description-link' } }}
        >
          CheckboxDescriptionLink
        </NextLink>{' '}
        for usage.
      </>
    ),
  },
];

export const CheckboxPropTable: React.FC<PropTableWrapper> = (props) => (
  <PropTable title="Checkbox" propList={checkboxProps} nativeElement={['input', 'all']} {...props} />
);

export const CheckboxDescriptionPropTable: React.FC<PropTableWrapper> = (props) => (
  <PropTable
    title="Checkbox[CheckboxDescription]"
    propList={checkboxDescriptionProps}
    {...props}
    id="checkbox-description-prop-table"
  />
);

export const CheckboxDescriptionLinkPropTable: React.FC<PropTableWrapper> = (props) => (
  <PropTable
    title="Checkbox[CheckboxDescriptionLink]"
    propList={messagingLinkItemProps}
    {...props}
    id="checkbox-description-link-prop-table"
  />
);
