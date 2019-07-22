import React from 'react';

import { PropTable } from '../../components';

export const FlexPropTable: React.FC = () => {
  return (
    <PropTable>
      <PropTable.Prop
        name="alignContent"
        types={['stretch', 'center', 'flex-start', 'flex-end', 'space-between', 'space-around']}
        defaults="stretch"
      >
        Modifies the behavior of the <code>flex-wrap</code> property on the vertical axis. Same as the{' '}
        <code>align-content</code> CSS property.
      </PropTable.Prop>
      <PropTable.Prop
        name="alignItems"
        types={['normal', 'stretch', 'center', 'flex-start', 'flex-end', 'baseline']}
        defaults="stretch"
      >
        Specifies the default alignment for items in a flex container. Same as the <code>align-items</code> CSS
        property.
      </PropTable.Prop>
      <PropTable.Prop name="direction" types={['row', 'column', 'row-reverse', 'column-reverse']} defaults="row">
        Determines the direction of flex items. Same as the <code>flex-direction</code> CSS property.
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
        Modifies the behavior of the <code>flex-wrap</code> property on the horizontal axis. Same as the{' '}
        <code>justify-content</code> CSS property.
      </PropTable.Prop>
      <PropTable.Prop name="wrap" types={['nowrap', 'wrap', 'wrap-reversed']} defaults="nowrap">
        Controls whether flex items should wrap or not. Same as the <code>flex-wrap</code> CSS property.
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
        Overrides the flex items container <code>align-items</code> property. Same as the <code>align-self</code> CSS
        property.
      </PropTable.Prop>
      <PropTable.Prop
        name="basis"
        types={['auto', 'fill', 'min-content', 'max-content', 'fit-content', 'content', 'string']}
        defaults="auto"
      >
        Specifies the inital length of a flex item. Same as the <code>flex-basis</code> CSS property.
      </PropTable.Prop>
      <PropTable.Prop name="grow" types="number" defaults="0">
        Determines how much a flex item can grow relitive to the rest of the flex items. Same as the{' '}
        <code>flex-grow</code> CSS property.
      </PropTable.Prop>
      <PropTable.Prop name="order" types="number" defaults="0">
        Modifies which order a flex item will appear relative to the other flex items in the container. Same as the{' '}
        <code>order</code> CSS property.
      </PropTable.Prop>
      <PropTable.Prop name="shrink" types="number" defaults="1">
        Determines how much a flex item can shrink relitive to the rest of the flex items. Same as the{' '}
        <code>flex-shrink</code> CSS property.
      </PropTable.Prop>
    </PropTable>
  );
};
