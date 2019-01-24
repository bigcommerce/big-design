import { action } from '@storybook/addon-actions';
import { boolean, select, withKnobs } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react';
import React from 'react';

import { Radio } from './Radio';

storiesOf('Radio', module)
  .addDecorator(withKnobs)
  .add('Default', () => (
    <>
      <Radio label="Radio 2" checked={boolean('checked', false)} />
      <Radio label="Radio 3" defaultChecked />
    </>
  ));
