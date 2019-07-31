import React from 'react';

import { Code, PropTable } from '../../components';

export const FlexPropTable: React.FC = () => {
  return (
    <PropTable>
      <PropTable.Prop
        name="alignContent"
        types={['stretch', 'center', 'flex-start', 'flex-end', 'space-between', 'space-around']}
        defaults="stretch"
      >
        Modifies the behavior of the <Code highlight={false}>flex-wrap</Code> property on the vertical axis. Same as the{' '}
        <Code highlight={false}>align-content</Code> CSS property.
      </PropTable.Prop>
      <PropTable.Prop
        name="alignItems"
        types={['normal', 'stretch', 'center', 'flex-start', 'flex-end', 'baseline']}
        defaults="stretch"
      >
        Specifies the default alignment for items in a flex container. Same as the{' '}
        <Code highlight={false}>align-items</Code> CSS property.
      </PropTable.Prop>
      <PropTable.Prop name="flexDirection" types={['row', 'column', 'row-reverse', 'column-reverse']} defaults="row">
        Determines the direction of flex items. Same as the <Code highlight={false}>flex-direction</Code> CSS property.
      </PropTable.Prop>
      <PropTable.Prop
        name="justifyContent"
        types={[
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
        ]}
        defaults="flex-start"
      >
        Modifies the behavior of the <Code highlight={false}>flex-wrap</Code> property on the horizontal axis. Same as
        the <Code highlight={false}>justify-content</Code> CSS property.
      </PropTable.Prop>
      <PropTable.Prop name="flexWrap" types={['nowrap', 'wrap', 'wrap-reversed']} defaults="nowrap">
        Controls whether flex items should wrap or not. Same as the <Code highlight={false}>flex-wrap</Code> CSS
        property.
      </PropTable.Prop>
    </PropTable>
  );
};

export const FlexItemPropTable: React.FC = () => {
  return (
    <PropTable>
      <PropTable.Prop
        name="alignSelf"
        types={['auto', 'flex-start', 'flex-end', 'center', 'baseline', 'stretch']}
        defaults="auto"
      >
        Overrides the flex items container <Code highlight={false}>align-items</Code> property. Same as the{' '}
        <Code highlight={false}>align-self</Code> CSS property.
      </PropTable.Prop>
      <PropTable.Prop
        name="flexBasis"
        types={['auto', 'fill', 'min-content', 'max-content', 'fit-content', 'content', 'string']}
        defaults="auto"
      >
        Specifies the inital length of a flex item. Same as the <Code highlight={false}>flex-basis</Code> CSS property.
      </PropTable.Prop>
      <PropTable.Prop name="flexGrow" types="number" defaults="0">
        Determines how much a flex item can grow relitive to the rest of the flex items. Same as the{' '}
        <Code highlight={false}>flex-grow</Code> CSS property.
      </PropTable.Prop>
      <PropTable.Prop name="flexOrder" types="number" defaults="0">
        Modifies which order a flex item will appear relative to the other flex items in the container. Same as the{' '}
        <Code highlight={false}>order</Code> CSS property.
      </PropTable.Prop>
      <PropTable.Prop name="flexShrink" types="number" defaults="1">
        Determines how much a flex item can shrink relitive to the rest of the flex items. Same as the{' '}
        <Code highlight={false}>flex-shrink</Code> CSS property.
      </PropTable.Prop>
    </PropTable>
  );
};
