import React from 'react';

import { NextLink, Prop, PropTable, PropTableWrapper } from '../components';

const typographyProps: Prop[] = [
  {
    name: 'color',
    types: (
      <NextLink href="/Colors/ColorsPage" as="/colors">
        Color
      </NextLink>
    ),
    defaultValue: 'secondary70',
    description: (
      <>
        Sets the text color given a color name from our{' '}
        <NextLink href="/Colors/ColorsPage" as="/colors">
          palette
        </NextLink>
        .
      </>
    ),
  },
  {
    name: 'ellipsis',
    types: 'boolean',
    description: 'Controls whether the text will concat and display ellipse... on overflow.',
  },
];

const headingProps: Prop[] = [
  {
    name: 'as',
    types: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'],
    description: 'Changes the rendered tag for semantic purposes.',
  },
];

const textProps: Prop[] = [
  {
    name: 'as',
    types: 'string',
    description: 'Changes the rendered tag for semantic purposes.',
  },
  {
    name: 'bold',
    types: 'boolean',
    defaultValue: 'false',
    description: 'Changes text style to bold.',
  },
  {
    name: 'italic',
    types: 'boolean',
    defaultValue: 'false',
    description: 'Changes text style to italic.',
  },
  {
    name: 'strikethrough',
    types: 'boolean',
    defaultValue: 'false',
    description: 'Changes text style to strikethrough.',
  },
  {
    name: 'underline',
    types: 'boolean',
    defaultValue: 'false',
    description: 'Changes text style to underline.',
  },
  {
    name: 'capitalize',
    types: 'boolean',
    defaultValue: 'false',
    description: 'Changes text transform to capitalize.',
  },
  {
    name: 'lowercase',
    types: 'boolean',
    defaultValue: 'false',
    description: 'Changes text transform to lowercase.',
  },
  {
    name: 'uppercase',
    types: 'boolean',
    defaultValue: 'false',
    description: 'Changes text transform to uppercase.',
  },
];

export const TypographyPropTable: React.FC<PropTableWrapper> = (props) => (
  <PropTable title="Typography" propList={typographyProps} {...props} />
);

export const HeadingPropTable: React.FC<PropTableWrapper> = (props) => (
  <PropTable title="Heading" propList={headingProps} {...props} />
);

export const TextPropTable: React.FC<PropTableWrapper> = (props) => (
  <PropTable title="Text" propList={textProps} {...props} />
);
