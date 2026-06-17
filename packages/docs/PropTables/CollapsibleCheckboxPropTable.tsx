import { Text } from '@bigcommerce/big-design';
import React from 'react';

import { Code, NextLink, Prop, PropTable, PropTableWrapper } from '../components';

import { CheckboxPropTable } from './CheckboxPropTable';

const collapsibleCheckboxProps: Prop[] = [
  {
    name: 'checked',
    types: 'boolean',
    description: (
      <>
        Controls the checked state. The component is controlled — pair it with <Code>onChange</Code>
        . The panel can only be expanded while <Code>checked</Code> is <Code>true</Code>.
      </>
    ),
    required: true,
  },
  {
    name: 'onChange',
    types: 'ChangeEventHandler<HTMLInputElement>',
    description: 'Change handler for the checkbox. Required because the component is controlled.',
    required: true,
  },
  {
    name: 'triggerTitle',
    types: 'string',
    description: 'Title shown on the collapse trigger button.',
    required: true,
  },
  {
    name: 'children',
    types: 'React.ReactNode',
    description: 'Content revealed inside the collapse panel.',
    required: true,
  },
  {
    name: 'collapseProps',
    types: (
      <NextLink href={{ pathname: '/collapse', hash: 'props', query: { props: 'collapse' } }}>
        Omit&lt;CollapseProps, &apos;children&apos;&gt;
      </NextLink>
    ),
    description: (
      <>
        Props forwarded to the underlying Collapse. By default the panel is disabled while the
        checkbox is unchecked; pass <Code>disabled</Code> here to override that.
      </>
    ),
  },
  {
    name: 'triggerProps',
    types: (
      <NextLink
        href={{ pathname: '/collapse', hash: 'props', query: { props: 'collapse-trigger' } }}
      >
        Omit&lt;CollapseTriggerProps, &apos;title&apos;&gt;
      </NextLink>
    ),
    description: 'Props forwarded to the underlying Collapse.Trigger.',
  },
  {
    name: 'panelProps',
    types: (
      <NextLink href={{ pathname: '/collapse', hash: 'props', query: { props: 'collapse-panel' } }}>
        Omit&lt;CollapsePanelProps, &apos;children&apos;&gt;
      </NextLink>
    ),
    description: 'Props forwarded to the underlying Collapse.Panel.',
  },
];

export const CollapsibleCheckboxPropsTable: React.FC<PropTableWrapper> = (props) => (
  <PropTable
    inheritedProps={
      <>
        <Text>
          Extends <NextLink href="/checkbox">Checkbox</NextLink>, so it accepts every{' '}
          <Code>Checkbox</Code> prop (<Code>label</Code>, <Code>description</Code>, <Code>img</Code>
          , <Code>badge</Code>, …) as well as the native <Code>input</Code> attributes.
        </Text>
        <CheckboxPropTable collapsible />
      </>
    }
    propList={collapsibleCheckboxProps}
    title="CollapsibleCheckbox"
    {...props}
  />
);
