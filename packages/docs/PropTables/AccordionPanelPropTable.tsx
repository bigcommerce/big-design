import React from 'react';

import { Code, NextLink, Prop, PropTable, PropTableWrapper } from '../components';

const accordionPanelProps: Prop[] = [
  {
    name: 'panels',
    types: (
      <NextLink href={{ hash: 'accordion-prop-table', query: { props: 'accordion' } }}>
        AccordionProps[]
      </NextLink>
    ),
    description: (
      <>
        See{' '}
        <NextLink href={{ hash: 'accordion-prop-table', query: { props: 'accordion' } }}>
          Accordion
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
        Defines the <Code primary>Accordion Panel</Code> header text
      </>
    ),
    required: true,
  },
];

export const AccordionPanelPropTable: React.FC<PropTableWrapper> = (props) => (
  <PropTable propList={accordionPanelProps} title="Accordion Panel" {...props} />
);

const accordionProps: Prop[] = [
  {
    name: 'children',
    types: 'React.ReactNode',
    description: (
      <>
        Render individual components to expandable region of <Code primary>Accordion</Code>.
      </>
    ),
    required: true,
  },
  {
    name: 'defaultExpanded',
    types: 'boolean',
    description: (
      <>
        Defines if <Code primary>Accordion</Code> is expanded by default.
      </>
    ),
  },
  {
    name: 'header',
    types: 'string',
    description: (
      <>
        Defines the <Code primary>Accordion</Code> header text.
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
        <Code primary>Accordion</Code> header.
      </>
    ),
  },
  {
    name: 'isExpanded',
    types: 'boolean',
    description: (
      <>
        Defines if <Code primary>Accordion</Code> is expanded.
      </>
    ),
    required: true,
  },
  {
    name: 'onClick',
    types: 'React.MouseEventHandler<HTMLButtonElement>',
    description: (
      <>
        Function that will be called when an <Code primary>Accordion</Code> is clicked.
      </>
    ),
    required: true,
  },
];

export const AccordionPropTable: React.FC<PropTableWrapper> = (props) => (
  <PropTable propList={accordionProps} title="Accordion" {...props} />
);
