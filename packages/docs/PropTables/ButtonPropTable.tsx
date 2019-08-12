import { Link } from '@bigcommerce/big-design';
import React from 'react';

import { PropTable } from '../components';

export const ButtonPropTable: React.FC = () => {
  return (
    <PropTable>
      <PropTable.Prop name="actionType" types={['normal', 'destructive']} defaults="normal">
        Indicates whether your button's action is of normal or destructive nature.
      </PropTable.Prop>
      <PropTable.Prop name="iconLeft" types={<Link href="/icons">Icon</Link>} defaults="">
        Pass in an <Link href="/icons">Icon</Link> component to display to the left of the text.
      </PropTable.Prop>
      <PropTable.Prop name="iconOnly" types={<Link href="/icons">Icon</Link>} defaults="">
        Pass in an <Link href="/icons">Icon</Link> component to replace content with an icon.
      </PropTable.Prop>
      <PropTable.Prop name="iconRight" types={<Link href="/icons">Icon</Link>} defaults="">
        Pass in an <Link href="/icons">Icon</Link> component to display to the right of the text.
      </PropTable.Prop>
      <PropTable.Prop name="isLoading" types="boolean" defaults="false">
        Used to determine if component is in a loading state.
      </PropTable.Prop>
      <PropTable.Prop name="variant" types={['primary', 'secondary', 'subtle']} defaults="primary">
        Determines which style of button to display.
      </PropTable.Prop>
    </PropTable>
  );
};
