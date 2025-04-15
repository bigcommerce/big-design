import React from 'react';

import { NextLink, Prop, PropTable, PropTableWrapper } from '../components';

const anchorNavProps: Prop[] = [
  {
    name: 'elements',
    types: (
      <>
        <NextLink
          href={{
            hash: 'anchor-nav-element-prop-table',
            query: { props: 'anchor-nav-element-props' },
          }}
        >
          AnchorNavElement
        </NextLink>
        []
      </>
    ),
    description: 'An array of section definitions to render as anchors and scrollable content.',
    required: true,
  },
];

export const AnchorNavPropsTable: React.FC<PropTableWrapper> = (props) => (
  <PropTable propList={anchorNavProps} title="AnchorNav" {...props} />
);

const anchorNavElementProps: Prop[] = [
  {
    name: 'id',
    types: 'string',
    description:
      'Unique identifier for the section. Used for anchor targeting and URL hash updates.',
    required: true,
  },
  {
    name: 'label',
    types: 'string',
    description: 'Label displayed in the anchor navigation link.',
    required: true,
  },
  {
    name: 'element',
    types: 'React.ReactNode',
    description: 'The content to render for this section.',
    required: true,
  },
];

export const AnchorNavElementPropsTable: React.FC<PropTableWrapper> = (props) => (
  <PropTable
    id="anchor-nav-element-prop-table"
    propList={anchorNavElementProps}
    title="AnchorNav[AnchorNavElement]"
    {...props}
  />
);
