import React from 'react';

import { Code, NextLink, Prop, PropTable, PropTableWrapper } from '../components';

const panelProps: Prop[] = [
  {
    name: 'header',
    types: 'string',
    description: (
      <>
        Defines the <Code primary>Panel</Code> header text.
      </>
    ),
  },
  {
    name: 'headerId',
    types: 'string',
    description: (
      <>
        Gives the header a HTML <Code>id</Code> attribute. Useful if you need to use hash navigation
        to a <Code primary>Panel</Code> header.
      </>
    ),
  },
  {
    name: 'action',
    types: 'ButtonProps & { text: string }',
    description: (
      <>
        Defines the <Code primary>Panel</Code> action button.
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
  {
    name: 'description',
    types: ['string', 'React.ReactNode'],
    description: 'Appends a description below the header and action.',
  },
];

export const PanelPropTable: React.FC<PropTableWrapper> = (props) => (
  <PropTable propList={panelProps} title="Panel" {...props} />
);
