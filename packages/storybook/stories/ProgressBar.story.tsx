import { ProgressBar } from '@bigcommerce/big-design';
import { number } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react';
import React from 'react';

import ProgressBarReadme from '../../big-design/src/components/ProgressBar/README.md';

const percentKnob = {
  name: 'percentage',
  value: 50,
  options: {
    range: true,
    min: 0,
    max: 100,
    step: 1,
  },
};

storiesOf('ProgressBar', module)
  .addParameters({
    readme: {
      content: ProgressBarReadme,
    },
  })
  .add('Determinant', () => <ProgressBar percent={number(percentKnob.name, percentKnob.value, percentKnob.options)} />)
  .add('Indeterminant', () => <ProgressBar />);
