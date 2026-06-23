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
    types: <NextLink href={{ hash: 'img-prop-table', query: { props: 'img' } }}>ImgProps</NextLink>,
    description: (
      <>
        Renders a thumbnail to the left of the <Code primary>title</Code>, sized 40&times;40 by
        default. See{' '}
        <NextLink href={{ hash: 'img-prop-table', query: { props: 'img' } }}>ImgProps</NextLink> for
        usage.
      </>
    ),
  },
];

export const InfoCardPropTable: React.FC<PropTableWrapper> = (props) => (
  <PropTable propList={infoCardProps} title="InfoCard" {...props} />
);

const imgProps: Prop[] = [
  {
    name: 'src',
    types: 'string',
    required: true,
    description: <>Source of the thumbnail image.</>,
  },
  {
    name: 'alt',
    types: 'string',
    defaultValue: "''",
    description: (
      <>
        Set <Code>alt</Code> when the image conveys meaning the <Code primary>title</Code>{' '}
        doesn&apos;t; when omitted it defaults to an empty string (decorative) per WCAG 1.1.1.
      </>
    ),
  },
  {
    name: 'width',
    types: ['number', 'string'],
    defaultValue: '40',
    description: (
      <>
        Rendered width of the thumbnail. Override to size the image differently from the 40px
        default.
      </>
    ),
  },
  {
    name: 'height',
    types: ['number', 'string'],
    defaultValue: '40',
    description: (
      <>
        Rendered height of the thumbnail. Override to size the image differently from the 40px
        default.
      </>
    ),
  },
];

export const ImgPropTable: React.FC<PropTableWrapper> = (props) => (
  <PropTable nativeElement={['img', 'all']} propList={imgProps} title="Img" {...props} />
);
