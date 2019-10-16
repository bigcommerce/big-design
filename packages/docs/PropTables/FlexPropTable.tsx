import React from 'react';

import { Code, Prop, PropTable, PropTableWrapper } from '../components';

const flexProps: Prop[] = [
  {
    name: 'alignContent',
    types: ['stretch', 'center', 'flex-start', 'flex-end', 'space-between', 'space-around'],
    defaultValue: 'stretch',
    description: (
      <>
        Modifies the behavior of the <Code highlight={false}>flex-wrap</Code> property on the vertical axis. Same as the{' '}
        <Code highlight={false}>align-content</Code> CSS property.
      </>
    ),
  },
  {
    name: 'alignItems',
    types: ['normal', 'stretch', 'center', 'flex-start', 'flex-end', 'baseline'],
    defaultValue: 'stretch',
    description: (
      <>
        Specifies the default alignment for items in a flex container. Same as the{' '}
        <Code highlight={false}>align-items</Code> CSS property.
      </>
    ),
  },
  {
    name: 'flexDirection',
    types: ['row', 'column', 'row-reverse', 'column-reverse'],
    defaultValue: 'row',
    description: (
      <>
        Determines the direction of flex items. Same as the <Code highlight={false}>flex-direction</Code> CSS property.
      </>
    ),
  },
  {
    name: 'justifyContent',
    types: [
      'center',
      'flex-start',
      'flex-end',
      'left',
      'right',
      'normal',
      'space-between',
      'space-around',
      'space-evenly',
      'stretch',
    ],
    defaultValue: 'flex-start',
    description: (
      <>
        Modifies the behavior of the <Code highlight={false}>flex-wrap</Code> property on the horizontal axis. Same as
        the <Code highlight={false}>justify-content</Code> CSS property.
      </>
    ),
  },
  {
    name: 'flexWrap',
    types: ['nowrap', 'wrap', 'wrap-reversed'],
    defaultValue: 'nowrap',
    description: (
      <>
        Controls whether flex items should wrap or not. Same as the <Code highlight={false}>flex-wrap</Code> CSS
        property.
      </>
    ),
  },
];

export const FlexPropTable: React.FC<PropTableWrapper> = props => {
  return <PropTable title="Flex" propList={flexProps} {...props} />;
};

const flexItemProps: Prop[] = [
  {
    name: 'alignSelf',
    types: ['auto', 'flex-start', 'flex-end', 'center', 'baseline', 'stretch'],
    defaultValue: 'auto',
    description: (
      <>
        Overrides the flex items container <Code highlight={false}>align-items</Code> property. Same as the{' '}
        <Code highlight={false}>align-self</Code> CSS property.
      </>
    ),
  },
  {
    name: 'flexBasis',
    types: ['auto', 'fill', 'min-content', 'max-content', 'fit-content', 'content', 'string'],
    defaultValue: 'auto',
    description: (
      <>
        Specifies the inital length of a flex item. Same as the <Code highlight={false}>flex-basis</Code> CSS property.
      </>
    ),
  },
  {
    name: 'flexGrow',
    types: 'number',
    defaultValue: '0',
    description: (
      <>
        Determines how much a flex item can grow relitive to the rest of the flex items. Same as the{' '}
        <Code highlight={false}>flex-grow</Code> CSS property.
      </>
    ),
  },
  {
    name: 'flexOrder',
    types: 'number',
    defaultValue: '0',
    description: (
      <>
        Modifies which order a flex item will appear relative to the other flex items in the container. Same as the{' '}
        <Code highlight={false}>order</Code> CSS property.
      </>
    ),
  },
  {
    name: 'flexShrink',
    types: 'number',
    defaultValue: '1',
    description: (
      <>
        Determines how much a flex item can shrink relitive to the rest of the flex items. Same as the{' '}
        <Code highlight={false}>flex-shrink</Code> CSS property.
      </>
    ),
  },
];

export const FlexItemPropTable: React.FC<PropTableWrapper> = props => {
  return <PropTable title="Flex.Item" propList={flexItemProps} {...props} />;
};
