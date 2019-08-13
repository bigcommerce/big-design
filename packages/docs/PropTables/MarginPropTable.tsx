import React from 'react';

import { NextLink, PropTable } from '../components';

export const MarginPropTable: React.FC = () => (
  <PropTable>
    <PropTable.Prop
      name="margin"
      types={
        <NextLink href="/Margin/MarginPage" as="/margin">
          Margin
        </NextLink>
      }
    >
      Determines the margin to be applied.
    </PropTable.Prop>
    <PropTable.Prop
      name="marginTop"
      types={
        <NextLink href="/Margin/MarginPage" as="/margin">
          Margin
        </NextLink>
      }
    >
      Determines the top margin to be applied.
    </PropTable.Prop>
    <PropTable.Prop
      name="marginRight"
      types={
        <NextLink href="/Margin/MarginPage" as="/margin">
          Margin
        </NextLink>
      }
    >
      Determines the right margin to be applied.
    </PropTable.Prop>
    <PropTable.Prop
      name="marginBottom"
      types={
        <NextLink href="/Margin/MarginPage" as="/margin">
          Margin
        </NextLink>
      }
    >
      Determines the bottom margin to be applied.
    </PropTable.Prop>
    <PropTable.Prop
      name="marginLeft"
      types={
        <NextLink href="/Margin/MarginPage" as="/margin">
          Margin
        </NextLink>
      }
    >
      Determines the left margin to be applied.
    </PropTable.Prop>
    <PropTable.Prop
      name="marginVertical"
      types={
        <NextLink href="/Margin/MarginPage" as="/margin">
          Margin
        </NextLink>
      }
    >
      Determines the top and bottom margin to be applied.
    </PropTable.Prop>
    <PropTable.Prop
      name="marginHorizontal"
      types={
        <NextLink href="/Margin/MarginPage" as="/margin">
          Margin
        </NextLink>
      }
    >
      Determines the left and right margin to be applied.
    </PropTable.Prop>
  </PropTable>
);
