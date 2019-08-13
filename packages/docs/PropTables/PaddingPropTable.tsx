import React from 'react';

import { NextLink, PropTable } from '../components';

export const PaddingPropTable: React.FC = () => (
  <PropTable>
    <PropTable.Prop
      name="padding"
      types={
        <NextLink href="/Utilities/PaddingPage" as="/utilities/padding">
          Padding
        </NextLink>
      }
    >
      Determines the padding to be applied.
    </PropTable.Prop>
    <PropTable.Prop
      name="paddingTop"
      types={
        <NextLink href="/Utilities/PaddingPage" as="/utilities/padding">
          Padding
        </NextLink>
      }
    >
      Determines the top padding to be applied.
    </PropTable.Prop>
    <PropTable.Prop
      name="paddingRight"
      types={
        <NextLink href="/Utilities/PaddingPage" as="/utilities/padding">
          Padding
        </NextLink>
      }
    >
      Determines the right padding to be applied.
    </PropTable.Prop>
    <PropTable.Prop
      name="paddingBottom"
      types={
        <NextLink href="/Utilities/PaddingPage" as="/utilities/padding">
          Padding
        </NextLink>
      }
    >
      Determines the bottom padding to be applied.
    </PropTable.Prop>
    <PropTable.Prop
      name="paddingLeft"
      types={
        <NextLink href="/Utilities/PaddingPage" as="/utilities/padding">
          Padding
        </NextLink>
      }
    >
      Determines the left padding to be applied.
    </PropTable.Prop>
    <PropTable.Prop
      name="paddingVertical"
      types={
        <NextLink href="/Utilities/PaddingPage" as="/utilities/padding">
          Padding
        </NextLink>
      }
    >
      Determines the top and bottom padding to be applied.
    </PropTable.Prop>
    <PropTable.Prop
      name="paddingHorizontal"
      types={
        <NextLink href="/Utilities/PaddingPage" as="/utilities/padding">
          Padding
        </NextLink>
      }
    >
      Determines the left and right padding to be applied.
    </PropTable.Prop>
  </PropTable>
);
