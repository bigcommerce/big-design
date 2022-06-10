import React from 'react';

import { Code, Prop, PropTable, PropTableWrapper } from '../components';

const linkProps: Prop[] = [
  {
    name: 'external',
    types: 'boolean',
    description: (
      <>
        Shows an external icon when the <Code primary>external</Code> flag is set and
        target="_blank".
      </>
    ),
  },
  {
    name: 'ellipsis',
    types: 'boolean',
    description: 'Controls whether the text will concat and display ellipse... on overflow.',
  },
];

export const LinkPropTable: React.FC<PropTableWrapper> = (props) => (
  <PropTable propList={linkProps} title="Link" {...props} />
);
