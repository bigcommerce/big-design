import { Button, DropdownIcon, Flex, Grid, Link, Panel, PlusIcon } from '@bigcommerce/big-design';
import { action } from '@storybook/addon-actions';
import { boolean, select } from '@storybook/addon-knobs';
import { linkTo } from '@storybook/addon-links';
import { storiesOf } from '@storybook/react';
import React from 'react';

import { PropTable } from '../components';

const variant = ['primary' as 'primary', 'secondary' as 'secondary', 'subtle' as 'subtle'];
const actionType = ['normal' as 'normal', 'destructive' as 'destructive'];

storiesOf('Button', module)
  .add('Overview', () => (
    <Panel>
      <Grid columns="repeat(6, min-content)" marginBottom="xxLarge">
        <Button onClick={action('click')}>Label</Button>
        <Button onClick={action('click')} isLoading={true}>
          Label
        </Button>
        <Button onClick={action('click')} disabled>
          Label
        </Button>
        <Button onClick={action('click')} actionType="destructive">
          Label
        </Button>
        <Button onClick={action('click')} actionType="destructive" isLoading={true}>
          Label
        </Button>
        <Button onClick={action('click')} actionType="destructive" disabled>
          Label
        </Button>
        <Button onClick={action('click')} variant="secondary">
          Label
        </Button>
        <Button onClick={action('click')} variant="secondary" isLoading={true}>
          Label
        </Button>
        <Button onClick={action('click')} variant="secondary" disabled>
          Label
        </Button>
        <Button onClick={action('click')} variant="secondary" actionType="destructive">
          Label
        </Button>
        <Button onClick={action('click')} variant="secondary" actionType="destructive" isLoading={true}>
          Label
        </Button>
        <Button onClick={action('click')} variant="secondary" actionType="destructive" disabled>
          Label
        </Button>
        <Button onClick={action('click')} variant="subtle">
          Label
        </Button>
        <Button onClick={action('click')} variant="subtle" isLoading={true}>
          Label
        </Button>
        <Button onClick={action('click')} variant="subtle" disabled>
          Label
        </Button>
        <Button onClick={action('click')} variant="subtle" actionType="destructive">
          Label
        </Button>
        <Button onClick={action('click')} variant="subtle" actionType="destructive" isLoading={true}>
          Label
        </Button>
        <Button onClick={action('click')} variant="subtle" actionType="destructive" disabled>
          Label
        </Button>
      </Grid>
      <PropTable>
        <PropTable.Prop name="actionType" types={['normal', 'destructive']} defaults="normal">
          Whether your buttons actions is normal or destructive.
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
          One of: <code>primary</code>, <code>secondary</code>, <code>subtle</code>
        </PropTable.Prop>
      </PropTable>
    </Panel>
  ))
  .add('With icons', () => (
    <Flex direction="column" alignItems="flex-start">
      <Button onClick={action('click')} iconOnly={<PlusIcon title="add" />} marginBottom="medium" />
      <Button onClick={action('click')} iconLeft={<PlusIcon />} marginBottom="medium">
        Label
      </Button>
      <Button onClick={action('click')} iconLeft={<PlusIcon />} iconRight={<DropdownIcon />} marginBottom="medium">
        Label
      </Button>
      <Button onClick={action('click')} iconRight={<DropdownIcon />}>
        Label
      </Button>
    </Flex>
  ))
  .add('With Knobs', () => (
    <Button
      onClick={action('click')}
      variant={select('variant', variant, 'primary')}
      actionType={select('actionType', actionType, 'normal')}
      isLoading={boolean('isLoading', false)}
    >
      Label
    </Button>
  ));
