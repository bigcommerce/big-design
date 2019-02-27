import { Button, DropdownIcon, PlusIcon } from '@bigcommerce/plab';
import { action } from '@storybook/addon-actions';
import { boolean, select } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react';
import React from 'react';

const variant = ['primary' as 'primary', 'secondary' as 'secondary', 'subtle' as 'subtle'];
const actionType = ['normal' as 'normal', 'destructive' as 'destructive'];

storiesOf('Button', module)
  .add('Overview', () => (
    <div>
      <div
        style={{
          alignItems: 'center',
          display: 'grid',
          justifyItems: 'center',
          gridTemplateColumns: 'repeat(6, 80px)',
          gridRowGap: 10,
          marginBottom: 10,
        }}
      >
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
      </div>
      <div
        style={{
          alignItems: 'center',
          display: 'grid',
          justifyItems: 'center',
          gridTemplateColumns: 'repeat(6, 80px)',
          gridRowGap: 10,
          marginBottom: 10,
        }}
      >
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
      </div>
      <div
        style={{
          alignItems: 'center',
          display: 'grid',
          justifyItems: 'center',
          gridTemplateColumns: 'repeat(6, 80px)',
          gridRowGap: 10,
          marginBottom: 10,
        }}
      >
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
      </div>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(1, auto)',
          gridGap: 10,
          marginTop: 10,
        }}
      >
        <span>
          <Button onClick={action('click')} iconOnly={<PlusIcon />} />
        </span>
        <span>
          <Button onClick={action('click')} iconLeft={<PlusIcon />}>
            Label
          </Button>
        </span>
        <span>
          <Button onClick={action('click')} iconLeft={<PlusIcon />} iconRight={<DropdownIcon />}>
            Label
          </Button>
        </span>
        <span>
          <Button onClick={action('click')} iconRight={<DropdownIcon />}>
            Label
          </Button>
        </span>
      </div>
    </div>
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
