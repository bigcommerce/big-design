import React from 'react';

import { NextLink, Prop, PropTable, PropTableWrapper } from '../components';

const boxProps: Prop[] = [
  {
    name: 'as',
    types: ['string', 'React.ComponentType<any>'],
    description: 'Use a different HTML tag or a different custom component',
  },
  {
    name: 'backgroundColor',
    types: (
      <NextLink href="/Colors/ColorsPage" as="/colors">
        Color
      </NextLink>
    ),
    description: (
      <>
        Sets the background color given a color name from our{' '}
        <NextLink href="/Colors/ColorsPage" as="/colors">
          palette
        </NextLink>
        .
      </>
    ),
  },
  {
    name: 'shadow',
    types: ['floating', 'raised'],
    description: 'Determines the type of shadow to be applied.',
  },
  {
    name: 'border',
    types: ['box', 'boxError', 'none'],
    description: 'Determines type of border to be applied.',
  },
  {
    name: 'borderBottom',
    types: ['box', 'boxError', 'none'],
    description: 'Determines type of bottom border to be applied.',
  },
  {
    name: 'borderLeft',
    types: ['box', 'boxError', 'none'],
    description: 'Determines type of left border to be applied.',
  },
  {
    name: 'borderRight',
    types: ['box', 'boxError', 'none'],
    description: 'Determines type of right border to be applied.',
  },
  {
    name: 'borderTop',
    types: ['box', 'boxError', 'none'],
    description: 'Determines type of top border to be applied.',
  },
  {
    name: 'borderRadius',
    types: ['normal', 'circle', 'none'],
    description: 'Determines type of border radius to be applied.',
  },
  {
    name: 'clearfix',
    types: ['boolean'],
    description: 'Adds a clearfix for floating internal elements.',
  },
];

export const BoxPropTable: React.FC<PropTableWrapper> = (props) => (
  <PropTable title="Box" propList={boxProps} {...props} />
);
