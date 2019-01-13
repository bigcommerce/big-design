import { action } from '@storybook/addon-actions';
import { select } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react';
import * as React from 'react';

import { DummyButton } from './DummyButton';

const variant = ['primary' as 'primary', 'secondary' as 'secondary'];

storiesOf('DummyButton', module)
  .add('Primary', () => (
    <DummyButton onClick={action('click')} variant={select('variant', variant, 'primary')}>
      I'm a button
    </DummyButton>
  ))
  .add('Secondary', () => (
    <DummyButton onClick={action('click')} variant={select('variant', variant, 'secondary')}>
      I'm a button
    </DummyButton>
  ));
