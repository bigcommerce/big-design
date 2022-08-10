import React from 'react';

import { Code, NextLink, Prop, PropTable, PropTableWrapper } from '../components';

const accordionGroupProps: Prop[] = [
  {
    name: 'panels',
    types: (
      <NextLink href={{ hash: 'accordion-panel-prop-table', query: { props: 'accordion-panel' } }}>
        AccordionPanelProps[]
      </NextLink>
    ),
    description: (
      <>
        See{' '}
        <NextLink
          href={{ hash: 'accordion-panel-prop-table', query: { props: 'accordion-panel' } }}
        >
          Accordion Panel
        </NextLink>{' '}
        for usage.
      </>
    ),
    required: true,
  },
  {
    name: 'header',
    types: 'string',
    description: (
      <>
        Defines the <Code primary>AccordionGroup</Code> header text
      </>
    ),
    required: true,
  },
];

export const AccordionGroupPropTable: React.FC<PropTableWrapper> = (props) => (
  <PropTable propList={accordionGroupProps} title="Accordion Group" {...props} />
);

const accordionPanelProps: Prop[] = [
  {
    name: 'children',
    types: 'React.ReactNode',
    description: (
      <>
        Render individual components to expandable region of <Code primary>Accordion Panel</Code>.
      </>
    ),
    required: true,
  },
  {
    name: 'defaultExpanded',
    types: 'boolean',
    description: (
      <>
        Defines if <Code primary>Accordion Panel</Code> is expanded by default.
      </>
    ),
  },
  {
    name: 'header',
    types: 'string',
    description: (
      <>
        Defines the <Code primary>Accordion Panel</Code> header text.
      </>
    ),
    required: true,
  },
  {
    name: 'iconLeft',
    types: <NextLink href="/icons">Icon</NextLink>,
    description: (
      <>
        Pass in an <NextLink href="/icons">Icon</NextLink> component to display to the left of the{' '}
        <Code primary>Accordion Panel</Code> header.
      </>
    ),
  },
  {
    name: 'isExpanded',
    types: 'boolean',
    description: (
      <>
        Defines if <Code primary>Accordion Panel</Code> is expanded.
      </>
    ),
    required: true,
  },

  {
    name: 'onClick',
    types: '() => void',
    description: (
      <>
        Function that will be called when an <Code primary>Accordion Panel</Code> is clicked.
      </>
    ),
  },
];

export const AccordionPanelPropTable: React.FC<PropTableWrapper> = (props) => (
  <PropTable propList={accordionPanelProps} title="Accordion Panel" {...props} />
);
