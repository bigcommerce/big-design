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

export const ImgPropTable: React.FC<PropTableWrapper> = (props) => (
  <PropTable nativeElement={['img', 'all']} propList={[]} title="Img" {...props} />
);
