import React from 'react';

import { Code, NextLink, Prop, PropTable, PropTableWrapper } from '../components';

const infoCardProps: Prop[] = [
  {
    name: 'title',
    types: 'string',
    required: true,
    description: (
      <>
        Primary text displayed by the <Code primary>InfoCard</Code>.
      </>
    ),
  },
  {
    name: 'description',
    types: 'string',
    description: (
      <>
        Secondary text rendered below the <Code primary>title</Code>.
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
        Renders a <NextLink href="/badge">Badge</NextLink> next to the <Code primary>title</Code>.
      </>
    ),
  },
  {
    name: 'img',
    types: '{ src: string; alt?: string }',
    description: (
      <>
        Renders a thumbnail to the left of the <Code primary>title</Code>. Set <Code>alt</Code> when
        the image conveys meaning the title doesn&apos;t; when omitted it defaults to an empty
        string (decorative) per WCAG 1.1.1.
      </>
    ),
  },
];

export const InfoCardPropTable: React.FC<PropTableWrapper> = (props) => (
  <PropTable propList={infoCardProps} title="InfoCard" {...props} />
);
