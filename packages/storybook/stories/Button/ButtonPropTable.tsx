import { Link } from '@bigcommerce/big-design';
import { linkTo } from '@storybook/addon-links';
import React from 'react';

import { PropTable } from '../../components';

export const ButtonPropTable: React.FC = () => {
  return (
    <PropTable>
      <PropTable.Prop name="actionType" types={['normal', 'destructive']} defaults="normal">
        Indicates whether your button's action is of normal or destructive nature.
      </PropTable.Prop>
      <PropTable.Prop name="iconLeft" types={<Link onClick={linkTo('Icons') as any}>Icon</Link>} defaults="">
        Pass in an <Link onClick={linkTo('Icons') as any}>Icon</Link> component to display to the left of the text.
      </PropTable.Prop>
      <PropTable.Prop name="iconOnly" types={<Link onClick={linkTo('Icons') as any}>Icon</Link>} defaults="">
        Pass in an <Link onClick={linkTo('Icons') as any}>Icon</Link> component to replace content with an icon.
      </PropTable.Prop>
      <PropTable.Prop name="iconRight" types={<Link onClick={linkTo('Icons') as any}>Icon</Link>} defaults="">
        Pass in an <Link onClick={linkTo('Icons') as any}>Icon</Link> component to display to the right of the text.
      </PropTable.Prop>
      <PropTable.Prop name="isLoading" types="boolean" defaults="false">
        Used to determine if component is in a loading state.
      </PropTable.Prop>
      <PropTable.Prop
        name="spinner"
        types={<Link onClick={linkTo('Spinner') as any}>Spinner</Link>}
        defaults="<Spinner overlay={false} />"
      >
        Add a custom spinner to view when <code>isLoading</code> is <code>true</code>
      </PropTable.Prop>
      <PropTable.Prop name="variant" types={['primary', 'secondary', 'subtle']} defaults="primary">
        Determines which style of button to display.
      </PropTable.Prop>
    </PropTable>
  );
};
