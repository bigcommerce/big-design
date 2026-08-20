import React from 'react';

import { Code, NextLink, type Prop, PropTable, type PropTableWrapper } from '../components';

import { messagingLinkItemProps } from './shared';

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
    types: [
      'string',
      <NextLink
        href={{
          hash: 'info-card-description-prop-table',
          query: { props: 'info-card-description' },
        }}
        key="info-card-description"
      >
        InfoCardDescription
      </NextLink>,
    ],
    description: (
      <>
        Secondary text rendered below the <Code primary>title</Code>. See{' '}
        <NextLink
          href={{
            hash: 'info-card-description-prop-table',
            query: { props: 'info-card-description' },
          }}
        >
          InfoCardDescription
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

const infoCardDescriptionProps: Prop[] = [
  {
    name: 'text',
    types: ['string'],
    required: true,
    description: (
      <>
        Description to display below <Code primary>title</Code>.
      </>
    ),
  },
  {
    name: 'link',
    types: (
      <NextLink
        href={{
          hash: 'info-card-description-link-prop-table',
          query: { props: 'info-card-description-link' },
        }}
      >
        InfoCardDescriptionLink
      </NextLink>
    ),
    description: (
      <>
        See{' '}
        <NextLink
          href={{
            hash: 'info-card-description-link-prop-table',
            query: { props: 'info-card-description-link' },
          }}
        >
          InfoCardDescriptionLink
        </NextLink>{' '}
        for usage.
      </>
    ),
  },
];

export const InfoCardPropTable: React.FC<PropTableWrapper> = (props) => (
  <PropTable propList={infoCardProps} title="InfoCard" {...props} />
);

export const InfoCardDescriptionPropTable: React.FC<PropTableWrapper> = (props) => (
  <PropTable
    propList={infoCardDescriptionProps}
    title="InfoCard[InfoCardDescription]"
    {...props}
    id="info-card-description-prop-table"
  />
);

export const InfoCardDescriptionLinkPropTable: React.FC<PropTableWrapper> = (props) => (
  <PropTable
    propList={messagingLinkItemProps}
    title="InfoCard[InfoCardDescriptionLink]"
    {...props}
    id="info-card-description-link-prop-table"
  />
);

export const ImgPropTable: React.FC<PropTableWrapper> = (props) => (
  <PropTable nativeElement={['img', 'all']} propList={[]} title="Img" {...props} />
);
