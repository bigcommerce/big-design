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
        Label to display next to a <Code>Radio</Code> component.
      </>
    ),
  },
  {
    name: 'description',
    types: ['RadioDescription'],
    description: (
      <>
        See <NextLink href="#radio-description-prop-table">below</NextLink> for usage.
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
        Description to display below <Code>Label</Code>
      </>
    ),
  },
  {
    name: 'link',
    types: ['RadioDescriptionLink'],
    description: (
      <>
        See <NextLink href="#radio-description-link-prop-table">below</NextLink> for usage.
      </>
    ),
  },
];

export const RadioPropTable: React.FC<PropTableWrapper> = props => (
  <PropTable title="Radio" propList={radioProps} {...props} />
);

export const RadioDescriptionPropTable: React.FC<PropTableWrapper> = props => (
  <PropTable
    title="Radio[RadioDescription]"
    propList={radioDescriptionProps}
    {...props}
    id="radio-description-prop-table"
  />
);

export const RadioDescriptionLinkPropTable: React.FC<PropTableWrapper> = props => (
  <PropTable
    title="Radio[RadioDescriptionLink]"
    propList={messagingLinkItemProps}
    {...props}
    id="radio-description-link-prop-table"
  />
);
