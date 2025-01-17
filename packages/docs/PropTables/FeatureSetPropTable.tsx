import React from 'react';

import { Code, NextLink, Prop, PropTable, PropTableWrapper } from '../components';

const featureSetProps: Prop[] = [
  {
    name: 'tags',
    types: (
      <NextLink href={{ hash: 'feature-tag-prop-table', query: { props: 'feature-tag' } }}>
        TagProps[]
      </NextLink>
    ),
    description: (
      <>
        See{' '}
        <NextLink href={{ hash: 'feature-tag-prop-table', query: { props: 'feature-tag' } }}>
          TagProps
        </NextLink>{' '}
        for usage.
      </>
    ),
    required: true,
  },
];

export const FeatureSetPropTable: React.FC<PropTableWrapper> = (props) => (
  <PropTable propList={featureSetProps} title="Feature Set" {...props} />
);

const featureTagProps: Prop[] = [
  {
    name: 'icon',
    types: <NextLink href="/icons">Icon</NextLink>,
    description: (
      <>
        Pass in an <NextLink href="/icons">Icon</NextLink> component to display at the start of the
        tag.
      </>
    ),
  },
  {
    name: 'label',
    types: 'string',
    description: (
      <>
        Defines the <Code primary>FeatureTag</Code> text.
      </>
    ),
    required: true,
  },
];

export const FeatureTagPropTable: React.FC<PropTableWrapper> = (props) => (
  <PropTable propList={featureTagProps} title="FeatureTag" {...props} />
);
