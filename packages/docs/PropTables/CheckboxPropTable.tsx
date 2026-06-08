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
        Renders <Code primary>Checkbox</Code> with a visually hidden label, retains accessibility
        for screen readers.
      </>
    ),
  },
  {
    name: 'isIndeterminate',
    types: 'boolean',
    description: (
      <>
        Styles and sets the checkbox into a indeterminate state. Note that the{' '}
        <Code primary>checked</Code> prop will take precedence over{' '}
        <Code primary>isIndeterminate</Code>.
      </>
    ),
  },
  {
    name: 'description',
    types: [
      'string',
      <NextLink
        href={{ hash: 'checkbox-description-prop-table', query: { props: 'checkbox-description' } }}
        key="checkbox-description"
      >
        CheckboxDescription
      </NextLink>,
    ],
    description: (
      <>
        See{' '}
        <NextLink
          href={{
            hash: 'checkbox-description-prop-table',
            query: { props: 'checkbox-description' },
          }}
        >
          CheckboxDescription
        </NextLink>{' '}
        for usage.
      </>
    ),
  },
  {
    name: 'badge',
    types: [
      <NextLink href="/badge" key="badge-type">
        BadgeProps
      </NextLink>,
    ],
    description: (
      <>
        See <NextLink href="/badge">Badge</NextLink> for usage.
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
      <NextLink
        href={{
          hash: 'checkbox-description-link-prop-table',
          query: { props: 'checkbox-description-link' },
        }}
      >
        CheckboxDescriptionLink
      </NextLink>
    ),
    description: (
      <>
        See{' '}
        <NextLink
          href={{
            hash: 'checkbox-description-link-prop-table',
            query: { props: 'checkbox-description-link' },
          }}
        >
          CheckboxDescriptionLink
        </NextLink>{' '}
        for usage.
      </>
    ),
  },
  {
    name: 'collapseOptions',
    types: [
      <NextLink
        href={{
          hash: 'checkbox-collapse-prop-table',
          query: { props: 'checkbox-collapse' },
        }}
        key="checkbox-collapse"
      >
        CheckboxCollapse
      </NextLink>,
    ],
    description: <>Adds a collapsible section beneath the checkbox row.</>,
  },
  {
    name: 'disableWhenUnchecked',
    types: ['boolean'],
    required: false,
    description: (
      <>
        When <Code>true</Code>, the collapse trigger is disabled and the panel is forced closed
        while the checkbox is unchecked. Has no effect without <Code>collapseOptions</Code>.
      </>
    ),
  },
  {
    name: 'img',
    types: [
      <NextLink
        href={{
          hash: 'checkbox-img-prop-table',
          query: { props: 'checkbox-img' },
        }}
        key="checkbox-img"
      >
        CheckboxImg
      </NextLink>,
    ],
    description: <>Renders an image next to the label.</>,
  },
];

export const CheckboxPropTable: React.FC<PropTableWrapper> = (props) => (
  <PropTable
    nativeElement={['input', 'all']}
    propList={checkboxProps}
    title="Checkbox"
    {...props}
  />
);

export const CheckboxDescriptionPropTable: React.FC<PropTableWrapper> = (props) => (
  <PropTable
    propList={checkboxDescriptionProps}
    title="Checkbox[CheckboxDescription]"
    {...props}
    id="checkbox-description-prop-table"
  />
);

export const CheckboxDescriptionLinkPropTable: React.FC<PropTableWrapper> = (props) => (
  <PropTable
    propList={messagingLinkItemProps}
    title="Checkbox[CheckboxDescriptionLink]"
    {...props}
    id="checkbox-description-link-prop-table"
  />
);

const checkboxCollapseProps: Prop[] = [
  {
    name: 'collapse',
    types: ['CollapseProps'],
    required: true,
    description: (
      <>
        Props forwarded to the underlying <Code>Collapse</Code>.
      </>
    ),
  },
  {
    name: 'trigger',
    types: ['CollapseTriggerProps'],
    required: true,
    description: (
      <>
        Props forwarded to the underlying <Code>Collapse.Trigger</Code>.
      </>
    ),
  },
  {
    name: 'panel',
    types: ['CollapsePanelProps'],
    required: false,
    description: (
      <>
        Props forwarded to the underlying <Code>Collapse.Panel</Code>. Render the collapsible
        content via its <Code>children</Code>.
      </>
    ),
  },
];

const checkboxImgProps: Prop[] = [
  {
    name: 'src',
    types: ['string'],
    required: true,
    description: <>Image URL.</>,
  },
  {
    name: 'alt',
    types: ['string'],
    required: false,
    description: <>Alternative text for the image.</>,
  },
];

export const CheckboxCollapsePropTable: React.FC<PropTableWrapper> = (props) => (
  <PropTable
    propList={checkboxCollapseProps}
    title="Checkbox[CheckboxCollapse]"
    {...props}
    id="checkbox-collapse-prop-table"
  />
);

export const CheckboxImgPropTable: React.FC<PropTableWrapper> = (props) => (
  <PropTable
    propList={checkboxImgProps}
    title="Checkbox[CheckboxImg]"
    {...props}
    id="checkbox-img-prop-table"
  />
);
