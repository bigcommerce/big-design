import React from 'react';

import { Code, NextLink, Prop, PropTable, PropTableWrapper } from '../components';

import { messagingLinkItemProps } from './shared';

const radioProps: Prop[] = [
  {
    name: 'label',
    types: ['string', 'RadioLabel'],
    required: true,
    description: (
      <>
        Label to display next to a <Code primary>Radio</Code> component.
      </>
    ),
  },
  {
    name: 'description',
    types: ['string', 'RadioDescription'],
    description: (
      <>
        See{' '}
        <NextLink
          href={{ hash: 'radio-description-prop-table', query: { props: 'radio-description' } }}
        >
          RadioDescription
        </NextLink>{' '}
        for usage.
      </>
    ),
  },
];

const radioDescriptionProps: Prop[] = [
  {
    name: 'text',
    types: ['string'],
    required: true,
    description: (
      <>
        Description to display below <Code primary>label</Code>.
      </>
    ),
  },
  {
    name: 'link',
    types: ['RadioDescriptionLink'],
    description: (
      <>
        See{' '}
        <NextLink
          href={{
            hash: 'radio-description-link-prop-table',
            query: { props: 'radio-description-link' },
          }}
        >
          RadioDescriptionLink
        </NextLink>{' '}
        for usage.
      </>
    ),
  },
];

export const RadioPropTable: React.FC<PropTableWrapper> = (props) => (
  <PropTable nativeElement={['input', 'all']} propList={radioProps} title="Radio" {...props} />
);

export const RadioDescriptionPropTable: React.FC<PropTableWrapper> = (props) => (
  <PropTable
    propList={radioDescriptionProps}
    title="Radio[RadioDescription]"
    {...props}
    id="radio-description-prop-table"
  />
);

export const RadioDescriptionLinkPropTable: React.FC<PropTableWrapper> = (props) => (
  <PropTable
    propList={messagingLinkItemProps}
    title="Radio[RadioDescriptionLink]"
    {...props}
    id="radio-description-link-prop-table"
  />
);
