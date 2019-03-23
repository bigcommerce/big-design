import { Button, DropdownIcon, Flex, Grid, PlusIcon } from '@bigcommerce/big-design';
import { withA11y } from '@storybook/addon-a11y';
import { action } from '@storybook/addon-actions';
import { boolean, select } from '@storybook/addon-knobs';
import { addDecorator, storiesOf } from '@storybook/react';
import React from 'react';

const variant = ['primary' as 'primary', 'secondary' as 'secondary', 'subtle' as 'subtle'];
const actionType = ['normal' as 'normal', 'destructive' as 'destructive'];

// TODO: Move a11y addon to config when storybook fixes the bug in the addon
addDecorator(withA11y);

storiesOf('Button', module)
  .add('Overview', () => (
    <Grid columns="repeat(6, min-content)" margin="medium">
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
  ))
  .add('With icons', () => (
    <Flex margin="medium" flexDirection="column" alignItems="flex-start">
      <Button onClick={action('click')} iconOnly={<PlusIcon title="add" />} marginBottom="medium" />
      <Button onClick={action('click')} iconLeft={<PlusIcon />} marginBottom="medium">
        Label
      </Button>
      <Button onClick={action('click')} iconLeft={<PlusIcon />} iconRight={<DropdownIcon />} marginBottom="medium">
        Label
      </Button>
      <Button onClick={action('click')} iconRight={<DropdownIcon />} marginBottom="medium">
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
      margin="medium"
    >
      Label
    </Button>
  ));
